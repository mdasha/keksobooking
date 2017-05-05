'use strict';
window.getPin = (function () {
  var similarOfferTemplate = document.querySelector('#lodge-template').content;
  // Заполнение блока DOM-элементами на основе JS-объектов
  // Создаем элемент на основе шаблона #lodge-template
  return function (offer) {
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
    offer.features.forEach(function (offerFeature) {
      var features = document.createElement('span');
      features.className = 'feature__image feature__image--' + offerFeature;
      offerElement.querySelector('.lodge__features').appendChild(features);
    });

    offerElement.querySelector('.lodge__description').textContent = offer.description;
    // Добавляем изображения объектов
    var photos = document.createElement('div');
    photos.className = 'lodge__photos';
    offer.photos.forEach(function (offerPhoto) {
      var photosImg = document.createElement('img');
      photosImg.src = offerPhoto;
      photosImg.alt = 'Lodge photo';
      photosImg.height = '42';
      photosImg.width = '52';
      offerElement.querySelector('.lodge__photos').appendChild(photosImg);
    });
    return offerElement;
  };
})();
