export const currencyFormatter = (amount: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(amount);

export const calculateDiscountAmount = (totalAmount: number, discount: number) => {
  if (discount <= 0) return 0;
  if (discount >= 100) return totalAmount;
  return (totalAmount * discount) / 100;
}