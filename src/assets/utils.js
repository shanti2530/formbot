var utils = {
    randomText: 
        function(len) {
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var output = "";
            for (var i = 0; i < len; i++) {
                output = output + characters.charAt(Math.random()*54);
            }
            return output;
        },
    randomNumber:
        function() {
            return Math.floor((Math.random()*99) +1);
        },
    getDateFormat:
        function(format) {
            if (typeof moment == 'function') {
                return moment().format(format);
            }
        }
};