'use strict';
window.showCard = (function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = offerDialog.querySelectorAll('.dialog__panel');
  var dialogTitle = offerDialog.querySelectorAll('.dialog__title');
  var openUserDialog = function (data) {
// Заменяем текст в карточке на нужный
    dialogPanel[0].style.display = 'block';
    dialogPanel[0].innerHTML = window.pin.createOffers[data];
    dialogTitle[0].style.display = 'block';
// Заменяем src у аватарки пользователя — изображения, которое записано в .dialog__title — на значения поля author.avatar отрисовываемого объекта
    if (data === '0') {
      offerDialog.querySelector('.dialog__title img').src = 'img/main-pin-image.png';
    } else {
      offerDialog.querySelector('.dialog__title img').src = window.card.createCards[(data - 1)].author.avatar;
    }
  };
  return {
    openUserDialog: openUserDialog
  };
})();
