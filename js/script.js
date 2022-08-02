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

    const getResource = async (url) => {//метод для получения данных с сервера
        const res = await fetch(url);//получаем данные с сервера

        if (!res.ok) {//если произошла ошибка
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);//throw выбрасывает ошибку
        }



        return await res.json();//преобразуем данные в формат JSON
    };

    // getResource('http://localhost:3000/menu')//получаем данные с сервера
    //     .then(data => {
    //         data.forEach(({ img, altimg, title, descr, price }) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')//получаем данные с сервера
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    //альтернатива предыдущей функции

    // getResource('http://localhost:3000/menu')//получаем данные с сервера
    //     .then(data => createCard(data));//передаем данные в функцию для создания карточек{

    // function createCard() {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //                 <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                 </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });

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
        bindPostData(form);//вызываем функцию для обработки формы
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {//передаём заголовки запроса
                'Content-Type': 'application/json'//передаём заголовок запроса
            },
            body: data //передаём данные запроса
        });
        return await res.json();//получаем ответ от сервера
    };

    function bindPostData(form) {
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

            const json = JSON.stringify(Object.fromEntries(formData.entries()));//преобразуем данные в json

            postData('http://localhost:3000/requests', json)//передаём данные на сервер
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

    //Slider

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;//получаем ширину обертки

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';//устанавливаем ширину обертки
    slidesField.style.display = 'flex';//устанавливаем стиль обертки
    slidesField.style.transition = 'all 0.7s';//устанавливаем анимацию

    slidesWrapper.style.overflow = 'hidden';//устанавливаем стиль обертки

    slides.forEach(slide => {//перебираем все слайды
        slide.style.width = width;//устанавливаем ширину слайда
    });

    slider.style.position = 'relative';//устанавливаем стиль слайдера

    const indicators = document.createElement('ol'),//создаём элемент для индикаторов
        dots = [];//массив для индикаторов
    indicators.classList.add('carousel__indicators');//добавляем класс для индикаторов
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;//добавляем стили
    slider.append(indicators);//добавляем элемент в слайдер

    for (let i = 0; i < slides.length; i++) {//перебираем все слайды
        const dot = document.createElement('li');//создаём элемент для индикатора
        dot.setAttribute('data-slide-to', i + 1);//устанавливаем атрибут для индикатора
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;//добавляем стили

        if (i == 0) {//если это первый слайд
            dot.style.opacity = 1;//устанавливаем прозрачность
        }
        indicators.append(dot);//добавляем элемент в индикаторы
        dots.push(dot);//добавляем элемент в массив
    }

    next.addEventListener('click', () => {//обрабатываем клик по кнопке "следующий"
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;//перемещаем обертку влево

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {//обрабатываем клик по кнопке "следующий"
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;//перемещаем обертку влево

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {//перебираем все индикаторы
        dot.addEventListener('click', (event) => {//обрабатываем клик по индикатору
            const slideTo = event.target.getAttribute('data-slide-to');//получаем номер слайда

            slideIndex = slideTo;//устанавливаем номер слайда
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);//устанавливаем смещение

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
}); //DOMContentLoaded