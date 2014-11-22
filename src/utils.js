var utils = {
  getDateFormat:
    function(format) {
      'use strict';
      if (typeof moment === 'function') {
        return moment().format(format);
      }
    },
  contains:
    function (array, needle) {
      'use strict';
      if (!array || array === undefined || array.length === 0) {
        return false;
      }

      for(var i = 0; i < array.length; i++) {
        if(needle.toLowerCase().indexOf(array[i]) > -1) {
          return true;
        }
      }
      return false;
    }
};