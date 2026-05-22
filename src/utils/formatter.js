export const calculateDiscount = (sellingPrice, mrp) => {
  return Math.ceil(((mrp - sellingPrice) / mrp) * 100);
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
