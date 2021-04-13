export default function calculate(foreignCurrency, exchange) {
  return (foreignCurrency / exchange).toFixed(2);
}
