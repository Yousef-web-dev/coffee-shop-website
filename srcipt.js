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

// card

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartElement = document.getElementById("cart-count");

let count = 0;

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    count++;
    cartElement.textContent = count;
    button.textContent = "Added! ✓";

    setTimeout(() => {
      button.textContent = "Add To Cart";
    }, 1500);
  });
});

// contact

document.getElementById("whatsappForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const phone = document.getElementById("userPhone").value;
  const myPhoneNumber = "201157700392";

  const message = `Hello, I'd like to get in touch with you :%0A `;
  +`👤 *Name:* ${encodeURIComponent(name)}%0A` +
    `✉️ *Email;:* ${encodeURIComponent(email)}%0A` +
    `📱 *Phone:* ${encodeURIComponent(phone)}%0A`;

  const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${message}`;
  open(whatsappUrl, "_blank");
});
