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

module.exports = calc;