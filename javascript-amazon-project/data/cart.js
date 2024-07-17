export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1
    }
  ];
}

function saveToLocalStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('cart saved to the local storage');
}

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

  saveToLocalStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToLocalStorage();
}