'use strict';
(function () {

  window.cards = [];
// Функция для реакции на изменения (фильтры)
  var updateOffers = function () {
    window.sameHousingTypes = window.cards.filter(function (it) {
      return it.offer.type === offerType;
    });
    window.renderOffers(window.sameHousingTypes);
  };
// Загружаем исходные данные с сервера
  window.load(function (data) {
    window.cards = data;
    window.renderOffers(data);
  });
  // Фильтруем элементы сначала по типу жилья
  var offerType;
  var timeout;
  function debounce(func) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(func, 500);
  }
  var formFilters = document.querySelector('.tokyo__filters');
  formFilters.addEventListener('change', function () {
    debounce(function () {
    var formData = new FormData(formFilters);
    var housingType = formData.get('housing_type');
    var housingPrice = formData.get('housing_price');
    var housingRoomNumber = formData.get('housing_room-number');
    var housingGuestsNumber = formData.get('housing_guests-number');
    var housingFeatures = formData.getAll('feature');
    var filterCards = [];
    filterCards = propertyFilter(window.cards, 'type', housingType);
    filterCards = priceFilter(filterCards, 'price', housingPrice);
    filterCards = propertyFilter(filterCards, 'rooms', housingRoomNumber);
    filterCards = propertyFilter(filterCards, 'guests', housingGuestsNumber);
    filterCards = featuresFilter(filterCards, 'feature', housingFeatures);
    window.renderOffers(filterCards);
    console.log('housingType', filterCards);
  });
  });
  function featuresFilter(cards, property, filterFeatures) {
    var results = [];
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var cardFeatures = card.offer.features;
      var found = 0;
      filterFeatures.map(function (filterFeature) {
        cardFeatures.map(function (cardFeature) {
          if (filterFeature === cardFeature) {
            found++;
          }
        });
      });
      if (found === filterFeatures.length) {
        results.push(card);
      }
    }
    return results;
  }
  function priceFilter(cards, property, value) {
    var results = [];
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
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.offer[property] > min && card.offer[property] < max) {
        results.push(card);
      }
    }
    return results;
  }
  function propertyFilter(cards, property, value) {
    var results = [];
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (value === 'any' || card.offer[property] === value) {
        results.push(card);
      }
    }
    return results;
  }



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
