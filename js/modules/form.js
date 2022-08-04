function form() {
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
}

module.exports = form;