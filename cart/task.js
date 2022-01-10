// ### Task 6.3 ###

const products = document.querySelector('.products');  // элемент "контейнер продуктов"
const productAdd = products.querySelectorAll('.product__add');  //  коллекция элементов кнопок "добавить в корзину"
const quantityControlInc = products.querySelectorAll('.product__quantity-control_inc'); //  коллекция элементов управления "+"
const quantityControlDec = products.querySelectorAll('.product__quantity-control_dec'); //  коллекция элементов управления "-"

const product = document.querySelectorAll('.product'); // коллекция элементов "карта заказываемого продукта"
const cart = document.querySelector('.cart');  //  элемент "корзина продуктов"
let cartProducts;   // коллекция элементов "продукты в корзине"



function productsCartOperate(event) { // функция управления заказом товара 
    
    elem = event.target;  // получение элемента, по которому осуществлён клик
    
    for (let i = 0; i < productAdd.length; i++) {       // перебор элементов управления в общем цикле    
    
        if (
            (elem === productAdd[i]) && 
            (Number(productAdd[i].previousElementSibling.children[1].
            textContent) > 0)  //если кол-во товара, отправляемого в корзину, больше нуля
            ) {
               
                let productId = product[i].dataset.id;  // получение артикула товара, передаваемого в корзину
                let productImg = product[i].querySelector('img').
                getAttribute('src');    //  получение ссылки на изображение товара, передаваемого в корзину  
                let productCount = quantityControlInc[i].previousElementSibling.textContent; // получение количества товара, передаваемого в корзину
                addProduct(productId, productImg, productCount);  // добавляем товар в корзину
                productAdd[i].previousElementSibling.children[1].
                    textContent = 1; // сброс счётчика желаемого товара в панели заказа к первоначальному состоянию ("1"), после отправки товара в корзину
        };

        if (elem === quantityControlInc[i]) {  // увеличиваем на 1 количество желаемого товара
            
            quantityControlInc[i].previousElementSibling.textContent = 
                Number(quantityControlInc[i].previousElementSibling.textContent) +1;  // увеличение количества желаемого товара
        };

        if (elem === quantityControlDec[i]) {  // уменьшаем на 1 количество желаемого товара

            let decValue = Number(quantityControlDec[i].nextElementSibling.textContent);
            if (decValue > 0) {
                quantityControlDec[i].nextElementSibling.textContent = decValue -1;  // уменьшение количества желаемого товара (не ниже, чем до нуля)
            };
        };
    };

    cartProducts = cart.querySelectorAll('.cart__products'); // обновление коллекции элементов в корзине

    if (cartProducts !== null){ //проверка корзины: если пустая, проверку внутри не проводить
        for (let d = 0; d < cartProducts.length; d++ ) {  // перебор элементов в корзине (для того, чтобы удалить тот элемент, крестик которого кликнут)
     
            if (elem === cartProducts[d].querySelector('.prod__remove')) { 
                elem.parentElement.parentElement.remove();

                if (cartProducts.length === 1) cart.classList.remove('cart_not_empty'); // скрыть корзину (и заголовок), если из неё был удалён последний элемент
            };
                    
        };
    };
};

function addProduct(productId, productImg, productCount) {  // функция добавления товара в карзину
    
    cartProducts = cart.querySelectorAll('.cart__products'); 
    let currentNamesProductsCount = cartProducts.length;  //текущее количество наименований товаров в корзине
    let productIn = false; 
    
    for (let m = 0; m < currentNamesProductsCount; m++) { // если продукт в корзине уже есть
    
        if (currentNamesProductsCount > 0) {
            if (cartProducts[m].querySelector('.cart__product').dataset.id === productId) {
                cartProducts[m].querySelector('.cart__product-count').textContent = 
                     Number(cartProducts[m].querySelector('.cart__product-count').textContent) + Number(productCount); // увеличить количество текущего товара на productId-единиц
                     productIn = true;
            };
        };
    };    
        
    if (!productIn) {
            cart.insertAdjacentHTML('beforeend', `
                        <div class="cart__products">
                            <div class="cart__product" data-id="${productId}">
                                <img class="cart__product-image" src="${productImg}">
                                <div class="cart__product-count">${productCount}</div>
                                <a href="#" class="prod__remove">&times;</a>
                            </div>
                        </div>`); // добавление нового DOM-элемента, являющегося новым товаром в корзине
    };

    if (currentNamesProductsCount === 0) cart.classList.add('cart_not_empty'); // Показать корзину (и заголовок) только если в корзине есть хотя бы один товар
    
};


document.addEventListener('click', productsCartOperate)  // обработка события клика на один из элементов управления



