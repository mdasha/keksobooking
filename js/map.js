'use strict';
(function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var dialogTitle = offerDialog.querySelectorAll('.dialog__title');
  var dialogPanel = offerDialog.querySelectorAll('.dialog__panel');
  window.render = [];
  window.offerElements = [];
  window.offerElements[0] = dialogPanel[0].innerHTML;
  window.load(function (data) {
    window.cards = [];
    window.cards = data;
// Подключаем модуль отрисковки pin-ов на карте
    var pins = window.renderOffers(window.sameHousingTypes);
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
    var i = 0;
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
// Фильтруем элементы сначала по типу жилья
  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuests = document.querySelector('#housing_guests-number');
  var housingFeatures = Array.from(document.getElementsByName('feature'));
  var offerType;
  var offerPrice = {};
  var offerRoomNumber;
  var offerGuests;
  var offerFeatures = [];
  var updateOffers = function () {
    window.sameHousingTypes = window.cards;
    if (housingType.value !== 'any') {
      window.sameHousingTypes = window.cards.filter(function (it) {
        return it.offer.type === offerType;
      }); } else {
      window.sameHousingTypes = window.cards;
    }
    var checkNumericRange = function (value) {
      if (typeof value !== 'number') {
        return false;
      } else {
        return value > offerPrice.min && value < offerPrice.max;
      }
    };
    window.samePrice = window.cards.filter(function (it) {
      return checkNumericRange(it.offer.price);
    });

    window.filteredData = window.sameHousingTypes.concat(window.samePrice).concat(window.sameRoomNumbers);
    window.filteredData2 = window.filteredData.filter(function (it, i) {
      return window.filteredData.indexOf(it) !== i;
    });

    if (housingRoomNumber.value !== 'any') {
      window.sameRoomNumbers = window.cards.filter(function (it) {
        return it.offer.rooms === offerRoomNumber;
      }); } else {
      window.sameRoomNumbers = window.cards;
    }
    if (housingGuests.value !== 'any') {
      window.sameGuests = window.cards.filter(function (it) {
        return it.offer.guests === offerGuests;
      }); } else {
      window.sameGuests = window.cards;
    }
    window.sameFeatures = [];
    for (i = 0; i < 6; i++) {
      window.sameFeatures[i] = window.cards.filter(function (it) {
        var k = 0;
        if (it.offer.features.length > 0) {
          for (var j = 0; j < it.offer.features.length; j++) {
            if (it.offer.features[j] === offerFeatures[i]) {
              k = j;
            }
          }
        }
        return it.offer.features[k] === offerFeatures[i];
      });
    }
    console.log('По типу жилья ' + offerType);
    console.log(window.sameHousingTypes);
    console.log('По минимальной цене ' + offerPrice.min);
    console.log(window.samePrice);
    console.log('По числу комнат ' + offerRoomNumber);
    console.log(window.sameRoomNumbers);
    console.log('По числу гостей ' + offerGuests);
    console.log(window.sameGuests);
    console.log('По удобствам ' + offerFeatures);
    console.log(window.sameFeatures);
    console.log('Конкатенация');
    console.log(window.filteredData);

    window.renderOffers(window.sameHousingTypes);
  };

// Фильтруем по типу жилья
  housingType.addEventListener('change', function (e) {
    housingType = e.currentTarget;
    offerType = housingType.value;
    updateOffers();
  });
// Фильтруем по количеству комнат
  housingRoomNumber.addEventListener('change', function (e) {
    housingRoomNumber = e.currentTarget;
    offerRoomNumber = parseInt(housingRoomNumber.value, 10);
    updateOffers();
  });
// Фильтруем по количеству гостей
  housingGuests.addEventListener('change', function (e) {
    housingGuests = e.currentTarget;
    offerGuests = parseInt(housingGuests.value, 10);
    updateOffers();
  });
// Фильтруем по удобствам
  var j = 0;
  for (var i = 0; i < housingFeatures.length; i++) {
    housingFeatures[i].addEventListener('click', function (e) {
      housingFeatures[i] = e.currentTarget;
      if (housingFeatures[i].checked) {
        offerFeatures[housingFeatures.indexOf(housingFeatures[i])] = housingFeatures[i].value;
      }
      j = j + 1;
      updateOffers();
    });
  }

// Фильтруем по цене предложения
  housingPrice.addEventListener('change', function (e) {
    housingPrice = e.currentTarget;
    switch (housingPrice.value) {
      case 'low':
        offerPrice = {
          min: 0,
          max: 9999
        };
        break;
      case 'middle':
        offerPrice = {
          min: 10000,
          max: 49999
        };
        break;
      case 'high':
        offerPrice = {
          min: 50000,
          max: Infinity
        };
        break;
      default:
        offerPrice = {
          min: 0,
          max: Infinity
        };
        break;
    }
    updateOffers();
  });
})();
