/*Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости
 от находящихся в ней товаров. Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины. 
3.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
3.2. Реализуйте такие объекты.
3.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
3.4.Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
3.5. Пустая корзина должна выводить строку «Корзина пуста»;
3.6. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
4*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
4.1. Создать массив товаров (сущность Product);
4.2. При загрузке страницы на базе данного массива генерировать вывод из него.
 HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
*/
'use strict'
var products = {
    settings: {// переменные которые будем использовать
        classImageElement: 'myImage',
        lastGoodsId: '',
        totalPrice: 0,
        totalCountBasket: 0,
    },
    customer: {
        firstName: 'Вася',
        lastName: 'Пупкин',
        customerBye: [],

    },
    goodsForSale: [
        {
            id: 1,
            namePurcase: 'Рубашка',
            quantity: 2,
            price: 1500,
            goodsSourceImage: 'images/min/rubaska.jpg',
            classImage: 'images_goods_class',
        },
        {
            id: 3,
            namePurcase: 'Шапка',
            quantity: 2,
            price: 500,
            goodsSourceImage: 'images/min/shljapa.jpg',
            classImage: 'images_goods_class',
        },
        {
            id: 2,
            namePurcase: 'Брюки',
            quantity: 2,
            price: 1000,
            goodsSourceImage: 'images/min/brjuki.jpg',
            classImage: 'images_goods_class',
        },
        {
            id: 4,
            namePurcase: 'Носки',
            quantity: 2,
            price: 100,
            goodsSourceImage: 'images/min/noski.jpg',
            classImage: 'images_goods_class',
        },
        {
            id: 5,
            namePurcase: 'Майка',
            quantity: 2,
            price: 150,
            goodsSourceImage: 'images/min/majka.jpg',
            classImage: 'images_goods_class',
        },
        {
            id: 6,
            namePurcase: 'Перчатки',
            quantity: 2,
            price: 950,
            goodsSourceImage: 'images/min/perchatki.jpg',
            classImage: 'images_goods_class',
        },
    ],

    userBye: [],

    countTotalPrice() {// Подсчет стоимости покупок в корзине
        let totalPrice = 0, totalCountBasket = 0;
        for (let i = 0; i < this.userBye.length; i++) {
            totalPrice += this.userBye[i].quantity * this.userBye[i].price;
            totalCountBasket += this.userBye[i].quantity;
        }
        return [totalPrice, totalCountBasket];
    },
    userPurchase(event) {// обработчик нажатий на картинку
        if (event.target.tagName !== 'IMG') return;
        this.settings.lastGoodsId = event.target.className.split('-')[2];//выделили id


        this.operationPurchase(this.settings.lastGoodsId);
    },

    operationPurchase(goodsId) {//Добавление товаров в корзину
        for (let i in this.goodsForSale) {
            if (this.goodsForSale[i].id == goodsId) {
                //Если этого товара в корзине нет добавляем сам товар в количестве 1 штука иначе 
                // прибавляем количество+1
                let find = false;
                for (let j in this.userBye) {
                    find = this.userBye[j].id == goodsId ? true : false;
                    var count = j;// при сбросе счетчик обнуляется
                    if (find) break;
                }
                if (!find) {
                    // Если нет такого в корзине то копируем с количеством 1
                    let objCopy = Object.assign({}, this.goodsForSale[i]);
                    objCopy.quantity = 1;
                    this.userBye.push(objCopy);
                    alert(objCopy.namePurcase);

                } else {
                    this.userBye[count].quantity += 1;
                    alert(this.userBye[count].quantity);
                }

                break;
            }
        }
        this.renderBasket();
    },

    //Обновление вывода корзины товаров
    renderBasket() {

        let count = this.countTotalPrice();
        this.settings.totalPrice = count[0];
        this.settings.totalCountBasket = count[1];

        // если такой элемент уже есть удалим  эту область
        let el = document.getElementsByClassName('cashProduct');
        let outWindow = (el.length !== 0) ? el[0].remove() : 1;

        //выведем стоимость корзины
        outWindow = document.createElement('div');
        let textContent = (this.settings.totalPrice == 0) ?
            'Ваша корзина пуста!' : '<div> Общая стоимость покупок: '
            + this.settings.totalPrice +
            '\n</div>' + '<div>Общее количество товаров:' + this.settings.totalCountBasket + ' </div>';
        outWindow.insertAdjacentHTML('beforeend', textContent);
        outWindow.className = 'cashProduct';
        outWindow.style.border = '1px solid black';
        document.body.appendChild(outWindow);
    },

    init(arrayProducts) {// вывод массива сущностей товаров на экран
        //создадим область где будем выводит наши товары
        let parrentOutWindow = document.createElement('div');
        parrentOutWindow.style.display = 'flex';
        parrentOutWindow.style.flexWrap = 'wrap';
        parrentOutWindow.classList.add('parrentOutWindow');
        document.body.appendChild(parrentOutWindow);

        for (let i = 0; i < arrayProducts.length; i++) {
            //Для каждго товара свое окно
            let outWindow = document.createElement('div');
            outWindow.style.width = '49%';
            outWindow.className = 'cardProduct' + i;
            outWindow.style.border = '1px solid black';

            //Для каждого изображения свою обасть и класс
            const goodsImage = document.createElement('div');
            goodsImage.classList.add(arrayProducts[i].classImage + '-' + i);
            outWindow.appendChild(goodsImage);


            //Вставляем рисунок
            const imageElement = new Image();
            imageElement.classList.add(arrayProducts[i].classImage + '-img' + '-' + arrayProducts[i].id);
            imageElement.src = arrayProducts[i].goodsSourceImage;

            //Вставляем обработчик кликов изображения
            imageElement.addEventListener('click', (event) => {
                this.userPurchase(event);
            });

            outWindow.appendChild(imageElement);

            //  область текстовый контент
            let textContent = '<div> Название продаваемого товара: ' + arrayProducts[i].namePurcase + '\n</div>';
            outWindow.insertAdjacentHTML('beforeend', textContent);
            textContent = '<div> Количество продаваемого товара: ' + arrayProducts[i].quantity + '\n</div>';
            outWindow.insertAdjacentHTML('beforeend', textContent);
            textContent = '<div> Цена за штуку товара: ' + arrayProducts[i].price + '</div>';
            outWindow.insertAdjacentHTML('beforeend', textContent);

            parrentOutWindow.appendChild(outWindow);
        }



        this.renderBasket();
    }
}
products.init(products.goodsForSale);