function cards() {
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

   getResource('http://localhost:3000/menu')//получаем данные с сервера
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
}

module.exports = cards;