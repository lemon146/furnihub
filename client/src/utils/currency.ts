export const formatCurrency = (amount: number): string => {
  return `₨ ${Math.round(amount).toLocaleString("en-PK")}`;
};
