const parseISO = require('date-fns/parseISO');

function formatMonthDayYear(iso) {
  const parsedDate = parseISO(iso);
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}

export default formatMonthDayYear;
