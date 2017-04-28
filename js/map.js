'use strict';
(function () {

  window.cards = [];
// Функция для реакции на изменения (фильтры)
  var updateOffers = function () {
    window.sameHousingTypes = window.cards.filter(function (it) {
      return it.offer.type === offerType;
    });
    console.log('По типу жилья ' + window.sameHousingTypes);
    console.log(window.sameHousingTypes);
    window.renderOffers(window.sameHousingTypes);
  };
// Загружаем исходные данные с сервера
  window.load(function (data) {
    window.cards = data;
    window.renderOffers(data);
  });
  // Фильтруем элементы сначала по типу жилья
  var offerType;
  var housingType = document.querySelector('#housing_type');
// Фильтруем по типу жилья
  housingType.addEventListener('change', function (e) {
    housingType = e.currentTarget;
    if (housingType.value !== 'any') {
      offerType = housingType.value;
      updateOffers();
    } else {
      window.renderOffers(window.cards);
    }
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
