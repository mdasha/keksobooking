'use strict';
window.pin = (function () {
  var firstMark = document.querySelector('.tokyo__pin-map');
  var similarOfferTemplate = document.querySelector('#lodge-template').content;
  // Заполнение блока DOM-элементами на основе JS-объектов
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.card.createCards.length; i++) {
    var newElement = document.createElement('div');
    newElement.className = 'pin';
    newElement.setAttribute('tabindex', '0');
    newElement.style.left = window.card.createCards[i].location.x + 'px';
    newElement.style.top = window.card.createCards[i].location.y + 'px';
    newElement.innerHTML = '<img src="' + window.card.createCards[i].author.avatar + '" class="rounded" width="40" height="40" >';
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
  function createOffers() {
    // Создаем пустой массив предложений
    var offerElements = [];
    // Заполняем массив данными 8 сгенерированных JS-объектов
    for (i = 0; i < 8; i++) {
      offerElements[i] = renderOfferInDialogPanel(0);
    }
    return offerElements;
  }
  return {
    'createOffers': createOffers()
  };
})();

