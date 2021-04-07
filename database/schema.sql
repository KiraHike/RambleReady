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
  "budget"    numeric
);
