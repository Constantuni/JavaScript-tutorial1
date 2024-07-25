import {cart, addToCart, updateCartQuantity} from '../data/cart.js';
import {products, loadProductsFetch} from '../data/products.js';
//import {formatCurrency} from './utils/money.js';

loadPageAmazon();

async function loadPageAmazon(){
  await loadProductsFetch();
  renderProductsGrid();
}
function renderProductsGrid(){
  let productsHTML = '';

  updateCartQuantity();

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="js-added-to-cart-${product.id} added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="js-add-to-cart-button add-to-cart-button button-primary" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });
  const gridElement = document.querySelector('.js-products-grid');
  gridElement.innerHTML = productsHTML;

  updateCartQuantity();

  function addedToCartText(productId){
    const addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`);

      clearTimeout(timeoutId);
      addedToCartElement.classList.add('added-to-cart-opac');
      timeoutId = setTimeout(() => {
        addedToCartElement.classList.remove('added-to-cart-opac');
      }, 2000);
  }

  let timeoutId;

  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
      addedToCartText(productId);
    });
  });
}