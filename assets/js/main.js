'use-strict'

const addEvent = (element, nameEvent, functiontoadd) => {
    element.addEventListener(nameEvent, functiontoadd)
}
import {
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
} from './components/cart-shop.js'
cartProductClear()
// productPrint()


productsDOM.addEventListener('click', (e) => {
    if (e.target.matches('.btn_buy')) {
        let id = e.target.parentElement.parentElement.getAttribute('data-id')
        id = Number(id)
        let amount = e.target.parentElement.querySelector('.cant__prod')
        amount = Number(amount.value)

        cartProductAdd(id, amount)
    }
})

cartDOM.addEventListener('click', (e) => {
    if (e.target.matches('.add')) {
        let id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id')
        id = Number(id)
        cartProductAdd(id, 1)
    } else if (e.target.matches('.rest')) {
        let id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id')
        id = Number(id)
        cartProductRest(id, 1)
    } else if (e.target.matches('.icontrash')) {
        let id = e.target.parentElement.parentElement.getAttribute('data-id')
        cartProductRemove(id)
    }

})

const trashTodo = cartShop.cart.modal
trashTodo.addEventListener('click', (e) => {
    if (e.target.id == 'incontrashGlobal') {
        cartProductClear()
    } else if (e.target.matches('#checkoutButton')) {
        cartProductBuy(e.target)
    }

})


/***********    Cambiar estilos inicio      ********* */
const theme__document = document.getElementById('theme__document')
const link__style = document.head.querySelector('#style')
theme__document.addEventListener('click', () => {
    const styles = {
        default: 'style.css',
        dark: 'style-dark.css'
    }
    if (link__style.getAttribute('href') == styles.default)
        link__style.setAttribute('href', styles.dark)
    else
        link__style.setAttribute('href', styles.default)
})
/***********    Categorias inicio     ********* */
import myCSS from './components/mycss.js'
const categorys = document.querySelector('.categorys')
const prod__cards = document.querySelector('.prod__cards')

categorys.addEventListener('click', ({ target }) => {
    if (target.type == "radio") {
        let filter = target.parentElement.getAttribute('data-filter')
        if (filter == 'all') filter = false
        else filter = filter.slice(1)
        console.log(filter);
        setFilter(filter)
        myCSS.toggleAnimation(prod__cards ,'prod__cards--animation')
    }
})
setTimeout(() => {
    myCSS.toggleAnimation(prod__cards ,'prod__cards--animation')
}, 100);
/***********    Categorias final     ********* */

/* base de datos**/
