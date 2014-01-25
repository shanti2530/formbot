/*The default object with which the fields will be filled up*/
var defaults = {
    'EMAIL'    : {value:'f@ke.com', includes: ['mail']},
    'PASSWORD' : {value:'Password123', includes: ['pass']},
    'CARD_NO'  : {value:'4444333322221111', includes: ['card'], excludes: ['name', 'code']},
    'CVV'      : {value:'123', includes: ['cvv']},
    'PHONE'    : {value:'79797979', includes: ['phone', 'tel', 'mobile']},
    'USERNAME' : {value: 'u' + utils.getDateFormat('X'), includes: ['username', 'userId']},
    'URL'      : {value: 'http://www.fakeaddresshere.com', includes: ['url', 'site']},
    'NUMBER'   : {value: utils.randomNumber(), includes: ['number', 'amount', 'range']},
    'DATETIME' : {value: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime']},
    'DATE'     : {value: utils.getDateFormat('YYYY-MM-DD'), includes: ['date']},
    'TIME'     : {value: utils.getDateFormat('HH:mm'), includes: ['time']},
    'WEEK'     : {value: utils.getDateFormat('GGGG-[W]WW'), includes: ['week']},
    'MONTH'    : {value: utils.getDateFormat('YYYY-MM'), includes: ['month']},
    'TEXT'     : {value: utils.randomText(7), includes: ['text']}
};

var getSystemDefault = function(inputType) {
    'use strict';

    return defaults[inputType].value;
};