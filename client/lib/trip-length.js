const differenceInDays = require('date-fns/differenceInCalendarDays');

export default function tripLength(startISO, endISO) {
  const startDate = new Date(startISO);
  const endDate = new Date(endISO);
  const tripLength = differenceInDays(startDate, endDate);
  return Math.abs(tripLength) + 1;
}
