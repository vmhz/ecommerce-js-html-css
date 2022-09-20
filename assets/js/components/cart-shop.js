import { cartShop } from './cart-elements.js'
import products from '../database/index.js'
let cart = []
const cartDOM = cartShop.cart.products
const productsDOM = cartShop.products.cards

function cartProductPrint() {
    cartDOM.innerHTML = ""
    let dibujar = ''
    if (cart) cart.forEach(({ id, category, img, title, price, amount }) => {
        const template =
            `<section data-id="${id}" data-category="${category}" class="art__card">
            <figure class="art__img">
                <img src="${img}" alt="" class="img_art" id="img_art">
            </figure>

            <content class="art__inf">
                <h4>${title}</h4>
                <div class="art__decription">
                    <span class="art__price">${price}</span>
                </div>
                <div class="cart__amount">
                    <div class="amount__btn cart-btn rest">-</div>
                    <span class="art_cant" id="art_cant">${amount}</span>
                    <div class="amount__btn cart-btn add">+</div>
                </div>
            </content>

            <div class="trashBx">
                <i class='bx bx-trash icontrash'></i>                        

            </div>
        </section>
        `
        dibujar += template
    })
    cartDOM.innerHTML = dibujar
    totalCheckout(cart)
}
function cartProductAdd(id, amount) {
    let product;
    product = cart.find(product => product.id == Number(id));
    if (amount > products[Number(id) - 1].stock) {
        alert('Ya no queda stock de ' + products[Number(id) - 1].title)
        return;
    }

    if (product == undefined) {
        product = products[Number(id) - 1]
    }

    const productAdd = (
        {
            id: product.id,
            category: product.category,
            img: product.img,
            title: product.title,
            price: product.price,
            amount: product.amount
        }
    )
    if (productAdd.amount) {
        product.amount += amount
    }
    else {
        productAdd.amount = amount
        cart.push(productAdd)
    }

    products[Number(id) - 1].stock -= amount


    productPrint()
    cartProductPrint()
}
function cartProductRemove(id) {
    let productIndex;
    productIndex = cart.findIndex(product => product.id == id)
    products[Number(id) - 1].stock += cart[productIndex].amount
    cart.splice(productIndex, 1)

    productPrint();
    cartProductPrint();
}
function cartProductRest(id, amount) {
    let product;
    product = cart.find(product => product.id == id)
    if (amount >= product.amount) {
        cartProductRemove(id)
    }
    products[Number(id) - 1].stock += amount
    product.amount -= amount


    productPrint();
    cartProductPrint();
}
function cartProductClear() {
    cart.forEach(({ id, amount }) => {
        products[+id - 1].stock += amount

    })
    cart = []
    cartDOM.innerHTML = ""
    productPrint();
    cartProductPrint();
}
const cartProductBuy = (target) => {
    let total = cart.map(x => x.price * x.amount).reduce((z, y) => z + y)
    // console.log(target);
    cartDOM.innerHTML = ""
    let structForm = {
        form: document.createElement('form'),
        NAMECLIENT: target.parentElement.querySelector('.NAMECLIENT'),
        PRODUCTOS: document.createElement('input'),
        FECHA: document.createElement('input'),
        TOTAL: document.createElement('input')
    }
    const form = ({ form, NAMECLIENT,PRODUCTOS, FECHA, TOTAL }) => {
        form.name = 'Registro_Compras'

        PRODUCTOS.name = "PRODUCTOS"
        PRODUCTOS.value = JSON.stringify(cart)

        TOTAL.name = "TOTAL"
        TOTAL.value = total

        FECHA.name = "FECHA"
        FECHA.value = new Date().toLocaleString()

        form.append(NAMECLIENT)
        form.append(PRODUCTOS)
        form.append(TOTAL)
        form.append(FECHA)
        return form
    }


    const scriptURL = 'https://script.google.com/macros/s/AKfycbyNQ_uKlTlkX5_rPvSHgqm3oW39NskQwjs-RL-eCtQr3Bj_51OjH8Mi0cZvVFdRt8aVMQ/exec'

    fetch(scriptURL, { method: 'POST', body: new FormData(form(structForm)) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))

    alert(`Gracias por su compra, su total fue $${total}`)
    cart = []
    return total
}

const productPrint = () => {
    /* requiere de template de producto */
    let dibujar = ''
    products.forEach(({ id, title, category, img, price, stock }) => {
        if (filter && category != filter) return;
        const template =
            `<article class="prod__cardbuy ${category}" data-id="${id}" data-category="${category}">
        <section class="prod__card">
            <div class="prod__img">
                <img src="${img}" alt="">
            </div>

            <div class="prod__inf">
                <h4>${title}</h4>
                <div class="prod__decription">
                    <span class="prod__price">${price}</span>

                    <span class="prod__text__stock">
                        | Stock:
                        <span class="prod__stock">${stock}</span>
                    </span>
                </div>
            </div>

        </section>
        <section class="prod__buy">
            <div class="prod__amount">
                <span class="amount__btn remove"><i class='bx bx-minus'></i></span>
                <input type="text" class="cant__prod" value="1">
                <span class="amount__btn add"><i class='bx bx-plus'></i></span>
            </div>
            <span class="btn_buy" id="btn_buy">Buy</span>
        </section>
    </article>`
        dibujar += template
    })
    productsDOM.innerHTML = dibujar
}

const totalCheckout = (cart) => {
    let total = cart.length > 0 ? cart.map(x => x.price * x.amount).reduce((z, y) => z + y) : 0
    document.getElementById('total-print').innerHTML = `  $${total}`
}

let filter
const setFilter = (filterName) => {
    filter = filterName
    productPrint()
}

export {
    setFilter,
    productPrint,
    cartProductPrint,
    cartProductAdd,
    cartProductRemove,
    cartProductRest,
    cartProductClear,
    cartProductBuy,
    productsDOM,
    cartDOM,
    products,
    cart,
    cartShop,
}