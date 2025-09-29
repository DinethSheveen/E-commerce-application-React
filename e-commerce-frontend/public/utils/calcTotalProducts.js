export function calculateTotalProducts(props) {
  let totalItems = 0;

  if (props.cartProducts) {
    props.cartProducts.forEach((cartProduct) => {
      totalItems += cartProduct.quantity;
    });
  }
  return totalItems;
}
