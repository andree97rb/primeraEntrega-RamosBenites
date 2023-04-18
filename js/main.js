// user

class User {
  constructor(name, email, username, password) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

//userStoreage

function saveUser(user) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

function findUser(emailOrUsername) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(user => user.email === emailOrUsername || user.username === emailOrUsername);
}

//create

const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
  registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (findUser(email) || findUser(username)) {
      Swal.fire({
        icon: 'warning',
        title: 'Usuario ya registrado',
        text: `Ya existe un usuario con el nombre de usuario ${username}`,
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const user = new User(name, email, username, password);

    saveUser(user);

    registrationForm.reset();
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: `El usuario se ha registrado correctamente`,
      showConfirmButton: false,
      timer: 1500
    });
    console.log(findUser("andree@gmail.com"));
  });
}

//login

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailOrUsername = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = findUser(emailOrUsername);

    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos',
        text: `El correo o el nombre de usuario son incorrectos`,
        showConfirmButton: false,
        timer: 1500
      });
      loginForm.reset();
      return;
    }

    if (user.password !== password) {
      swal("Datos incorrectos", "La contraseña es incorrecta.", "error");
      loginForm.reset();
      return;
    }

    swal("¡Bievenido!", "Usted acaba de ingresar exitosamente", "success");
    loginForm.reset();
    localStorage.setItem('username', user.username);
    window.location.href = "../pages/products.html";
  });
}

//minimarket

class Minimarket {
  constructor() {
    this.products = [];
  }

  async getProductsFromApi() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const apiProducts = data.map((product) => new Product(product.title, product.price, product.category, product.image));
      this.products.push(...apiProducts); // Agrega los productos recuperados al array products de la instancia
      return apiProducts;
    } catch (error) {
      console.log(error);
    }
  }

  getCategories() {
    const categories = [];
    this.products.forEach((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    return categories;
  }
}

//product

class Product {
  constructor(name, price, category, image) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
  }
}

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.total = JSON.parse(localStorage.getItem("cartTotal")) || 0;
  }

  addItem(product) {
    this.items.push(product);
    this.total += product.price;
    localStorage.setItem("cartItems", JSON.stringify(this.items));
    localStorage.setItem("cartTotal", this.total);
  }

  removeItem(product) {
    const index = this.items.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.total -= product.price;
      localStorage.setItem("cartItems", JSON.stringify(this.items));
      localStorage.setItem("cartTotal", this.total);
    }
  }

  clearCart() {
    this.items = [];
    this.total = 0;
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotal");
  }
}


function isLoggedIn() {
  return localStorage.getItem("users") !== null;
}

const usernameSpan = document.getElementById('username');

if (isLoggedIn()) {
  const username = localStorage.getItem("username");
  usernameSpan.textContent = "Usuario: " + username;
} else {
  usernameSpan.textContent = "Iniciar sesión";
}

function logout() {
  localStorage.removeItem('username');
  window.location.href = '../pages/login.html';
}

const minimarket = new Minimarket();
const productsContainer = document.getElementById("products-container");

const categorySelector = document.getElementById("category-selector");

const allOption = document.createElement("option");
const cart = new Cart();

getAllCategories = () => {
  const categories = minimarket.getCategories();
  allOption.value = "";
  allOption.textContent = "Todos";


  categorySelector.appendChild(allOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelector.appendChild(option);
  });
}

function filterProducts() {
  if (!isLoggedIn()) {
    productsContainer.innerHTML = "Debes iniciar sesión para ver los productos";
    return;
  }
  const selectedCategory = categorySelector.value;

  let filteredProducts = minimarket.products;

  if (selectedCategory) {
    filteredProducts = minimarket.products.filter(
      (product) => product.category === selectedCategory
    );
  }

  const cards = filteredProducts.map(
    (product) => `
      <div class="col">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Precio: ${product.price} soles</p>
            <p class="card-text">Categoría: ${product.category}</p>
          </div>
          <button class="btn btn-primary" onclick="addToCart('${product.name}', ${product.price})">Agregar al carrito</button>
        </div>
      </div>
    `
  );

  if (cards.length === 0) {
    productsContainer.innerHTML = "No hay productos en esta categoría";
  } else {
    productsContainer.innerHTML = cards.join("");
  }
}

function addToCart(productName) {
  const product = minimarket.products.find((p) => p.name === productName);
  if (product) {
    cart.addItem(product);
    updateCart();
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      text: `Producto: ${product.name}`,
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    alert("Producto no encontrado.");
  }
}

function removeItemFromCart(productName) {
  const product = minimarket.products.find((p) => p.name === productName);
  if (product) {
    cart.removeItem(product);
    updateCart();
  }
}

function clearCart() {
  cart.clearCart();
  updateCart();
}

function buyCart() {
  const totalSum = parseFloat(cart.total.toFixed(1));

  Swal.fire({
    title: 'Comprar',
    html: `
      <form>
        <div class="form-group">
          <label for="name">Nombre completo:</label>
          <input type="text" class="form-control" id="name" required>
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" class="form-control" id="email" required>
        </div>
        <div class="form-group">
          <label for="card-number">Número de tarjeta:</label>
          <input type="text" class="form-control" id="card-number" required>
        </div>
      </form>
    `,
    confirmButtonText: 'Comprar',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    allowOutsideClick: false,
    preConfirm: () => {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const cardNumber = document.getElementById('card-number').value;

      if (!name || !email || !cardNumber) {
        Swal.showValidationMessage('Por favor complete todos los campos');
      } else {
        return { name: name, email: email, cardNumber: cardNumber };
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      clearCart();
      Swal.fire('Compra realizada', `El total de la compra es fue de ${totalSum} soles`, 'success');
    }
  });
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartItems = cart.items.map((item) => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
      ${item.name} - ${item.price} soles 
      <button class="btn btn-danger" onclick="removeItemFromCart('${item.name}')">
        <i class="bi bi-trash">X</i>
      </button>
    </li>
  `);
  cartItemsContainer.innerHTML = cartItems.join("");
  cartTotal.textContent = cart.total.toFixed(2);
}

// Event listeners
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
  logoutButton.addEventListener('click', function () {
    logout();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  minimarket.products = await minimarket.getProductsFromApi();
  console.log(minimarket.products.length)
  getAllCategories();
  filterProducts();
  updateCart();
});