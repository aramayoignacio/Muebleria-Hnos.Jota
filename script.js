const productosJSON= [
    {
      "id": "prod_01",
      "name": "Aparador Uspallata",
      "description": "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón...",
      "image": "./assets/AparadorUspallata.png"
    },
    {
      "id": "prod_02",
      "name": "Biblioteca Recoleta",
      "description": "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro...",
      "image": "./assets/BibliotecaRecoleta.png"
    },
    {
      "id": "prod_03",
      "name": "Butaca Mendoza",
      "description": "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú...",
      "image": "./assets/ButacaMendoza.png"
    },
    {
      "id": "prod_04",
      "name": "Sillón Copacabana",
      "description": "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna...",
      "image": "./assets/SillonCopacabana.png"
    },
    {
      "id": "prod_05",
      "name": "Mesa de Centro Araucaria",
      "description": "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal...",
      "image": "./assets/MesadeCentroAraucaria.png"
    }
];
async function getProductsAsync(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(productosJSON);
        }, 2000);
    })
}
function renderProducts(productos){
    const container=document.getElementById('products-container');
    container.innerHTML='';
    const shuffledProducts = productos.sort(() => 0.5 - Math.random());
    const productosDestacados = shuffledProducts.slice(0, 3);
    productosDestacados.forEach(producto => {
         const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-id', producto.id);

        productCard.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>${producto.description}</p>
            <button class="add-to-cart">Añadir al carrito</button>
        `;
        container.appendChild(productCard);
    });
}
async function init(){
    console.log("Iniciando carga de datos...");
    const container =document.getElementById('products-container');
    container.innerHTML='<p> Cargando productos...</p>';
    try {
        const productos = await getProductsAsync();
        renderProducts(productos);

        // Delegación de eventos para el botón
        container.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart')) {
                const productCard = event.target.closest('.product-card');
                const productId = productCard.getAttribute('data-id');
                console.log(`Producto con ID: ${productId} añadido al carrito.`);
            }
        });

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        container.innerHTML = '<p>Lo sentimos, no pudimos cargar los productos.</p>';
    }
}
document.addEventListener('DOMContentLoaded',init);