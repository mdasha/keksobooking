 'use strict';
 window.appData = (function () {
   var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Уютное бунгало недалеко от моря', 'Неуютное бунгало по колено в воде', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик'];
   var OFFER_ADDRESSES = ['117285, Россия, Москва, ул. Тимура Фрунзе, 15-285', '115407, Россия, Москва, Нагатинская набережная, 32-185', '132158, Россия, Москва, ул. Братиславская, 17-85', '147528, Россия, Москва, ул. Лубянка, 1-1', '198523, Россия, Москва, Черноморский бульвар, 14-528', '165982, Россия, Москва, ул. Бакинских Комиссаров, 10-142', '165985, Россия, Москва, ул. Нижняя Красносельская, 42-152', '165986, Россия, Москва, ул. Бауманская, 42-58'];
   var OFFER_TYPES = ['flat', 'house', 'bungalo'];
   var OFFER_CHECKS = ['12:00', '13:00', '14:00'];
   var OFFER_FEATURES = 'wifi, dishwasher, parking, washer, elevator, conditioner';
   var data = {
     offerTitles: OFFER_TITLES,
     offerAddressess: OFFER_ADDRESSES,
     offerTypes: OFFER_TYPES,
     offerChecks: OFFER_CHECKS,
     offerFeatures: OFFER_FEATURES
   };
   return data;
 })();
