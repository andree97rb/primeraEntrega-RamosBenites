let names = "";
let username = "";
let years = 0;
let price1 = 5;
let price2 = 8;
let price3 = 7;
let price5 = 12.40;
let price6 = 9.90;
let price7 = 26.50;
let price8 = 3;
let price9 = 28.90;
let totalPrice = 0;
let activeSubmenu = false;
let activeSubmenu1 = false;

const principalMenu = () => {
    let menuOption = "Menu Principal\n\n";
    menuOption += "1. Ver productos\n";
    menuOption += "2. Comprar\n";
    menuOption += "3. Configuración\n";
    menuOption += "4. Salir\n";
    return parseInt(prompt(menuOption));
}

const categoriesMenu = () => {
    let menuOption2 = "Categorias de Prodcutos\n\n";
    menuOption2 += "1. Alimentos\n";
    menuOption2 += "2. Carnes\n";
    menuOption2 += "3. Bebidas\n";
    menuOption2 += "4. Limpieza\n";
    menuOption2 += "5. Cuidado personal\n";
    menuOption2 += "6. Snacks\n";
    menuOption2 += "7. Salir\n";

    return parseInt(prompt(`${menuOption2}\n ¿Qué categoría de productos buscas?: `));
}

const principalBuy = () => {
    let menuOption = "Menu Comprar\n\n";
    menuOption += "1. Comprar\n";
    menuOption += "2. Quitar producto\n";
    menuOption += "3. Salir\n";
    return parseInt(prompt(menuOption));
}



const selectProduct = () => {
    let product = parseInt(prompt("Ingrese el número del producto:"));
    let price = 0;

    switch (product) {
        case 1: price = price1; break;
        case 2: price = price2; break;
        case 3: price = price3; break;
        case 4: price = price1; break;
        case 5: price = price1; break;
        case 6: price = price5; break;
        case 7: price = price2; break;
        case 8: price = price6; break;
        case 9: price = price7; break;
        case 10: price = price1; break;
        case 11.: price = price8; break;
        case 12.: price = price7; break;
        case 13: price = price7; break;
        case 14: price = price1; break;
        case 15: price = price2; break;
        case 16: price = price7; break;
        case 16: price = price7; break;
        case 17: price = price9; break;
        case 18: price = price7; break;
        case 19: price = price7; break;
        case 20: price = price5; break;
        case 21: price = price6; break;
        case 22: price = price6; break;
        case 23: price = price2; break;
    }
    return price;
}


// MAIN

years = parseInt(prompt("Ingrese su edad: "));

if (years >= 18) {
    while (names.length === 0) {
        names = prompt("Ingrese su nombre completo: ");
    }
    alert("Bienvenido " + names.split(" ")[0] + " a Minimarket Royal :D!!");

    while (username.length === 0) {
        username = prompt("Ingrese su username: ");
    }

    alert("Estimado " + names.split(" ")[0] + " su username es: " + username);

    let selectedOption;

    do {
        selectedOption = principalMenu();
        switch (selectedOption) {
            case 1:
                activeSubmenu = true;
                while (activeSubmenu) {
                    let category = categoriesMenu();
                    switch (category) {
                        case 1:
                            alert(`1. Arroz: ${price1} soles/paquete\n2. Fideos: ${price2} soles/paquete\n3. Harina: ${price3} soles/paquete\n4. Azucar: ${price1} soles/paquete\n5. Sal: ${price1} soles/paquete\n6. Aceite: ${price5} soles/botella\n7. Leche: ${price2} soles/botella`);
                            break;
                        case 2:
                            alert(`8. Pollo: ${price6} soles 2.3kg\n9. Carne de res: ${price7} soles 0.7kg`);
                            break;
                        case 3:
                            alert(`10. Agua embotellada:  ${price1} soles/botella\n11. Gaseosas: ${price8} soles/lata\n12. Cervezas: ${price7} soles/caja de 6 unidades\n13. Vinos: ${price7} soles/unidad`);
                            break;
                        case 4:
                            alert(`14. Jabon en polvo: ${price1} soles/unidad\n15. Detergente: ${price2} soles/botella\n16. Suavizante: ${price7} soles/botella\n`);
                            break;
                        case 5:
                            alert(`17. Shampoo: ${price9} soles/botella\n18. Acondicionador: ${price7} soles/botella\n19. Pasta dental: ${price7} soles/tubo`);
                            break;
                        case 6:
                            alert(`20. Galletas: ${price5} soles/paquete\n21. Papas fritas: ${price6} soles/bolsa\n22. Chicles: ${price6} soles/paquete\n23. Caramelos: ${price2} soles/bolsa`);
                            break;
                        case 7:
                            alert("Saliendo al menú principal");
                            activeSubmenu = false;
                            break;
                        default:
                            alert("Lo siento, la categoría ingresada no es válida.");
                            break;
                    }
                }

                break;

            case 2:
                activeSubmenu1 = true;
                while (activeSubmenu1) {
                    let operationProduct = principalBuy();
                    switch (operationProduct) {
                        case 1:
                            totalPrice += selectProduct();
                            alert("total de precio es: " + totalPrice);
                            break;
                        case 2:
                            totalPrice -= selectProduct();
                            alert("total de precio es: " + totalPrice);
                            break;
                        case 3:
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
                alert(`En el caso no quiera modificar algún dato, seleccione cancelar\n Sus Datos actuales son: \nNombres: ${names}\n Username: ${username}`);
                let editNames = prompt("Edite su nombres completos: ");
                let editUsername = prompt("Edite su username: ");

                if (editNames !== null) {
                    names = editNames;
                    alert(`Sus datos fueron actualizados:\n Nombres: ${names} \nUsername: ${username}`);
                }
                if (editUsername !== null) {
                    username = editUsername;
                    alert(`Sus datos fueron actualizados:\n Nombres: ${names} \nUsername: ${username}`);
                }
                break;
            case 4:
                alert("Saliendo del menú...");
                break;
            default:
                console.log("Opción inválida. Por favor, elija una opción del menú.");
        }
    } while (selectedOption !== 4);
} else {
    alert("Lo sentimos, para comprar debe ser mayor de edad :(");
}

