'use strict';
(function () {
  var PIN_WIDTH = 75;
  var PIN_WIDTH_HALF = PIN_WIDTH / 2;
  var PIN_HEIGHT = 94;
  var BACK_IMAGE_WIDTH = 1200;
  var BACK_IMAGE_HEIGHT = 700;
  var cardsArray = [];
  var offerDialog = document.querySelector('#offer-dialog');
  offerDialog.querySelector('.dialog__title').style.display = 'none';
  offerDialog.querySelector('.dialog__panel').style.display = 'none';
  var mainPin = document.querySelector('.pin__main');
  mainPin.style.zIndex = '1000';
  // Загружаем исходные данные с сервера
  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', function (data) {
    var address = document.querySelector('#address');
    var mainPininitialY = parseInt(mainPin.offsetTop, 10) + PIN_HEIGHT;
    var mainPinInitialX = parseInt(mainPin.offsetLeft, 10) + PIN_WIDTH_HALF;
    address.value = 'x: ' + mainPinInitialX + 'px, y: ' + mainPininitialY + 'рх';
    cardsArray = data;
    var initialData = [];

    while (initialData.length < 3) {
      var index = Math.floor(Math.random() * data.length);
      if (initialData.indexOf(data[index]) === -1) {
        initialData.push(data[index]);
      }
    }

    window.renderPins(initialData);
  }, function onError(xhr) {
    var header = document.querySelector('header');
    var fragment = document.createDocumentFragment();
    var newElement = document.createElement('div');
    newElement.className = 'error';
    newElement.textContent = 'Произошла ошибка при загрузке данных. Код ошибки:' + xhr.status;
    newElement.style.color = 'white';
    newElement.style.backgroundColor = 'red';
    fragment.appendChild(newElement);
    header.appendChild(fragment);
  });

  var timeout;
  function debounce(func) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(func, 500);
  }

  var filterFeatures = function (cards, property, featuresFilter) {
    return cards.filter(function (card) {
      var cardFeatures = card.offer.features;
      var found = 0;
      featuresFilter.forEach(function (filterFeature) {
        if (cardFeatures.indexOf(filterFeature)) {
          found++;
        }
      });
      return (found === featuresFilter.length);
    });
  };

  var filterPrice = function (cards, property, value) {
    var resultsArray = [];
    var min;
    var max;
    switch (value) {
      case 'low':
        min = 0;
        max = 9999;
        break;
      case 'middle':
        min = 10000;
        max = 49999;
        break;
      case 'high':
        min = 50000;
        max = Infinity;
        break;
    }
    resultsArray = cards.filter(function (card) {
      var cardOffer = card.offer[property];
      return (cardOffer > min && cardOffer < max);
    });

    return resultsArray;
  };

  var filterProperty = function (cards, property, value) {
    var resultsArray = [];
    resultsArray = cards.filter(function (card) {
      var cardProperty = card.offer[property].toString();
      return (value === 'any' || cardProperty === value);
    });
    return resultsArray;
  };

  var formFilters = document.querySelector('.tokyo__filters');
  formFilters.addEventListener('change', function () {
    debounce(function () {
      var formData = new FormData(formFilters);
      var housingType = formData.get('housing_type');
      var housingPrice = formData.get('housing_price');
      var housingRoomNumber = formData.get('housing_room-number');
      var housingGuestsNumber = formData.get('housing_guests-number');
      var housingFeatures = formData.getAll('feature');
      var filterCardsArray = [];
      filterCardsArray = filterProperty(cardsArray, 'type', housingType);
      filterCardsArray = filterPrice(filterCardsArray, 'price', housingPrice);
      filterCardsArray = filterProperty(filterCardsArray, 'rooms', housingRoomNumber);
      filterCardsArray = filterProperty(filterCardsArray, 'guests', housingGuestsNumber);
      filterCardsArray = filterFeatures(filterCardsArray, 'feature', housingFeatures);
      window.renderPins(filterCardsArray);
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

      var xShift = draggedElement.offsetLeft - shift.x;
      var yShift = draggedElement.offsetTop - shift.y;
      if (xShift < (BACK_IMAGE_WIDTH - PIN_WIDTH) && xShift > 0) {
        draggedElement.style.left = xShift + 'px';
      }
      if (yShift < (BACK_IMAGE_HEIGHT - PIN_HEIGHT) && yShift > 0) {
        draggedElement.style.top = yShift + 'px';
      }
      // Заполняем поле адреса координатами в зависимости от перемещения .main_pin
      var newPinX = parseInt(draggedElement.style.left, 10) + PIN_WIDTH_HALF;
      var newPinY = parseInt(draggedElement.style.top, 10) + PIN_HEIGHT;
      var address = document.querySelector('#address');
      address.value = 'x: ' + newPinX + 'px, y: ' + newPinY + 'рх';
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
