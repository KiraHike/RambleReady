const parseISO = require('date-fns/parseISO');

function formatDate(iso) {
  const parsedDate = parseISO(iso);
  const month = parsedDate.getMonth();
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}

export default formatDate;
