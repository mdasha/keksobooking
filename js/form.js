'use strict';
(function () {
  var checkInTime = document.querySelector('#time');
  var checkOutTime = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var formSubmit = document.querySelector('.form__submit');
  var title = document.querySelector('#title');
  // Зависимость полей въезда и выезда гостей. Если меняем поле заезда, то автоматически меняется поле выезда
  checkInTime.addEventListener('change', function (e) {
    checkInTime = e.currentTarget;
    var syncValues = function (element, value) {
      element.value = value;
    };
    window.synchronizeFields(checkInTime, checkOutTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  });
  // Зависимость полей въезда и выезда гостей. Если меняем поле выезда, то автоматически меняется поле заезда
  checkOutTime.addEventListener('change', function (e) {
    checkOutTime = e.currentTarget;
    var syncValues = function (element, value) {
      element.value = value;
    };
    window.synchronizeFields(checkOutTime, checkInTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  });
  // Синхронизируем значение поля "Тип жилья" с минимальной ценой
  type.addEventListener('change', function (e) {
    type = e.currentTarget;
    var syncValues = function (element, value) {
      element.min = value;
      element.placeholder = value;
    };
    window.synchronizeFields(type, price, ['flat', 'shack', 'palace'], ['1000', '0', '10000'], syncValues);
  });
  // Связь между количеством комнат и количеством гостей. Если меняем поле с количеством комнат, то автоматически меняется поле количества гостей
  roomNumber.addEventListener('change', function (e) {
    roomNumber = e.currentTarget;
    var syncValues = function (element, value) {
      element.value = value;
    };
    window.synchronizeFields(roomNumber, capacity, ['oneRoom', 'twoRooms', 'manyRooms'], ['noGuests', 'threeGuests', 'threeGuests'], syncValues);
  });
  // Проверяем, правильно ли заполнены поля при отправке формы и сбрасываем значения на исходные после отправки формы
  formSubmit.addEventListener('click', function () {
    price.setAttribute('placeholder', '');
    if (title.value.length < 30 || title.value.length > 100) {
      title.style.border = '3px solid red';
      title.style.name = 'Заголовок должен быть длиной от 30 до 100 символов';
    }
    if (typeof (price) !== 'number' || price > 1000000 || price < 1000) {
      price.style.border = '3px solid red';
    } else {
      price.setAttribute('placeholder', '1000');
      type.selectedIndex = 0;
      roomNumber.selectedIndex = 0;
      checkInTime.selectedIndex = 0;
    }
  });
})();
