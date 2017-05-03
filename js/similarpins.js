// Отрисовка элементов на карте
'use strict';
window.renderOffers = (function () {
  var firstMark = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var dialogTitle = offerDialog.querySelectorAll('.dialog__title');
  var dialogPanel = offerDialog.querySelectorAll('.dialog__panel');
  var pinMain = document.querySelector('.pin__main');
  var ENTER_BUTTON = 13;
  var ESC_BUTTON = 27;
  window.pinsArray = [];
  window.offerElementsArray = [];
  window.avatarsArray = [];

  var onPinClick = function (e) {
// Создаем массив элементов с классом pin и убираем со всех элементов класс .pin-active. При создании массива создаем специальный атрибут data-index
    deactivateClassPinActive();
// Добавляем класс .pin-active выделенному элементу
    var pins = e.currentTarget;
    pins.classList.add('pin--active');
// Получаем значение атрибута data-index текущего элемента и вызываем функцию, которая меняет данные об объекте и его фотку
    var dataIndexPin = pins.getAttribute('data-index');
// Подключаем отдельным модулем (cardOffer.js) вызов функции, которая показывает карточку выбранного жилья по нажатию на метку на карте
    window.cardOffer(dataIndexPin);
// При открытом диалоге клавиша esc закрывает его и деактивирует элемент с классом .pin
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_BUTTON) {
        deleteOfferCard();
      }
    });
  };
// Все pin заводим в массив, присваиваем им атрибут data-index и отключаем для всех класс pin-active
  var deactivateClassPinActive = function () {
    var pins = document.querySelectorAll('.pin');
    pins.forEach(function (pin) {
      pin.classList.remove('pin--active');
    });
  };
// Удаление карточки элемента
  var deleteOfferCard = function () {
    dialogPanel = offerDialog.querySelectorAll('.dialog__panel');
    dialogPanel[0].style.display = 'none';
    dialogTitle[0].style.display = 'none';
    deactivateClassPinActive();
  };

// При нажатии на элемент .dialog-close скрываем карточку объявления
  dialogClose.addEventListener('click', function () {
    deleteOfferCard();
  });
// При открытом диалоге и фокусе на крестике нажатие клавиши ENTER приводит к закрытию диалога и деактивации активного элемента .pin
  dialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_BUTTON) {
      deleteOfferCard();
    }
  });

  return function (data) {
    window.pinsArray = [];
    var pinsFragment = document.createDocumentFragment();
    pinsFragment.appendChild(pinMain);
    data.forEach(function (dataItem, i) {
      var pinElement = document.createElement('div');
      pinElement.className = 'pin';
      pinElement.setAttribute('data-index', i + 1);
      pinElement.setAttribute('tabindex', '0');
      pinElement.style.left = dataItem.location.x - 29 + 'px';
      pinElement.style.top = dataItem.location.y - 75 + 'px';
      pinElement.innerHTML = '<img src="' + dataItem.author.avatar + '" class="rounded" width="40" height="40" >';
      pinElement.addEventListener('click', onPinClick);
      pinElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_BUTTON) {
          onPinClick(evt);
        }
      });
      pinsFragment.appendChild(pinElement);
      window.offerElementsArray[i + 1] = window.pin(dataItem.offer).childNodes[1].innerHTML;
      window.avatarsArray[i + 1] = dataItem.author.avatar;
    });
    firstMark.innerHTML = '';
    firstMark.appendChild(pinsFragment);
  };
})();
