const differenceInDays = require('date-fns/differenceInCalendarDays');

function remainingDays(startISO, endISO) {
  const startDate = new Date(startISO);
  const endDate = new Date(endISO);
  let days;
  if (new Date() >= startDate) {
    days = differenceInDays(new Date(), endDate);
  } else {
    days = differenceInDays(startDate, endDate);

  }
  return Math.abs(days) + 1;
}

export default remainingDays;
