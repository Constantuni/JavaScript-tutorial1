export const cart = [];

export function addToCart(productId){
  let matchingItem;
    const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
    let selectedQuantity = Number(quantitySelectorElement.value);


    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity += selectedQuantity;
    } else {
      cart.push({
        productId: productId,
        quantity: selectedQuantity
      });
    }
}