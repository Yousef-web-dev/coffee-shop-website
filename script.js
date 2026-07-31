// ================= Navigation & Sidebars Toggle =================
const navbar = document.querySelector(".navbar");
const searchForm = document.querySelector(".search-form");
const cartItem = document.querySelector(".cart-items-container");
const wishlistContainer = document.querySelector(".wishlist-container");

const menuBtn = document.getElementById("menu-btn");
const searchBtn = document.getElementById("search-btn");
const cartBtn = document.getElementById("cart-btn");
const heartBtn = document.getElementById("heart-btn");

menuBtn?.addEventListener("click", () => {
  navbar?.classList.toggle("active");
  searchForm?.classList.remove("active");
  cartItem?.classList.remove("active");
  wishlistContainer?.classList.remove("active");
});

searchBtn?.addEventListener("click", () => {
  searchForm?.classList.toggle("active");
  navbar?.classList.remove("active");
  cartItem?.classList.remove("active");
  wishlistContainer?.classList.remove("active");
});

cartBtn?.addEventListener("click", () => {
  cartItem?.classList.toggle("active");
  navbar?.classList.remove("active");
  searchForm?.classList.remove("active");
  wishlistContainer?.classList.remove("active");
});

// فتح وإغلاق قائمة المفضلة من الهيدر
heartBtn?.addEventListener("click", () => {
  wishlistContainer?.classList.toggle("active");
  navbar?.classList.remove("active");
  searchForm?.classList.remove("active");
  cartItem?.classList.remove("active");
});

window.addEventListener("scroll", () => {
  navbar?.classList.remove("active");
  searchForm?.classList.remove("active");
  cartItem?.classList.remove("active");
  wishlistContainer?.classList.remove("active");
});

// ================= Wishlist Functionality (Secure DOM) =================
const wishlistBtns = document.querySelectorAll(".add-to-wishlist-btn");
const heartCountElement = document.getElementById("heart-count");

let wishlist = [];

function renderWishlist() {
  if (!wishlistContainer) return;

  // تفريغ العناصر القديمة بأمان
  while (wishlistContainer.firstChild) {
    wishlistContainer.removeChild(wishlistContainer.firstChild);
  }

  if (wishlist.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.classList.add("empty-wishlist");
    emptyMsg.textContent = "Your Wishlist Is Empty";
    wishlistContainer.appendChild(emptyMsg);
  } else {
    wishlist.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("wishlist-item");

      const removeBtn = document.createElement("span");
      removeBtn.classList.add("fas", "fa-times");
      removeBtn.setAttribute("data-index", String(index));
      removeBtn.setAttribute("role", "button");

      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.name;

      const content = document.createElement("div");
      content.classList.add("content");

      const title = document.createElement("h3");
      title.textContent = item.name; // آمن تماماً ضد XSS

      const price = document.createElement("div");
      price.classList.add("price");
      price.textContent = `$${item.price}`;

      content.appendChild(title);
      content.appendChild(price);

      itemEl.appendChild(removeBtn);
      itemEl.appendChild(img);
      itemEl.appendChild(content);

      wishlistContainer.appendChild(itemEl);
    });
  }

  // تحديث العداد
  if (heartCountElement) {
    heartCountElement.textContent = String(wishlist.length);
  }

  // حذف عنصر من المفضلة
  wishlistContainer.querySelectorAll(".fa-times").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = Number(e.target.getAttribute("data-index"));
      wishlist.splice(index, 1);
      renderWishlist();
    });
  });
}

// إضافة المنتج للمفضلة
wishlistBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const box = btn.closest(".box");
    if (!box) return;

    const nameEl = box.querySelector("h3");
    const name = nameEl ? nameEl.textContent.trim() : "Product";

    const priceContainer = box.querySelector(".price");
    let priceText = "0.00";
    if (priceContainer) {
      const clonePrice = priceContainer.cloneNode(true);
      const span = clonePrice.querySelector("span");
      if (span) span.remove();
      priceText = clonePrice.textContent.trim().replace("$", "");
    }

    const imgEl = box.querySelector("img");
    const img = imgEl ? imgEl.getAttribute("src") : "";

    wishlist.push({ name, price: priceText, img });
    renderWishlist();
  });
});

renderWishlist();

// ================= Cart Functionality (Secure DOM) =================
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartElement = document.getElementById("cart-count");
const cartItemsContainer = document.querySelector(".cart-items-container");

let cart = [];

function renderCart() {
  if (!cartItemsContainer) return;

  while (cartItemsContainer.firstChild) {
    cartItemsContainer.removeChild(cartItemsContainer.firstChild);
  }

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.classList.add("empty-cart");
    emptyMsg.textContent = "Your Cart Is Empty";
    cartItemsContainer.appendChild(emptyMsg);
  } else {
    cart.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");

      const removeBtn = document.createElement("span");
      removeBtn.classList.add("fas", "fa-times");
      removeBtn.setAttribute("data-index", String(index));
      removeBtn.setAttribute("role", "button");

      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.name;

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

  if (cartElement) {
    cartElement.textContent = String(cart.length);
  }

  cartItemsContainer.querySelectorAll(".fa-times").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = Number(e.target.getAttribute("data-index"));
      cart.splice(index, 1);
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

    if (name && price && img) {
      cart.push({ name, price, img });
      renderCart();
    }
  });
});

renderCart();