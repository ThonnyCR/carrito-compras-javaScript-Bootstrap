// no necesita el hastag, con query si
const carrito = document.getElementById("carrito")
const template = document.getElementById("template")
const fragment = document.createDocumentFragment() //evitar reflow
const footer = document.getElementById("footer")
const templateFooter = document.getElementById("templateFooter")


document.addEventListener("click", (e) => {
    // console.log(e.target.matches(".card .btn-outline-primary"))
    if (e.target.matches(".card .btn-outline-primary")) {
        //console.log("ejecutar agregar al carro")
        agregarAlCarrito(e)
    }

    // console.log(e.target.matches(".list-group-item .btn-success"))

    if (e.target.matches("#carrito .list-group-item .btn-success")) {
        btnAumentar(e)
    }

    if (e.target.matches("#carrito .list-group-item .btn-danger")) {
        btnDisminuir(e)
    }
})
// prueba para saber si estan bien ligados
// console.log(carrito)
// console.log(template)
// console.log(fragment)
// console.log(btn)

// objeto
let carritoObjeto = []
// con la "e.target" nos traemos la informacion del boton que se digito
const agregarAlCarrito = (e) => {
    // console.log(e.target.dataset.fruta)

    // objeto
    //Aqui se capturan los data
    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
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
    pintarCarrito()
    pintarFooter()
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
const pintarCarrito = () => {

    carrito.textContent = ""

    carritoObjeto.forEach((item) => {
        const clone = template.content.cloneNode(true)
        clone.querySelector(".text-white .lead").textContent = item.titulo
        clone.querySelector(".badge").textContent = item.cantidad
        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad;

        clone.querySelector(".btn-danger").dataset.id = item.id
        clone.querySelector(".btn-success").dataset.id = item.id
        // NOTA: el fragment mayormente se utiliza en ciclos, como carritoObjeto
        fragment.appendChild(clone)
    })

    carrito.appendChild(fragment)
}

const pintarFooter = () => {
    footer.textContent = ""

    const total = carritoObjeto.reduce(
        (acc, current) => acc + current.cantidad * current.precio, 0
    )

    const clone = templateFooter.content.cloneNode(true)

    clone.querySelector("span").textContent = total
    footer.appendChild(clone)
}
const btnAumentar = (e) => {
    // console.log("me diste click", e.target.dataset.id)
    carritoObjeto = carritoObjeto.map(item => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++
        }
        return item
    })
    pintarCarrito()
}

const btnDisminuir = (e) => {
    carritoObjeto = carritoObjeto.filter(item => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--
                if (item.cantidad === 0) return //si el item es igual a 0 se borra el elemento
                return item
            }
        } else { return item }
    })
    pintarCarrito()
}
// detectamos los botones y recorre los botones
// botones.forEach((btn) => btn.addEventListener("click", agregarAlCarrito))