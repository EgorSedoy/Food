/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
   //Calculator    

   const result = document.querySelector('.calculating__result span'); //получаем элемент для результата

   let sex, height, weight, age, ratio;

   if (localStorage.getItem('sex')) {//если есть значение в локальном хранилище
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if (localStorage.getItem('ratio')) {//если есть значение в локальном хранилище
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 'female';
      localStorage.setItem('ratio', 1.375);
   }

   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.classList.remove(activeClass);
         if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
         }
         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
         }
      });
   }

   initLocalSettings("#gender div", "calculating__choose-item_active");
   initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");


   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = "0";
         return;
      }

      if (sex === "female") {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }

   calcTotal();

   function getStaticData(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(element => {
         element.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio');
               localStorage.setItem('ratio', ratio);
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', sex);
            }

            elements.forEach(elem => {
               elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();
         });
      });
   }

   getStaticData("#gender div", "calculating__choose-item_active");
   getStaticData(".calculating__choose_big div", "calculating__choose-item_active");

   function getDynamicData(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {

         if (input.value.match(/\D/g)) {
            input.style.border = "1px solid red";
         } else {
            input.style.border = "1px solid #54ed39";
         }

         switch (input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;
            case 'weight':
               weight = +input.value;
               break;
            case 'age':
               age = +input.value;
               break;
         }

         calcTotal();
      });
   }

   getDynamicData('#height');
   getDynamicData('#weight');
   getDynamicData('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");


function cards() {
   // Используем классы для создание карточек меню

   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 27;
         this.changeToUAH();
      }

      changeToUAH() {
         this.price = this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');

         if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
         } else {
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

   (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
      .then(data => {
         data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
         });
      });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, modalTimerId) {
   /*
    ! Создаём обработчик форм
    */

   const forms = document.querySelectorAll(formSelector);//получаем все формы

   const message = {//объект для сообщений
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся!',
      failure: 'Что-то пошло не так...'
   };

   forms.forEach(form => {//перебираем все формы
      bindPostData(form);//вызываем функцию для обработки формы
   });

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

         (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)//передаём данные на сервер
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
      }, 4000);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);//получаем элемент модального окна
   modal.classList.add('show');//добавляем класс для отображения модального окна
   modal.classList.remove('hide');//удаляем класс для отображения модального окна
   document.body.style.overflow = 'hidden';//запрещаем прокрутку страницы
   if (modalTimerId) { //если передан параметр таймера
      clearInterval(modalTimerId);//останавливаем таймер если пользователь сам открыл модальное окно
   }

}

function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);//получаем элемент модального окна
   modal.classList.remove('show');//добавляем класс для отображения модального окна
   modal.classList.add('hide');//удаляем класс для отображения модального окна
   document.body.style.overflow = '';//разрешаем прокрутку страницы
}

function modal(triggerSelector, modalSelector, modalTimerId) {

   const modalTrigger = document.querySelectorAll(triggerSelector),//получаем элемент модального окна
      modal = document.querySelector(modalSelector);//получаем элемент модального окна

   modalTrigger.forEach(item => {//привязываем обработчик клика ко всем элементам модального окна
      item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
   });

   modal.addEventListener('click', (e) => {//привязываем обработчик клика ко всем элементам модального окна
      if (e.target === modal || e.target.getAttribute('data-close') == '') {//если клик произошел не внутри элемента модального окна
         closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {//привязываем обработчик клика ко всем элементам модального окна
      if (e.code === 'Escape' && modal.classList.contains('show')) {//если произошло нажатие на клавишу Esc
         closeModal(modalSelector);
      }
   });

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
         //если пользователь долистал до самого низа (сработает на 1 пиксель меньше до конца страницы)
         openModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
         clearInterval(modalTimerId);//если дошёл до конца страницы то останавливаем таймер
      }
   }

   window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
   //Slider

   let slideIndex = 1;
   let offset = 0;

   const slides = document.querySelectorAll(slide),
      slider = document.querySelector(container),
      next = document.querySelector(nextArrow),
      prev = document.querySelector(prevArrow),
      total = document.querySelector(totalCounter),
      current = document.querySelector(currentCounter),
      slidesWrapper = document.querySelector(wrapper),
      slidesField = document.querySelector(field),
      width = window.getComputedStyle(slidesWrapper).width;//получаем ширину обертки

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

   function deleteNotDigits(str) {//удаляем все не цифры из строки
      return +str.replace(/\D/g, '');
   }

   next.addEventListener('click', () => {//обрабатываем клик по кнопке "следующий"
      if (offset == deleteNotDigits(width) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += deleteNotDigits(width);
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
         offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
         offset -= deleteNotDigits(width);
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
         offset = deleteNotDigits(width) * (slideTo - 1);//устанавливаем смещение

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   /* 
    !Tabs
    */
   const tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add("hide");
         item.classList.remove("show", "fade");
      });

      tabs.forEach(item => {
         item.classList.remove(activeClass);
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add("show", "fade");
      tabsContent[i].classList.remove("hide");
      tabs[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener("click", (event) => {
      const target = event.target;

      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

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

   setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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


async function getResource(url) {
   let res = await fetch(url);

   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   }

   return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");









window.addEventListener('DOMContentLoaded', function () {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 10000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-09-01');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_6__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map