'use strict';
window.synchronizeFields = (function () {
  return function (field1, field2, array1, array2, callback) {
    for (var i = 0; i < array1.length; i++) {
      if (field1.value === array1[i]) {
        callback(field2, array2[i]);
      }
    }
  };
})();
