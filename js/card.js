'use strict';
window.card = (function () {
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Уютное бунгало недалеко от моря', 'Неуютное бунгало по колено в воде', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик'];
  var OFFER_ADDRESSES = ['117285, Россия, Москва, ул. Тимура Фрунзе, 15-285', '115407, Россия, Москва, Нагатинская набережная, 32-185', '132158, Россия, Москва, ул. Братиславская, 17-85', '147528, Россия, Москва, ул. Лубянка, 1-1', '198523, Россия, Москва, Черноморский бульвар, 14-528', '165982, Россия, Москва, ул. Бакинских Комиссаров, 10-142', '165985, Россия, Москва, ул. Нижняя Красносельская, 42-152', '165986, Россия, Москва, ул. Бауманская, 42-58'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_CHECKS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = 'wifi, dishwasher, parking, washer, elevator, conditioner';
  // Функция генерации случайных данных - целых чисел в заданном диапазоне от min до max
  function rand(min, max) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
// Создаем одно предложение
  function createSimilarNotesNearby(i) {
    var similarNoteNearby =
      {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        location: {
          x: rand(300, 900),
          y: rand(100, 500)
        },
        offer: {
          title: OFFER_TITLES[i],
          address: OFFER_ADDRESSES[i],
          price: rand(1000, 1000000),
          type: OFFER_TYPES[rand(0, 2)],
          rooms: rand(1, 5),
          guests: rand(1, 10),
          checkin: OFFER_CHECKS[rand(0, 2)],
          checkout: OFFER_CHECKS[rand(0, 2)],
          features: OFFER_FEATURES.split(', ', rand(1, 6)),
          description: '',
          photos: ''
        }
      };
    return similarNoteNearby;
  }
  function createCards() {
    // Создаем пустой массив предложений
    var similarNotesNearby = [];
    // Заполняем массив данными 8 сгенерированных JS-объектов
    for (var i = 0; i < 8; i++) {
      similarNotesNearby.splice(i, 1, createSimilarNotesNearby(i));
    }
    return similarNotesNearby;
  }

  return {
    'createCards': createCards()
  };
})();

