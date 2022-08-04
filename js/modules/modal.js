function modal() {
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
}

module.exports = modal;