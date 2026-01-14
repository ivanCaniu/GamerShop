const products = [
    {
        id: 1,
        name: "Mortal Kombat 1",
        price: 59.99,
        plataforma: "PC,PS5,Xbox Series X",
        image: "https://juegosdigitaleschile.com/files/images/productos/1718399285-mortal-kombat-1-premium-edition-0.webp",
        description: "Revive la épica saga de Mortal Kombat con gráficos impresionantes y una jugabilidad mejorada.",
        categoria: "Lucha"
    },

    {
        id: 2,
        name: "FIFA 24",
        price: 49.99,
        plataforma: "PC,PS5,Xbox Series X",
        image: "https://jdigitales.cl/cdn/shop/files/ea-sports-fc-3083570.webp?v=1690391295&width=1946",
        description: "El juego de fútbol más realista del mercado con nuevas características y mejoras.",
        categoria: "Deportes"
    },

    {
        id: 3,
        name: "The Legend of Zelda: Tears of the Kingdom",
        price: 69.99,
        plataforma: "Nintendo Switch",
        image: "https://cdnx.jumpseller.com/japan-market-chile/image/33555469/resize/540/540?1680182817",
        description: "Explora un vasto mundo abierto lleno de aventuras y misterios en la última entrega de Zelda.",
        categoria: "Aventura"
    },

    {
        id: 4,
        name: "Elden Ring",
        price: 59.99,
        plataforma: "PC,PS5,Xbox Series X",
        image: "https://m.media-amazon.com/images/I/81h2WhI4dtL.jpg",
        description: "Un juego de rol de acción en un mundo abierto creado por los desarrolladores de Dark Souls.", 
        categoria: "RPG"
    }

]

let usuarioLogueado = localStorage.getItem("sesionActiva") === "true";


// 1. Seleccionamos el lugar donde se mostrarán
const contenedor = document.getElementById("contenedor-productos");

// 2. Función para mostrar los productos
function mostrarProductos(lista) {
    // Limpiamos el contenedor por si acaso
    contenedor.innerHTML = "";

    // Recorremos el array de productos del archivo image_00d12f.jpg
    lista.forEach(producto => {
        
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <div class="product-info">
                <p class="platform">${producto.plataforma}</p>
                <h3>${producto.name}</h3>
                <p class="price">$${producto.price}</p>
                <p>${producto.description}</p>
                <h4>Categoría: ${producto.categoria}</h4>
                <button class="btn-add" onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
            </div>
        `;

      
        contenedor.appendChild(card);
    });
}

mostrarProductos(products);


// 1. Array vacío para guardar lo que el usuario elija
let carrito = [];

function agregarAlCarrito(id) {
    // 1. Buscamos el producto en tu lista original
    const juego = products.find(p => p.id === id);

    if (juego) {
        // 2. Lo metemos al array del carrito
        carrito.push(juego);
        
        // 3. Actualizamos el numerito del contador
        const spanContador = document.getElementById("cart-count");
        if (spanContador) spanContador.innerText = carrito.length;

        
        renderizarCarrito();
        
        console.log("Producto agregado con éxito:", juego.name);
    }
}

function renderizarCarrito() {
    const listaHTML = document.getElementById("lista-carrito");
    const totalHTML = document.getElementById("total-precio");

   
    if (!listaHTML) return;

    // Limpiamos lo que había antes
    listaHTML.innerHTML = "";

    // Si el carrito está vacío, mostramos un mensaje
    if (carrito.length === 0) {
        listaHTML.innerHTML = '<p style="color: #888; text-align: center;">Tu carrito está vacío</p>';
    } else {
        // Recorremos el carrito y creamos el HTML de cada juego
        carrito.forEach((prod, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("carrito-item"); 
            
            itemDiv.innerHTML = `
                <img src="${prod.image}" width="50" height="60" style="object-fit: cover; border-radius: 4px;">
                <div style="flex-grow: 1; margin-left: 10px;">
                    <p style="font-size: 0.9rem; margin: 0; color: white;">${prod.name}</p>
                    <p style="color: #00ff88; font-weight: bold; margin: 0;">$${prod.price}</p>
                </div>
                <button onclick="eliminarDelCarrito(${index})" style="background: none; border: none; color: #ff4444; cursor: pointer;">❌</button>
            `;
            listaHTML.appendChild(itemDiv);
        });
    }

    // Calculamos el total sumando los precios de tu lista
    const total = carrito.reduce((suma, p) => suma + p.price, 0);
    if (totalHTML) totalHTML.innerText = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    document.getElementById("cart-count").innerText = carrito.length;
    renderizarCarrito();
}


// 1. Seleccionamos el icono y el carrito
const iconoCarrito = document.getElementById("cart-icon");
const carritoVentana = document.getElementById("carrito-lateral");
const btnCerrar = document.getElementById("cerrar-carrito");

// 2. Evento para ABRIR el carrito
iconoCarrito.addEventListener("click", (e) => {
    e.preventDefault(); 
    carritoVentana.classList.add("carrito-activo");
    renderizarCarrito(); 
});

// 3. Evento para CERRAR el carrito
btnCerrar.addEventListener("click", () => {
    carritoVentana.classList.remove("carrito-activo");
});


// Simulacion de compra

// Seleccionamos el botón de finalizar compra
const btnPagar = document.querySelector(".btn-pagar");

if (btnPagar) {
    btnPagar.addEventListener("click", () => {
        // 1. Verificamos si hay productos en el carrito
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. ¡Añade algunos juegos antes de comprar!");
            return;
        }

        if (!usuarioLogueado) {
            alert("Debes iniciar sesión para finalizar tu compra.");
            // Redirigir a la nueva pantalla de login que creamos
            window.location.href = "login.html"; 
            return;
        }

        // 2. Calculamos el total para el mensaje final
        const total = carrito.reduce((suma, p) => suma + p.price, 0);

        // 3. Simulamos el procesamiento (puedes añadir un mensaje de 'Procesando...')
        alert(`🎮 ¡Gracias por tu compra en GamerShop!\n\nHas adquirido ${carrito.length} productos.\nTotal pagado: $${total.toFixed(2)}\n\nTe enviaremos los códigos a tu correo.`);

        // 4. Vaciamos el array del carrito
        carrito = [];

        // 5. Actualizamos el contador visual
        const spanContador = document.getElementById("cart-count");
        if (spanContador) spanContador.innerText = "0";

        // 6. Volvemos a dibujar el carrito vacío
        renderizarCarrito();

        // 7. Cerramos el carrito lateral automáticamente
        document.getElementById("carrito-lateral").classList.remove("carrito-activo");
    });
}

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Aquí iría la validación real de usuario/contraseña
    alert("¡Inicio de sesión exitoso!");
    
    // Guardamos en el navegador que el usuario ya entró
    localStorage.setItem("sesionActiva", "true");
    
    // Volvemos a la tienda
    window.location.href = "index.html";
});