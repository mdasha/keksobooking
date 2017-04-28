// Отрисовка элементов на карте
'use strict';
(function () {
  var firstMark = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var dialogTitle = offerDialog.querySelectorAll('.dialog__title');
  var dialogPanel = offerDialog.querySelectorAll('.dialog__panel');
  window.render = [];
  window.offerElements = [];
  window.offerElements[0] = dialogPanel[0].innerHTML;
  window.renderOffers = function (data) {
    var newElement = [];
    for (var i = 0; i < data.length; i++) {

      window.render[i] = document.createDocumentFragment();
      data[i] = window.renderCard(data[i]);
      newElement[i] = document.createElement('div');
      newElement[i].className = 'pin';
      newElement[i].setAttribute('tabindex', '0');
      newElement[i].style.left = data[i].location.x - 29 + 'px';
      newElement[i].style.top = data[i].location.y - 75 + 'px';
      newElement[i].innerHTML = '<img src="' + data[i].author.avatar + '" class="rounded" width="40" height="40" >';
      window.render[i] = window.render[i].appendChild(newElement[i]);
      firstMark.appendChild(window.render[i]);
      window.offerElements[i + 1] = window.pin.createOffers(data[i].offer).childNodes[1].innerHTML;
    }
    var pins = document.querySelectorAll('.pin');
    console.log(pins);
    // Подключаем модуль отрисковки pin-ов на карте
    var pinsArray = [];
// Считаем количество отрисовываемых pin-ов с учетом главного pin-main
    var pinLength = data.length + 1;
// Все pin заводим в массив, присваиваем им атрибут data-index и отключаем для всех класс pin-active
    var deactivateClassPinActive = function () {
      for (var k = 0; k < pinLength; k++) {
        pinsArray.push(pins[k]);
        pinsArray[k].setAttribute('data-index', k);
        pinsArray[k].classList.remove('pin--active');
      }
    };
// Удаление карточки элемента
    var deleteOfferCard = function () {
      dialogPanel = offerDialog.querySelectorAll('.dialog__panel');
      dialogPanel[0].style.display = 'none';
      dialogTitle[0].style.display = 'none';
      deactivateClassPinActive();
    };
    var toolbarButtonHandler = function (e) {
// Создаем массив элементов с классом pin и убираем со всех элементов класс .pin-active. При создании массива создаем специальный атрибут data-index
      deactivateClassPinActive();
// Добавляем класс .pin-active выделенному элементу
      pins = e.currentTarget;
      pins.classList.add('pin--active');
 // Получаем значение атрибута data-index текущего элемента и вызываем функцию, которая меняет данные об объекте и его фотку
      var dataIndexPin = pins.getAttribute('data-index');
// Подключаем отдельным модулем (show-card.js) вызов функции, которая показывает карточку выбранного жилья по нажатию на метку на карте
      window.showCard.openUserDialog(dataIndexPin);
 // При открытом диалоге клавиша esc закрывает его и деактивирует элемент с классом .pin
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          deleteOfferCard();
        }
      });
    };
    i = 0;
// При нажатии на аватарку срабатывает функция
    for (var l = 0; l < pinLength; l++) {
      pins[l].addEventListener('click', toolbarButtonHandler);
    }
// Когда аватарка в фокусе при нажатии на enter открывается карточка объявления
    for (i = 0; i < pinLength; i++) {
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
  };
})();
