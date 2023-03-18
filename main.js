// Objetos y clases que se usan en el aplicativo

class User {
    constructor() {
        this.names = "";
        this.username = "";
        this.age = 0;
    }

    displayWelcome() {
        alert(`Bienvenido ${this.names.split(" ")[0]} a Minimarket Royal :D!!`);
    }

    displayUsername() {
        alert(`Estimado ${this.names.split(" ")[0]} su username es: ${this.username}`);
    }
}

class Product {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    mostrarInfo() {
        let info = "";
        info += `${this.name}: ${this.price} soles`;
        return info;
    }
}

class Cart {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(product) {
        const index = this.products.indexOf(product);
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }

    watchProductList() {
        let listProducts = "";
        this.products.forEach(
            p => {
                listProducts += `${p.name} ---> ${p.price} \n`;
            }
        );
        return listProducts;
    }

    totalPrice() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}

class Menu {
    constructor(options) {
        this.options = options;
    }

    mostrarMenu() {
        let menuOption = `-------------------- Menú--------------------      [user: ${user.username}]\n`;
        this.options.forEach((opcion, indice) => {
            menuOption += `${indice + 1}. ${opcion} \n`;
        });
        return parseInt(prompt(menuOption));
    }
}

class Minimarket {
    constructor() {
        this.mainMenu = new Menu(["Ver productos", "Comprar", "Configuración", "Salir"]);
        this.cart = new Cart();
        this.products = [
            new Product("Arroz", 5, "Alimentos"),
            new Product("Fideos", 8, "Alimentos"),
            new Product("Harina", 7, "Alimentos"),
            new Product("Azucar", 5, "Alimentos"),
            new Product("Sal", 3, "Alimentos"),
            new Product("Aceite", 10, "Alimentos"),
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
            new Product("Caramelos", 3, "Snacks"),
        ];
        this.categoriesMenu = new Menu(["Alimentos", "Carnes", "Bebidas", "Limpieza", "Cuidado personal", "Snacks", "Salir"]);
        //this.productMenu = new Menu;
        this.buyProducts = new Menu(["Agregar al carrito", "Quitar del carrito", "Comprar", "Salir"]);
    }
}

// Funcion que valida que el string no es vació

const noEmptyString = (input, text, textAgain) => {
    input = prompt(`${text} :`);
    while (input.length === 0) {
        input = prompt(`${textAgain} :`);
    }
    return input;
}

// Funcion para mostrar productos por categoria para el menu

const productsByCategories = (minimarket, category) => {
    let table = "";
    minimarket.products.filter(product => product.category === category)
        .forEach(
            (product, index,) => {
                table += `${index + 1}. ${product.name} ---> ${product.price} soles\n`
            }
        )
    return table;
}

const minimarket = new Minimarket();

const user = new User();

const cart = new Cart();

let age;

age = parseInt(prompt("Ingrese su edad: "));

let names = "";
let username = "";
let activeSubmenu = false;
let activeSubmenu1 = false;

if (age >= 18) {
    user.age = age;
    names = noEmptyString(names, "Ingrese sus nombres completos", "Campo vacío, ingrese sus nombres completos correctamente");
    username = noEmptyString(username, "Ingrese su username", "Campo vacío, ingrese su username correctamete");
    user.names = names;
    user.username = username;
    user.displayWelcome();
    user.displayUsername();

    let selectedOption;

    do {
        selectedOption = minimarket.mainMenu.mostrarMenu();
        switch (selectedOption) {
            case 1:
                activeSubmenu = true;
                // separar productos por categoria
                while (activeSubmenu) {
                    let category = minimarket.categoriesMenu.mostrarMenu();
                    switch (category) {
                        case 1:
                            let table = "";
                            table += productsByCategories(minimarket, "Alimentos");
                            alert(table);
                            break;
                        case 2:
                            let table2 = "";
                            table2 += productsByCategories(minimarket, "Carnes");
                            alert(table2);
                            break;
                        case 3:
                            let table3 = "";
                            table3 += productsByCategories(minimarket, "Bebidas");
                            alert(table3);
                            break;
                        case 4:
                            let table4 = "";
                            table4 += productsByCategories(minimarket, "Limpieza");
                            alert(table4);
                            break;
                        case 5:
                            let table5 = "";
                            table5 += productsByCategories(minimarket, "Cuidado personal");
                            alert(table5);
                            break;
                        case 6:
                            let table6 = "";
                            table6 += productsByCategories(minimarket, "Snacks");
                            alert(table6);
                            break;
                        case 7:
                            alert("Volviendo al menú principal");
                            activeSubmenu = false;
                            break;
                        default:
                            alert("Lo siento, la categoría ingresada no es válida.");
                            break;
                    }
                }
                break;
            case 2:
                // carrito de compras: opraciones como comprar - remover - comprar (listar)
                activeSubmenu1 = true;
                while (activeSubmenu1) {
                    let operationProduct = minimarket.buyProducts.mostrarMenu();
                    switch (operationProduct) {
                        case 1:
                            productName = prompt("Ingrese el nombre del producto a comprar: ");
                            minimarket.products.filter(product => product.name === productName)
                                .forEach(product => cart.addProduct(product))
                                ; break;
                        case 2:
                            if (cart.products.length !== 0) {
                                productName = prompt("Ingrese el nombre del producto a quitar del carro: ");
                                minimarket.products.filter(product => product.name === productName)
                                    .forEach(product => cart.removeProduct(product))
                                    ; break;
                            }else{
                                alert("No hay más productos para eliminar");
                            }


                        case 3:
                            alert(`La lista de productos en su carro a comprar es la siguiente: \n -----Productos-----\n ${cart.watchProductList()} Total a pagar: ${cart.totalPrice()} soles`);
                            break;
                        case 4:
                            alert("Saliendo al menú principal");
                            activeSubmenu1 = false;
                            break;
                        default:
                            alert("Lo siento, opción no es válida.");
                            break;
                    }
                }
                break;
            case 3:
                // editar datos de usuario
                alert(`En caso de no querer modificar algún dato, seleccione cancelar.\nSus Datos actuales son: \nNombres: ${user.names}\nUsername: ${user.username}`);
                let editNames = prompt("Edite su nombre completo: ");
                let editUsername = prompt("Edite su username: ");

                if (editNames !== null && editNames !== '') {
                    user.names = editNames;
                }

                if (editUsername !== null && editUsername !== '') {
                    user.username = editUsername;
                }

                alert(`Sus datos fueron actualizados:\n Nombres: ${user.names} \nUsername: ${user.username}`);
                break;
            case 4:
                alert("Saliendo de la aplicación");
                break;
            default:
                alert("Opción inválida. Por favor, elija una opción del menú.");
                break;
        }
    } while (selectedOption !== 4);

} else {
    alert("Lo sentimos, para comprar debe ser mayor de edad :(");
}
