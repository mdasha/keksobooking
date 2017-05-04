'use strict';
window.synchronizeFields = (function () {
  return function (field1, field2, array1, array2, callback) {
    var i = array1.indexOf(field1.value);
    callback(field2, array2[i]);
  };
})();
