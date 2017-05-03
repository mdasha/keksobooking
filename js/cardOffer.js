
'use strict';
window.cardOffer = (function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = offerDialog.querySelectorAll('.dialog__panel');
  var dialogTitle = offerDialog.querySelectorAll('.dialog__title');
  return function (data) {
    if (data === '0') {
// Скрываем аватарку и заглушечную карточку при клике на главный пин
      offerDialog.querySelector('.dialog__title').style.display = 'none';
      offerDialog.querySelector('.dialog__panel').style.display = 'none';
    } else {
// Заменяем src у аватарки пользователя — изображения, которое записано в .dialog__title — на значения поля author.avatar отрисовываемого объекта
      offerDialog.querySelector('.dialog__title img').src = window.avatarsArray[data];
// Заменяем текст в карточке на нужный
      dialogPanel[0].style.display = 'block';
      dialogPanel[0].innerHTML = window.offerElementsArray[data];
      dialogTitle[0].style.display = 'block';
    }
  };
})();
