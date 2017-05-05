'use strict';
window.load = (function () {
  var TIMEOUT = 10000;
  var OK_STATUS = 200;
  var RESPONSE_TYPE = 'json';
  return function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Произошла ошибка с кодом ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Не удалось отправить запрос');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open('GET', url);
    xhr.send();
  };
})();
