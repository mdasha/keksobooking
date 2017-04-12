'use strict';
var offerDialog = document.querySelectorAll('#offer-dialog');
var dialogClose = offerDialog[0].querySelector('.dialog__close');
var dialogTitle = offerDialog[0].querySelectorAll('.dialog__title');
var dialogPanel = offerDialog[0].querySelectorAll('.dialog__panel');
// Все pin заводим в массив, присваиваем им атрибут data-index и отключаем для всех класс pin-active
var deactivateClassPinActive = function () {
  for (var k = 0; k < 9; k++) {
    pinsArray.push(pins[k]);
    pinsArray[k].setAttribute('data-index', k);
    pinsArray[k].classList.remove('pin--active');
  }
};
// Замена карточки элемента
var replaceOfferCard = function () {
  dialogPanel = offerDialog[0].querySelectorAll('.dialog__panel');
  if (dialogPanel[1]) {
    offerDialog[0].removeChild(dialogPanel[0]);
  }
};
// Удаление карточки элемента
var deleteOfferCard = function () {
  dialogPanel = offerDialog[0].querySelectorAll('.dialog__panel');
  offerDialog[0].removeChild(dialogPanel[0]);
  dialogTitle[0].style.display = 'none';
  deactivateClassPinActive();
};
var newElement = {};
var openUserDialog = function (data) {
  var fragment = document.createDocumentFragment();
  dialogTitle[0].style.display = 'block';
// Заменяем src у аватарки пользователя — изображения, которое записано в .dialog__title — на значения поля author.avatar отрисовываемого объекта
  offerDialog[0].querySelector('.dialog__title img').src = window.card.createCards[data].author.avatar;
// Добавляем вновь созданный элемент dialog__panel
  newElement = window.pin.createOffers[data];
  fragment.appendChild(newElement);
  offerDialog[0].appendChild(fragment);
    // Удаляем для замены заполненный элемент dialog__panel
  replaceOfferCard();
};
var pins = document.querySelectorAll('.pin');
var pinsArray = [];

var toolbarButtonHandler = function (e) {
// Создаем массив элементов с классом pin и убираем со всех элементов класс .pin-active. При создании массива создаем специальный атрибут data-index
  deactivateClassPinActive();
// Добавляем класс .pin-active выделенному элементу
  pins = e.currentTarget;
  pins.classList.add('pin--active');
 // Получаем значение атрибута data-index текущего элемента и вызываем функцию, которая меняет данные об объекте и его фотку
  var dataIndexPin = pins.getAttribute('data-index') - 1;
  openUserDialog(dataIndexPin);
 // При открытом диалоге клавиша esc закрывает его и деактивирует элемент с классом .pin
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      deleteOfferCard();
    }
  });
};
var i = 0;
// При нажатии на аватарку срабатывает функция
for (var l = 0; l < 9; l++) {
  pins[l].addEventListener('click', toolbarButtonHandler);
}
// Когда аватарка в фокусе при нажатии на enter открывается карточка объявления
for (i = 0; i < 9; i++) {
  pins[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      toolbarButtonHandler(evt);
    }
  });
}
// При нажатии на элемент .dialog-close скрываем карточку объявления
dialogClose.addEventListener('click', function () {
  deleteOfferCard();
});
// При открытом диалоге и фокусе на крестике нажатие клавиши ENTER приводит к закрытию диалога и деактивации активного элемента .pin
dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    deleteOfferCard();
  }
});
