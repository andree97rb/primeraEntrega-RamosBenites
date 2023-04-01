class User {
  constructor(name, email, username, password) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

function saveUser(user) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

function findUser(emailOrUsername) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(user => user.email === emailOrUsername || user.username === emailOrUsername);
}

const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
  registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (findUser(email) || findUser(username)) {
      swal("Usuario ya registrado", "Este usuario ya ha sido registrado.", "warning");
      return;
    }

    const user = new User(name, email, username, password);

    saveUser(user);

    registrationForm.reset();

    swal("¡Registro exitoso!", "El usuario se ha registrado correctamente.", "success");
    console.log(findUser("andree@gmail.com"));
  });
}


const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailOrUsername = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = findUser(emailOrUsername);

    if (!user) {
      swal("Datos incorrectos", "El correo o el nombre de usuario son incorrectos.", "error");
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



class Minimarket {
  constructor() {
    this.products = [
      new Product("Arroz", 5, "Alimentos"),
      new Product("Fideos", 8, "Alimentos"),
      new Product("Harina", 7, "Alimentos"),
      new Product("Azucar", 5, "Alimentos"),
      new Product("Sal", 3, "Alimentos"),
      new Product("Aceite", 10, "Alimentos"),
      new Product("Caramelos", 3, "Snacks"),
      new Product("Leche", 6, "Alimentos"),
      new Product("Pollo", 15, "Carnes"),
      new Product("Carne de res", 25, "Carnes"),
      new Product("Agua embotellada", 2, "Bebidas"),
      new Product("Gaseosas", 3, "Bebidas"),
      new Product("Cervezas", 12, "Bebidas"),
      new Product("Vinos", 20, "Bebidas"),
      new Product("Jabon en polvo", 8, "Limpieza"),
      new Product("Detergente", 12, "Limpieza"),
      new Product("Suavizante", 18, "Limpieza"),
      new Product("Shampoo", 15, "Cuidado personal"),
      new Product("Acondicionador", 12, "Cuidado personal"),
      new Product("Pasta dental", 7, "Cuidado personal"),
      new Product("Galletas", 4, "Snacks"),
      new Product("Papas fritas", 5, "Snacks"),
      new Product("Chicles", 2, "Snacks"),
    ];
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

class Product {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
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
const cart = new Cart();

const categories = minimarket.getCategories();
const allOption = document.createElement("option");
allOption.value = "";
allOption.textContent = "Todos";


categorySelector.appendChild(allOption);

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categorySelector.appendChild(option);
});

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
          <img src="https://via.placeholder.com/300x200.png?text=${product.name}" class="card-img-top" alt="${product.name}">
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
    swal("Producto agregado", `Producto: ${product.name} .`, "success");
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



document.addEventListener("DOMContentLoaded", () => {
  filterProducts();
  updateCart();
});
