'use strict';
// Функция генерации случайных данных - целых чисел в заданном диапазоне от min до max
function rand(min, max) {
  min = parseInt(min, 10);
  max = parseInt(max, 10);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Уютное бунгало недалеко от моря', 'Неуютное бунгало по колено в воде', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик'];
var OFFER_ADDRESSES = ['117285, Россия, Москва, ул. Тимура Фрунзе, 15-285', '115407, Россия, Москва, Нагатинская набережная, 32-185', '132158, Россия, Москва, ул. Братиславская, 17-85', '147528, Россия, Москва, ул. Лубянка, 1-1', '198523, Россия, Москва, Черноморский бульвар, 14-528', '165982, Россия, Москва, ул. Бакинских Комиссаров, 10-142', '165985, Россия, Москва, ул. Нижняя Красносельская, 42-152', '165986, Россия, Москва, ул. Бауманская, 42-58'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECKS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = 'wifi, dishwasher, parking, washer, elevator, conditioner';
var firstMark = document.querySelector('.tokyo__pin-map');
var similarOfferTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelectorAll('#offer-dialog');
var dialogClose = offerDialog[0].querySelector('.dialog__close');
var dialogTitle = offerDialog[0].querySelectorAll('.dialog__title');
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

// Создаем пустой массив предложений
var similarNotesNearby = [];

// Заполняем массив данными 8 сгенерированных JS-объектов
for (var i = 0; i < 8; i++) {
  similarNotesNearby.splice(i, 1, createSimilarNotesNearby(i));
}
// Заполнение блока DOM-элементами на основе JS-объектов
var fragment = document.createDocumentFragment();
for (i = 0; i < similarNotesNearby.length; i++) {
  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.setAttribute('tabindex', '0');
  newElement.style.left = similarNotesNearby[i].location.x + 'px';
  newElement.style.top = similarNotesNearby[i].location.y + 'px';
  newElement.innerHTML = '<img src="' + similarNotesNearby[i].author.avatar + '" class="rounded" width="40" height="40" >';
  fragment.appendChild(newElement);
}
firstMark.appendChild(fragment);

// Создаем элемент на основе шаблона #lodge-template
var renderOfferInDialogPanel = function (offer) {
  var offerElement = similarOfferTemplate.cloneNode(true);

  offerElement.querySelector('.lodge__title').textContent = offer.title;
  offerElement.querySelector('.lodge__address').textContent = offer.address;
  // Знак рубля у меня не отображается
  offerElement.querySelector('.lodge__price').innerHTML = offer.price + '&#x20bd;/ночь';
  var offerType = offer.type;
  // Заменяем flat на Квартира, bungalo на Бунгало, house на Дом
  switch (offerType) {
    case 'flat':
      var newOfferType = offerType.replace('flat', 'Квартира');
      break;
    case 'bungalo':
      newOfferType = offerType.replace('bungalo', 'Бунгало');
      break;
    case 'house':
      newOfferType = offerType.replace('house', 'Дом');
      break;
  }
  offerElement.querySelector('.lodge__type').textContent = newOfferType;
  offerElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
  offerElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

 // Выводим все доступные удобства из массива offer.features
  for (i = 0; i < offer.features.length; i++) {
    var features = document.createElement('span');
    features.className = 'feature__image feature__image--' + offer.features[i];
    offerElement.querySelector('.lodge__features').appendChild(features);
  }
  offerElement.querySelector('.lodge__description').textContent = offer.description;
  return offerElement;
};
// Все pin заводим в массив, присваиваем им атрибут data-index и отключаем для всех класс pin-active

var deactivateClassPinActive = function () {
  for (i = 0; i < 9; i++) {
    pinsArray.push(pins[i]);
    pinsArray[i].setAttribute('data-index', i);
    pinsArray[i].classList.remove('pin--active');
  }
};

// Замена карточки элемента
var replaceOfferCard = function () {
  var dialogPanel = offerDialog[0].querySelectorAll('.dialog__panel');
  if (dialogPanel[1]) {
    offerDialog[0].removeChild(dialogPanel[0]);
  }
};
// Удаление карточки элемента
var deleteOfferCard = function () {
  var dialogPanel = offerDialog[0].querySelectorAll('.dialog__panel');
  offerDialog[0].removeChild(dialogPanel[0]);
  dialogTitle[0].style.display = 'none';
  deactivateClassPinActive();
};


var openUserDialog = function (data) {
  dialogTitle[0].style.display = 'block';
// Заменяем src у аватарки пользователя — изображения, которое записано в .dialog__title — на значения поля author.avatar отрисовываемого объекта
  offerDialog[0].querySelector('.dialog__title img').src = similarNotesNearby[data].author.avatar;
// Добавляем вновь созданный элемент dialog__panel
  fragment.appendChild(renderOfferInDialogPanel(similarNotesNearby[data].offer));
  offerDialog[0].appendChild(fragment);
// Удаляем для замены заполненный элемент dialog__panel
  replaceOfferCard();
};
var pins = document.querySelectorAll('.pin');
var pinsArray = [];

var toolbarButtonHandler = function (e) {
// Создаем массив элементов с классом pin и убираем со всех элементов класс .pin-active. При создании массива создаем специальный атрибут data-index
  deactivateClassPinActive();
// Добавляем класс .pin-active выделенному элементу
  pins = e.currentTarget;
  pins.classList.add('pin--active');
 // Получаем значение атрибута data-index текущего элемента и вызываем функцию, которая меняет данные об объекте и его фотку
  var dataIndexPin = pins.getAttribute('data-index') - 1;
  openUserDialog(dataIndexPin);
 // При открытом диалоге клавиша esc закрывает его и деактивирует элемент с классом .pin
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      deleteOfferCard();
    }
  });
};
// При нажатии на аватарку срабатывает функция
for (i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', toolbarButtonHandler);
}
// Когда аватарка в фокусе при нажатии на enter открывается карточка объявления
for (i = 0; i < pins.length; i++) {
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
