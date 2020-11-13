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

var basketPurcase = {
    totalPrice: null,
    userBye: [
        {
            id: 1,
            namePurcase: 'Рубашка',
            quantity: 2,
            price: 1500,
        },

        {
            id: 2,
            namePurcase: 'Брюки',
            quantity: 2,
            price: 1000,
        }
    ],
    countTotalPrice() {
        for (let i = 0; i < this.userBye.length; i++) {
            this.totalPrice += this.userBye[i].quantity * this.userBye[i].price;
        }
        return this.totalPrice;
    },
    outputBasketpurCase() {

        for (let i = 0; i < this.userBye.length; i++) {
            let outWindow = document.createElement('div');
            let textContent = '<div> Название купленного товара: ' + this.userBye[i].namePurcase + '\n</div>';
            //document.querySelector('body').insertAdjacentHTML('afterend', textContent);
            //outWindow.innerHTML = outWindow.innerHTML + '<div>Название купленного товара:' + this.userBye[i].namePurcase + '\n</div>';
            outWindow.insertAdjacentHTML('beforeend', textContent);
            textContent = '<div> Количество купленного товара: ' + this.userBye[i].quantity + '\n</div>';
            outWindow.insertAdjacentHTML('beforeend', textContent);
            textContent = '<div> Цена за штуку товара: ' + this.userBye[i].price + '\n</div>';
            outWindow.insertAdjacentHTML('beforeend', textContent);
            outWindow.className = 'cardProduct' + i;
            outWindow.style.border = '1px solid black';
            document.body.appendChild(outWindow);
        }
        let outWindow = document.createElement('div');
        textContent = '<div> Общастоимость покупок: ' + outputBasketpurCase() + '\n</div>';
        outWindow.insertAdjacentHTML('beforeend', textContent);
        outWindow.className = 'cashProduct';
        outWindow.style.border = '1px solid black';
        document.body.appendChild(outWindow);

        //document.body.append(outWindow);
    }
}
basketPurcase.outputBasketpurCase();