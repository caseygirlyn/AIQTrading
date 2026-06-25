export const formatCurrency = (currency, price) => {
  if (price === null || price === undefined) return "-";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(price);
};

export const formatCurrencyShort = (currency, price) => {
  if (price === null || price === undefined) return "-";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    notation: "compact",
    compactDisplay: "short",
  }).format(price);
};