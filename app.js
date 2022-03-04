// no necesita el hastag, con query si
const carrito = document.getElementById("carrito")
const template = document.getElementById("template")
const fragment = document.createDocumentFragment() //evitar reflow

const botones = document.querySelectorAll(".card .btn")

// prueba para saber si estan bien ligados
// console.log(carrito)
// console.log(template)
// console.log(fragment)
// console.log(btn)

// objeto
const carritoObjeto = []
// con la "e.target" nos traemos la informacion del boton que se digito
const agregarAlCarrito = (e) => {
    console.log(e.target.dataset.fruta)

    // objeto
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1
    }

    const indice = carritoObjeto.findIndex(
        (item) => item.id === producto.id
    )

    console.log(indice)

    if (indice === -1) {
        carritoObjeto.push(producto)
    } else {
        carritoObjeto[indice].cantidad++
    }

    console.log(carritoObjeto)
    pintarCarrito(carritoObjeto)

}

{
    // si le agregamos el .dataset en el console log podemos ver el contenido del data que le pusimos en el html
    // const agregarAlCarrito = (e) => {
    //     console.log(e.target.dataset)
    // }

    // y si le ponemos el nombre que le pusimos en html podemos ver el contenido especifico
    // const agregarAlCarrito = (e) => {
    //     console.log(e.target.dataset.fruta)
    // }

    // para revisar que esten los botones
    // botones.forEach((btn) => console.log(btn));

}

// agregarle producto en la linea 55 no es tan necesario ya que al final se esta usando carritoObjeto en la linea 56, es opcional
const pintarCarrito = (array) => {

    carrito.textContent = ""

    array.forEach((item) => {
        const clone = template.content.firstElementChild.cloneNode(true)
        clone.querySelector(".lead").textContent = item.titulo
        clone.querySelector(".badge").textContent = item.cantidad

        fragment.appendChild(clone)
    })

    carrito.appendChild(fragment)
}


// detectamos los botones y recorre los botones
botones.forEach((btn) => btn.addEventListener("click", agregarAlCarrito))