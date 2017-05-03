'use strict';
window.load = (function () {
  var timeout = 10000;
  var okStatus = 200;
  var responseType = 'json';
  return function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    xhr.addEventListener('load', function () {
      if (xhr.status === okStatus) {
        onSuccess(xhr.response);
      } else {
        onError(xhr);
      }
    });
    xhr.addEventListener('error', function () {
      document.body.textContent = 'Произошла ошибка при загрузке данных';
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = timeout; // 10s

    xhr.open('GET', url);
    xhr.send();
  };
})();
