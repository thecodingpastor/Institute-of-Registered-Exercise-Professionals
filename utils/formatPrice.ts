const formatPrice = (price: number, discount: number) =>
  Math.floor(price - (discount / 100) * price);

export default formatPrice;
