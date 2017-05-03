'use strict';
(function () {
  var checkInTime = document.querySelector('#time');
  var checkOutTime = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var form = document.querySelector('.notice__form');
  var syncValues = function (element, value) {
    element.value = value;
  };
// Зависимость полей въезда и выезда гостей. Если меняем поле заезда, то автоматически меняется поле выезда
  checkInTime.addEventListener('change', function (evt) {
    checkInTime = evt.currentTarget;

    window.synchronizeFields(checkInTime, checkOutTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  });
// Зависимость полей въезда и выезда гостей. Если меняем поле выезда, то автоматически меняется поле заезда
  checkOutTime.addEventListener('change', function (evt) {
    checkOutTime = evt.currentTarget;
    window.synchronizeFields(checkOutTime, checkInTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  });
// Синхронизируем значение поля "Тип жилья" с минимальной ценой
  type.addEventListener('change', function (evt) {
    type = evt.currentTarget;
    window.synchronizeFields(type, price, ['flat', 'shack', 'palace'], ['1000', '0', '10000'], function (element, value) {
      element.min = value;
      element.placeholder = value;
    });
  });
// Связь между количеством комнат и количеством гостей. Если меняем поле с количеством комнат, то автоматически меняется поле количества гостей
  roomNumber.addEventListener('change', function (evt) {
    roomNumber = evt.currentTarget;
    window.synchronizeFields(roomNumber, capacity, ['oneRoom', 'twoRooms', 'manyRooms'], ['noGuests', 'threeGuests', 'threeGuests'], syncValues);
  });

  form.addEventListener('submit', function () {
    form.reset();
  });

  var toggleValidation = function (evt) {
    if (evt.target.validity.valid) {
      evt.target.classList.remove('attention');
    } else {
      evt.target.classList.add('attention');
    }
  };
  document.getElementById('title').addEventListener('change', toggleValidation);
  document.getElementById('price').addEventListener('change', toggleValidation);
})();
