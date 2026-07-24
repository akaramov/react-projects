export function FomartMoney(priceCents) {
  return `$${(priceCents / 100).toFixed(2)}`;
}
