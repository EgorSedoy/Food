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

export default timer;