var getDefaultValue = function(inputType, maxLength) {
	'use strict';

    /*The default object with which the fields will be filled up*/
    var defaults = {
        'EMAIL'    : {value:'f@ke.com'},
        'PASSWORD' : {value:'Password123'},
        'CARD_NO'  : {value:'4444333322221111'},
        'CVV'      : {value:'123'},
        'PHONE'    : {value:'79797979'},
        'TEXT'     : {value: utils.randomText(maxLength)},
        'USERNAME' : {value: 'u' + utils.getDateFormat('X')},
        'URL'      : {value: 'http://www.fakeaddresshere.com'},
        'NUMBER'   : {value: utils.randomNumber()},
        'DATETIME' : {value: utils.getDateFormat('YYYY-MM-DDTHH:mm')},
        'DATE'     : {value: utils.getDateFormat('YYYY-MM-DD')},
        'TIME'     : {value: utils.getDateFormat('HH:mm')},
        'WEEK'     : {value: utils.getDateFormat('GGGG-[W]WW')},
        'MONTH'    : {value: utils.getDateFormat('YYYY-MM')}
    };
	
    return defaults[inputType].value;
};