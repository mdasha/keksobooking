'use strict';
window.card = (function () {
// Создаем одно предложение
  var renderCard = function (cardItem) {
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
  function createCards() {
    var cards = [];
    window.load(function (cardItems) {
      for (var i = 0; i < cardItems.length; i++) {
        cards[i] = renderCard(cardItems[i]);
      }
    });
    return cards;
  }
  return {
    'createCards': createCards()
  };
})();
