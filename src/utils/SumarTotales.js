const sumTotal = (item) => {
  const reducer= (previusValue, currentValue) => previusValue + currentValue.price * currentValue.quantity;
  const sum = item.reduce(reducer,0);
  return sum;
}

export { sumTotal };