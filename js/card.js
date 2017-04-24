'use strict';
(function () {
// Создаем одно предложение
  window.renderCard = function (cardItem) {
    var similarNoteNearby =
      {
        author: {
          avatar: cardItem.author.avatar
        },
        location: {
          x: cardItem.location.x,
          y: cardItem.location.y
        },
        offer: {
          title: cardItem.offer.title,
          address: cardItem.offer.address,
          price: cardItem.offer.price,
          type: cardItem.offer.type,
          rooms: cardItem.offer.rooms,
          guests: cardItem.offer.guests,
          checkin: cardItem.offer.checkin,
          checkout: cardItem.offer.checkout,
          features: cardItem.offer.features,
          description: cardItem.offer.description,
          photos: cardItem.offer.photos
        }
      };
    return similarNoteNearby;
  };
})();

