//************************** */

let navbar = document.querySelector(".navbar");
let searchForm = document.querySelector(".search-form");
let cartItem = document.querySelector(".cart-items-container");
let menuBtn = document.getElementById("menu-btn");
let searchBtn = document.getElementById("search-btn");
let cartBtn = document.getElementById("cart-btn");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
});

searchBtn.addEventListener("click", () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
  cartItem.classList.remove("active");
});

cartBtn.addEventListener("click", () => {
  cartItem.classList.toggle("active");
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
});

onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

addEventListener("scroll", () => {

  let up = document.querySelector(".up");

  if (scrollY > 50) {

    up.classList.add("active");
  } else {

    up.classList.remove("active");
  }
});

// ===================== cart =====================

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartElement = document.getElementById("cart-count");
const cartItemsContainer = document.querySelector(".cart-items-container");

let cart = [];

function renderCart() {
  // clear current items safely (no innerHTML)
  while (cartItemsContainer.firstChild) {
    cartItemsContainer.removeChild(cartItemsContainer.firstChild);
  }

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.classList.add("empty-cart");
    emptyMsg.textContent = "your cart is empty";
    cartItemsContainer.appendChild(emptyMsg);
  } else {
    cart.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");

      const removeBtn = document.createElement("span");
      removeBtn.classList.add("fas", "fa-times");
      removeBtn.setAttribute("data-index", String(index));
      removeBtn.setAttribute("role", "button");
      removeBtn.setAttribute("aria-label", "remove item from cart");

      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.name;
      img.loading = "lazy";

      const content = document.createElement("div");
      content.classList.add("content");

      const title = document.createElement("h3");
      title.textContent = item.name;

      const price = document.createElement("div");
      price.classList.add("price");
      price.textContent = `$${item.price}`;

      content.appendChild(title);
      content.appendChild(price);

      itemEl.appendChild(removeBtn);
      itemEl.appendChild(img);
      itemEl.appendChild(content);

      cartItemsContainer.appendChild(itemEl);
    });
  }

  const checkoutBtn = document.createElement("a");
  checkoutBtn.href = "#";
  checkoutBtn.classList.add("btn");
  checkoutBtn.textContent = "checkout now";
  cartItemsContainer.appendChild(checkoutBtn);

  cartElement.textContent = cart.length;

  // remove item listeners
  cartItemsContainer.querySelectorAll(".fa-times").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-index"));
      cart.splice(i, 1);
      renderCart();
    });
  });
}

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const name = button.getAttribute("data-name");
    const price = button.getAttribute("data-price");
    const img = button.getAttribute("data-img");

    cart.push({ name, price, img });
    renderCart();

    const originalText = button.textContent;
    button.textContent = "Added! ✓";
    setTimeout(() => {
      button.textContent = originalText;
    }, 1500);
  });
});

renderCart();

// ===================== search =====================

const searchBox = document.getElementById("search-box");

searchBox.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();

  const query = searchBox.value.trim().toLowerCase();
  if (!query) return;

  const searchableSelectors = ".menu h3, .products .content h3, .blogs .title";
  const results = Array.from(document.querySelectorAll(searchableSelectors));

  const match = results.find((el) => el.textContent.toLowerCase().includes(query));

  if (match) {
    const section = match.closest("section");
    section.scrollIntoView({ behavior: "smooth" });
    searchForm.classList.remove("active");
  } else {
    alert("No results found for \"" + searchBox.value + "\"");
  }
});

// ===================== contact =====================

document.getElementById("whatsappForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const phone = document.getElementById("userPhone").value;
  const myPhoneNumber = "201157700392";

  const message =
    `Hello, I'd like to get in touch with you :%0A ` +
    `👤 *Name:* ${encodeURIComponent(name)}%0A` +
    `✉️ *Email:* ${encodeURIComponent(email)}%0A` +
    `📱 *Phone:* ${encodeURIComponent(phone)}%0A`;

  const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");
});