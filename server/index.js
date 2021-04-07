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
           "budget"
    from "trips"
    `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => {
      next(err);
    });
});

app.post('/api/trips', (req, res, next) => {
  const { startDate, endDate, country, budget } = req.body;
  const sql = `
    insert into "trips" ("startDate", "endDate", "country", "budget")
    values ($1, $2, $3, $4)
    returning *
    `;
  const params = [startDate, endDate, country, budget];
  db.query(sql, params)
    .then(res => {
      const [trip] = res.rows[0];
      res.status(201).json(trip);
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
