export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: 1
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryOptionId: 2
    }
  ];
}

export function updateCartQuantity(){
  let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    cartQuantityElement.innerHTML = cartQuantity;
}

export function saveToLocalStorage(){
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
      quantity: selectedQuantity,
      deliveryOptionId: "1"
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

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  console.log(matchingItem.deliveryOptionId);

  saveToLocalStorage();
}