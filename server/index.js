require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const jsonMiddleware = express.json();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/trips', (req, res, next) => {
  const sql = `
    select "tripId",
           "startDate",
           "endDate",
           "country",
           "currency",
           "budget"
    from "trips"
    order by "startDate"
    `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => {
      next(err);
    });
});

app.get('/api/trips/:tripId', (req, res, next) => {
  const sql = `
    with "tripExpenses" as (
      select "date",
            sum("amount") as "dailySum"
        from "expenses"
      where "tripId" = $1
      group by "date"
    )
    select "budget",
          "country",
          "currency",
          "endDate",
          "startDate",
          "tripId",
          coalesce((select sum("dailySum") from "tripExpenses"), 0) as "tripSum",
          coalesce((select json_agg("tripExpenses") from "tripExpenses"), '[]'::json) as "expenses"
      from "trips"
    where "tripId" = $1
    `;
  const params = [req.params.tripId];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]))
    .catch(err => {
      next(err);
    });
});

app.post('/api/trips', (req, res, next) => {
  const { startDate, endDate, country, currency, budget } = req.body;
  const sql = `
    insert into "trips" ("startDate", "endDate", "country", "currency", "budget")
    values ($1, $2, $3, $4, $5)
    returning *
    `;
  const params = [startDate, endDate, country, currency, budget];
  db.query(sql, params)
    .then(result => {
      const [trip] = result.rows;
      res.status(201).json(trip);
    })
    .catch(err => {
      next(err);
    });
});

app.patch('/api/trips/:tripId', (req, res, next) => {
  const { tripId, startDate, endDate, country, budget } = req.body;
  const sql = `
    update "trips"
      set "startDate" = $1,
          "endDate" = $2,
          "country" = $3,
          "budget" = $4
      where "tripId" = $5
      returning *
  `;
  const params = [startDate, endDate, country, budget, tripId];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]))
    .catch(err => {
      next(err);
    });
});

app.delete('/api/trips/:tripId', (req, res, next) => {
  const sql = `
    delete from "trips"
      where "tripId" = $1
      returning *
  `;
  const params = [req.params.tripId];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]))
    .catch(err => {
      next(err);
    });
});

app.get('/api/expenses/:tripId', (req, res, next) => {
  const sql = `
    with "expenseItems" as (
      select  "date",
              "category",
              json_build_object(
                'subcategory', "subcategory",
                'notes',       "notes",
                'amount',      "amount",
                'expenseId',   "expenseId"
    ) as "expense"
      from "expenses"
      where "tripId" = $1
    ), "expenseItemsByCategory" as (
      select  "date",
              json_build_object(
                'category', "category",
                'expenses', array_agg("expense")
              ) as "categories"
      from "expenseItems"
      group by "date", "category"
    )
      select "date",
        array_agg("categories") as "expenses"
      from "expenseItemsByCategory"
      group by "date"
    `;
  const params = [req.params.tripId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => {
      next(err);
    });
});

app.post('/api/expenses', (req, res, next) => {
  const { tripId, date, category, subcategory, notes, amount } = req.body;
  const sql = `
    insert into "expenses" ("tripId", "date", "category", "subcategory", "notes", "amount")
    values ($1, $2, $3, $4, $5, $6)
    returning *
    `;
  const params = [tripId, date, category, subcategory, notes, amount];
  db.query(sql, params)
    .then(result => {
      const [expense] = result.rows;
      res.status(201).json(expense);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/countries', (req, res, next) => {
  const sql = `
    select "country"
    from "countries"
    `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => {
      next(err);
    });
});

app.get('/api/countries/:country', (req, res, next) => {
  const sql = `
    select "currency"
    from "countries"
    where "country" = $1
    `;
  const params = [req.params.country];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]))
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
