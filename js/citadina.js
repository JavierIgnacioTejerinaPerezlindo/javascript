const articulos = document.getElementById("contenedor_tarjetas")
const elegidos = document.getElementById('elegidosHtml')
const pieCarro = document.getElementById('pieCarroHtml')
const cardArticulos = document.getElementById('card_articulos').content
const tempCarrito = document.getElementById('tempCarritoHtml').content
const tempPieCarro = document.getElementById('tempPieCarroHtml').content
const fragmento = document.createDocumentFragment()
let carrito = {}


document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    mostrarCarrito()
});

articulos.addEventListener('click', (event) => {
    agregarcarrito(event)
});
async function fetchData() {
    try {
        const res = await fetch('./json/productos.json');
        const productos = await res.json();
        console.log(productos);
        crearCard(productos);
    }
    catch (error) {
        console.log(error);
    };
}

const crearCard = (productos) => {
    productos.forEach(producto => {
        cardArticulos.querySelector('h5').textContent = producto.precio
        cardArticulos.querySelector('p').textContent = producto.descripcion
        cardArticulos.querySelector('img').setAttribute("src", producto.imagen)
        cardArticulos.querySelector('.btn-primary').dataset.id = producto.id

        const clone = cardArticulos.cloneNode(true)
        fragmento.appendChild(clone)

    });

    articulos.appendChild(fragmento);

}

const agregarcarrito = (event) => {
    if (event.target.classList.contains('btn-primary')) {
        crearObjetoCarrito(event.target.parentElement)
    }
    event.stopPropagation()
};

const crearObjetoCarrito = objetoHtml => {
    const ObjetoCarrito = {
        id: objetoHtml.querySelector('.btn-primary').dataset.id,
        descripcion: objetoHtml.querySelector('p').textContent,
        precio: objetoHtml.querySelector('h5').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(ObjetoCarrito.id)) {
        ObjetoCarrito.cantidad = carrito[ObjetoCarrito.id].cantidad + 1
    }
    carrito[ObjetoCarrito.id] = { ...ObjetoCarrito }
    mostrarCarrito();
}

const mostrarCarrito = () => {
    elegidos.innerHTML = ''
    fragmento.innerHTML = ''

    Object.values(carrito).forEach(ObjetoCarrito => {
        tempCarrito.querySelector('th').textContent = ObjetoCarrito.id
        tempCarrito.querySelectorAll('td')[0].textContent = ObjetoCarrito.descripcion
        tempCarrito.querySelectorAll('td')[1].textContent = ObjetoCarrito.cantidad
        tempCarrito.querySelector('span').textContent = ObjetoCarrito.precio * ObjetoCarrito.cantidad

        const clone = tempCarrito.cloneNode(true)
        fragmento.appendChild(clone)

        console.log(fragmento)
        elegidos.appendChild(fragmento)
    })


}


