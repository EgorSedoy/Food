"use strict";
window.addEventListener("DOMContentLoaded", () => {
    /* 
    ! Tabs
    */
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    /* 
    ! Timer  
    */
    const deadline = '2022-08-03';

    function getTimeRamaining(endtime) {//получаем оставшееся время
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());//получаем время до конца события

        if (t <= 0) {//если время закончилось
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {//если время ещё есть
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //получаем количество дней
                hours = Math.floor((t / (1000 * 60 * 60) % 24)), //получаем количество часов
                minutes = Math.floor((t / 1000 / 60) % 60), //получаем количество минут
                seconds = Math.floor((t / 1000) % 60); //получаем количество секунд
        }

        return {//возвращаем объект с оставшимися днями, часами, минутами и секундами
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { //если число меньше 10, добавляем ноль
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {//получаем объект с оставшимися днями, часами, минутами и секундами
        const timer = document.querySelector(selector),//получаем элемент для отображения оставшегося времени
            days = timer.querySelector('#days'),//получаем элемент для дней
            hours = timer.querySelector('#hours'),//получаем элемент для часов
            minutes = timer.querySelector('#minutes'),//получаем элемент для минут
            seconds = timer.querySelector('#seconds'),//получаем элемент для секунд
            timeInterval = setInterval(updateClock, 1000);//запускаем функцию каждую секунду

        updateClock();//запускаем одноразово функцию чтобы убрать секундную задержку

        function updateClock() {//обновляем оставшееся время
            const t = getTimeRamaining(endtime);//получаем объект с временем
            days.innerHTML = getZero(t.days);//получаем количество дней
            hours.innerHTML = getZero(t.hours);//получаем количество часов
            minutes.innerHTML = getZero(t.minutes);//получаем количество минут
            seconds.innerHTML = getZero(t.seconds);//получаем количество секунд

            if (t.total <= 0) {//если время закончилось
                clearInterval(timeInterval);//останавливаем функцию
            }
        }
    }

    setClock('.timer', deadline);

    /*
        !Показ модального окна
    */

    const modalTrigger = document.querySelectorAll('[data-modal]'),//получаем элемент модального окна
        modal = document.querySelector('.modal');//получаем элемент модального окна

    function openModal() {
        modal.classList.add('show');//добавляем класс для отображения модального окна
        modal.classList.remove('hide');//удаляем класс для отображения модального окна
        document.body.style.overflow = 'hidden';//запрещаем прокрутку страницы
        clearInterval(modalTimerId);//останавливаем таймер если пользователь сам открыл модальное окно
    }

    function closeModal() {
        modal.classList.remove('show');//добавляем класс для отображения модального окна
        modal.classList.add('hide');//удаляем класс для отображения модального окна
        document.body.style.overflow = '';//разрешаем прокрутку страницы
    }

    modalTrigger.forEach(item => {//привязываем обработчик клика ко всем элементам модального окна
        item.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (e) => {//привязываем обработчик клика ко всем элементам модального окна
        if (e.target === modal || e.target.getAttribute('data-close') == '') {//если клик произошел не внутри элемента модального окна
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {//привязываем обработчик клика ко всем элементам модального окна
        if (e.code === 'Escape' && modal.classList.contains('show')) {//если произошло нажатие на клавишу Esc
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);//запускаем функцию через 15 секунд

    // function showModalByScroll() {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    //         //если пользователь долистал до самого низа (сработает на 1 пиксель меньше до конца страницы)
    //         openModal();
    //         window.removeEventListener('scroll', showModalByScroll);
    //         clearInterval(modalTimerId);//если дошёл до конца страницы то останавливаем таймер
    //     }
    // }

    // window.addEventListener('scroll', showModalByScroll);

    /*
    ! Используем классы для карточек
    */

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 30;
            this.changeToUAH();
        }

        changeToUAH() {//метод для перевода цены в гривны
            this.price = this.price * this.transfer;
        }

        render() {//метод для отрисовки карточки
            const element = document.createElement('div');
            if (this.classes.length === 0) {//если не передано ни одного класса
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {//если передан хоть 1 класс
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
            this.parent.append(element);
        }
    }

    // const div = new MenuCard();//запускаем класс
    // div.render();//отрисовываем карточку

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        `.menu .container`
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню "Премиум"',
        'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        `.menu .container`
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        `.menu .container`
    ).render();

    /*
    ! Создаём обработчик форм
    */

    const forms = document.querySelectorAll('form');//получаем все формы

    const message = {//объект для сообщений
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(form => {//перебираем все формы
        postData(form);//вызываем функцию для обработки формы
    });

    function postData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();//отменяем перезагрузку страницы

            const statusMessage = document.createElement('img');//создаём элемент для вывода сообщения
            statusMessage.src = message.loading;//присваиваем ему значение из объекта
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;//добавляем стили
            form.insertAdjacentHTML('afterend', statusMessage);//добавляем элемент в форму


            const formData = new FormData(form);//получаем данные формы

            const obj = {};//объект для передачи данных
            formData.forEach(function (value, key) {//перебираем данные формы
                obj[key] = value;//записываем данные в объект
            });

            fetch('server.php', {//получаем данные с сервера
                method: 'POST',//передаём метод запроса
                headers: {//передаём заголовки запроса
                    'Content-Type': 'application/json'//передаём заголовок запроса
                },
                body: JSON.stringify(obj)
            })
                .then(data => data.text())//получаем данные от сервера
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);//выводим сообщение об успехе
                    statusMessage.remove();//удаляем элемент
                }).catch(() => {
                    showThanksModal(message.failure);//выводим сообщение об ошибке
                }).finally(() => {
                    form.reset();//очищаем форму
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>    
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

}); //DOMContentLoaded