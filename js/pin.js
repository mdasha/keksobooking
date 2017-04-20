'use strict';
window.pin = (function () {
  var firstMark = document.querySelector('.tokyo__pin-map');
  var similarOfferTemplate = document.querySelector('#lodge-template').content;
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogPanel = offerDialog.querySelectorAll('.dialog__panel');
  // Заполнение блока DOM-элементами на основе JS-объектов
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.card.createCards.length; j++) {
    var newElement = document.createElement('div');
    newElement.className = 'pin';
    newElement.setAttribute('tabindex', '0');
    newElement.style.left = window.card.createCards[j].location.x + 'px';
    newElement.style.top = window.card.createCards[j].location.y + 'px';
    newElement.innerHTML = '<img src="' + window.card.createCards[j].author.avatar + '" class="rounded" width="40" height="40" >';
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
    for (var i = 0; i < offer.features.length; i++) {
      var features = document.createElement('span');
      features.className = 'feature__image feature__image--' + offer.features[i];
      offerElement.querySelector('.lodge__features').appendChild(features);
    }
    offerElement.querySelector('.lodge__description').textContent = offer.description;
    return offerElement;
  };
  function offerElementee() {
    var offerElements = [];
    window.load(function (cardItems, onError) {
      for (var k = 0; k < window.card.createCards.length; k++) {
        offerElements[k + 1] = renderOfferInDialogPanel(window.card.createCards[k].offer).childNodes[1].innerHTML;
      }
    });
    offerElements[0] = dialogPanel[0].innerHTML;
    return offerElements;
  }
  return {
    'createOffers': offerElementee()
  };
})();

