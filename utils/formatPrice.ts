const formatPrice = (price: number, discount: number) =>
  Math.round(price - (discount / 100) * price);

export default formatPrice;
