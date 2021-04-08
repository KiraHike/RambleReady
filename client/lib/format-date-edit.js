const parseISO = require('date-fns/parseISO');

function formatDateEdit(iso) {
  const parsedDate = parseISO(iso);
  let month = parsedDate.getMonth() + 1;
  if (month.toString().length === 1) {
    month = '0' + month;
  }
  let day = parsedDate.getDate();
  if (day.toString().length === 1) {
    day = '0' + day;
  }
  const year = parsedDate.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export default formatDateEdit;
