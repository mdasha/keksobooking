// Отрисовка элементов на карте
'use strict';
(function () {
  var firstMark = document.querySelector('.tokyo__pin-map');
  window.renderOffers = function (data) {
    window.cards = data;
    var newElement = [];
    for (var i = 0; i < data.length; i++) {
      window.render[i] = document.createDocumentFragment();
      data[i] = window.renderCard(data[i]);
      newElement[i] = document.createElement('div');
      newElement[i].className = 'pin';
      newElement[i].setAttribute('tabindex', '0');
      newElement[i].style.left = data[i].location.x + 'px';
      newElement[i].style.top = data[i].location.y + 'px';
      newElement[i].innerHTML = '<img src="' + data[i].author.avatar + '" class="rounded" width="40" height="40" >';
      window.render[i] = window.render[i].appendChild(newElement[i]);
      firstMark.appendChild(window.render[i]);
      window.offerElements[i + 1] = window.pin.createOffers(window.cards[i].offer).childNodes[1].innerHTML;
    }
    var pins = document.querySelectorAll('.pin');
    return pins;
  };
})();
