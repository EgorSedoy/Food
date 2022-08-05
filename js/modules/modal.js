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

export default modal;
export { openModal, closeModal };