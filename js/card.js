'use strict';
window.card = (function () {
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
          title: window.appData.offerTitles[i],
          address: window.appData.offerAddressess[i],
          price: rand(1000, 1000000),
          type: window.appData.offerTypes[rand(0, 2)],
          rooms: rand(1, 5),
          guests: rand(1, 10),
          checkin: window.appData.offerChecks[rand(0, 2)],
          checkout: window.appData.offerChecks[rand(0, 2)],
          features: window.appData.offerFeatures.split(', ', rand(1, 6)),
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

