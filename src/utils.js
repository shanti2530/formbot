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
    indexOf: 
        function (needle) {
            if(typeof Array.prototype.indexOf === 'function') {
                indexOf = Array.prototype.indexOf;
            } else {
                indexOf = function(needle) {
                    var i = -1, index = -1;

                    for(i = 0; i < this.length; i++) {
                        if(this[i] === needle) {
                            index = i;
                            break;
                        }
                    }
                    return index;
                };
            }
        return indexOf.call(this, needle);
        }
};