/*The default object with which the fields will be filled up*/
var getDefaults = function(maxLength) {
    'use strict';

    var defaults = {
        'EMAIL'    : {defaultdefaultValue:'f@ke.com', includes: ['mail']},
        'PASSWORD' : {defaultValue:'Password123', includes: ['pass']},
        'CARD_NO'  : {defaultValue:'4444333322221111', includes: ['card'], excludes: ['name', 'code']},
        'CVV'      : {defaultValue:'123', includes: ['cvv']},
        'PHONE'    : {defaultValue:'79797979', includes: ['phone', 'tel', 'mobile']},
        'USERNAME' : {defaultValue: 'u' + utils.getDateFormat('X'), includes: ['username', 'userId']},
        'DOMAIN'   : {defaultValue: 'fakeaddresshere.com', includes: ['domain']},
        'URL'      : {defaultValue: 'http://www.fakeaddresshere.com', includes: ['url', 'site']},
        'NUMBER'   : {defaultValue: utils.randomNumber(), includes: ['number', 'amount', 'range']},
        'DATETIME' : {defaultValue: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime']},
        'DATE'     : {defaultValue: utils.getDateFormat('YYYY-MM-DD'), includes: ['date']},
        'TIME'     : {defaultValue: utils.getDateFormat('HH:mm'), includes: ['time']},
        'WEEK'     : {defaultValue: utils.getDateFormat('GGGG-[W]WW'), includes: ['week']},
        'MONTH'    : {defaultValue: utils.getDateFormat('YYYY-MM'), includes: ['month']},
        'TEXT'     : {defaultValue: utils.randomText(maxLength), includes: ['text']}
    };

    return defaults;
};

var getSystemDefault = function(inputType, maxLength) {
    'use strict';
    var defaults = getDefaults(maxLength);

    return defaults[inputType].defaultValue;
};