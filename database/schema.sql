set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."trips" (
  "tripId"    serial,
  "startDate" date,
  "endDate"   date,
  "country"   text,
  "currency"  text,
  "budget"    numeric,
  primary key("tripId")
);

create table "public"."expenses" (
  "tripId"    integer,
  "expenseId" serial,
  "date"      date,
  "category"  text,
  "subcategory" text,
  "notes"     text,
  "amount"    numeric,
  primary key("expenseId"),
  constraint fk_trip
    foreign key("tripId")
      references trips("tripId")
        on delete cascade
);

create table "public"."countries" (
  "countryId" serial,
  "country"   text,
  "currency"  text
)
