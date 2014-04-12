var utils = {
    randomText:
        function(len) {
			'use strict';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var output = '';
            for (var i = 0; i < len; i++) {
                output = output + characters.charAt(Math.random()*54);
            }
            return output;
        },
    randomNumber:
        function(min, max) {
			'use strict';
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
    getDateFormat:
        function(format) {
			'use strict';
            if (typeof moment === 'function') {
                return moment().format(format);
            }
        },
    isEmpty: function(variable) {
        'use strict';
        if (!variable || variable === '' || variable === 'undefined') {
            return true;
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