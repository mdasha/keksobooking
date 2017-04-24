'use strict';
(function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var dialogTitle = offerDialog.querySelectorAll('.dialog__title');
  var dialogPanel = offerDialog.querySelectorAll('.dialog__panel');
  window.cards = [];
  var fragment = document.createDocumentFragment();
  var firstMark = document.querySelector('.tokyo__pin-map');
  window.offerElements = [];
  window.offerElements[0] = dialogPanel[0].innerHTML;
  window.load(function (data) {
    window.cards = data;
    for (var i = 0; i < data.length; i++) {
      window.cards[i] = window.renderCard(window.cards[i]);
      var newElement = document.createElement('div');
      newElement.className = 'pin';
      newElement.setAttribute('tabindex', '0');
      newElement.style.left = window.cards[i].location.x + 'px';
      newElement.style.top = window.cards[i].location.y + 'px';
      newElement.innerHTML = '<img src="' + window.cards[i].author.avatar + '" class="rounded" width="40" height="40" >';
      fragment.appendChild(newElement);
      firstMark.appendChild(fragment);
      window.offerElements[i + 1] = window.pin.createOffers(window.cards[i].offer).childNodes[1].innerHTML;
    }
    var pins = document.querySelectorAll('.pin');
    var pinsArray = [];
// Все pin заводим в массив, присваиваем им атрибут data-index и отключаем для всех класс pin-active
    var deactivateClassPinActive = function () {
      for (var k = 0; k < 11; k++) {
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
    for (var l = 0; l < 11; l++) {
      pins[l].addEventListener('click', toolbarButtonHandler);
    }
// Когда аватарка в фокусе при нажатии на enter открывается карточка объявления
    for (i = 0; i < 11; i++) {
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
  });




  
// Перетаскиваем элемент .main-pin
  var pinContainer = document.querySelector('.tokyo__pin-map');
  var draggedElement = pinContainer.querySelector('.pin__main');
  draggedElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
// Запомним координаты точки, с которой начали движение
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
// При каждом движении мыши нам нужно обновлять смещение относительно первоначальной точки, чтобы диалог смещался на необходимую величину
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      draggedElement.style.top = (draggedElement.offsetTop - shift.y) + 'px';
      draggedElement.style.left = (draggedElement.offsetLeft - shift.x) + 'px';
  // Заполняем поле адреса координатами в зависимости от перемещения .main_pin
      var pinLengthHalf = 37.5;
      var pinHeight = 94;
      var NewPinX = parseInt(draggedElement.style.left, 10) + pinLengthHalf;
      var NewPinY = parseInt(draggedElement.style.top, 10) + pinHeight;
      var address = document.querySelector('#address');
      address.value = 'x: ' + NewPinX + 'px, y: ' + NewPinY + 'рх';
    };
// При отпускании кнопки мыши нужно переставать слушать события движения мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
// Добавляем обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
