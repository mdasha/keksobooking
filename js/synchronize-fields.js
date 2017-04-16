'use strict';
window.synchronizeFields = function (field1, field2, array1, array2, callback) {
  field1.addEventListener('change', function (evt) {
    field1 = evt.currentTarget;
    var syncValues = function (field2, value) {
      field2.value = value;
    };
    callback(syncValues);
  });
};
