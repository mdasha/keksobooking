'use strict';
(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError = (function () {
          var header = document.querySelector('header');
          var onErrorText = header.querySelector('.error');
          if (!onErrorText) {
            var fragment = document.createDocumentFragment();
            var newElement = document.createElement('div');
            newElement.className = 'error';
            newElement.textContent = 'Произошла ошибка при загрузке данных. Код ошибки:' + xhr.status;
            newElement.style.color = 'white';
            newElement.style.backgroundColor = 'red';
            fragment.appendChild(newElement);
            header.appendChild(fragment);
          }
        })();
      }
    });
    xhr.addEventListener('error', function () {
      document.body.textContent = 'Произошла ошибка при загрузке данных';
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
})();
