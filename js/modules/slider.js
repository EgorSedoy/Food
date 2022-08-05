function slider() {
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

export default slider;