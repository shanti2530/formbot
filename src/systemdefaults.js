/*The default object with which the fields will be filled up*/
var getDefaults = function() {
    'use strict';

    var defaults = {
        'EMAIL'    : {defaultValue:'f@ke.com', includes: ['mail']},
        'PASSWORD' : {defaultValue:'Password123', includes: ['pass']},
        'CARD_NO'  : {defaultValue:'4444333322221111', includes: ['card'], excludes: ['name', 'code']},
        'CVV'      : {defaultValue:'123', includes: ['cvv']},
        'PHONE'    : {defaultValue:'79797979', includes: ['phone', 'tel', 'mobile']},
        'USERNAME' : {defaultValue: 'john', includes: ['username', 'userId']},
        'DOMAIN'   : {defaultValue: 'fakeaddresshere.com', includes: ['domain']},
        'URL'      : {defaultValue: 'http://www.fakeaddresshere.com', includes: ['url', 'site']},
        'NUMBER'   : {defaultValue: 5, includes: ['number', 'amount', 'range']},
        'DATETIME' : {defaultValue: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime']},
        'DATE'     : {defaultValue: utils.getDateFormat('YYYY-MM-DD'), includes: ['date']},
        'TIME'     : {defaultValue: utils.getDateFormat('HH:mm'), includes: ['time']},
        'WEEK'     : {defaultValue: utils.getDateFormat('GGGG-[W]WW'), includes: ['week']},
        'MONTH'    : {defaultValue: utils.getDateFormat('YYYY-MM'), includes: ['month']},
        'TEXT'     : {defaultValue: 'Lorem', includes: ['text']}
    };
    return defaults;
};

var getSystemDefault = function(inputType) {
    'use strict';
    var defaults = getDefaults();
    return defaults[inputType].defaultValue;
};

var getUniqueValue = function(inputType) {
    'use strict';
    switch (inputType) {
        case 'TEXT':
            return utils.randomText(7);
        case 'DOMAIN':
            return utils.randomText(7) + '.com';
        case 'EMAIL':
            return utils.randomText(7) + '@' + utils.randomText(7) + '.com';
        case 'PASSWORD':
            return utils.randomText(7);
        case 'CARD_NO':
            return '4444333322221111';
        case 'CVV':
            return utils.randomNumber();
        case 'PHONE':
            return '79797979';
        case 'USERNAME':
            return 'u' + utils.getDateFormat('X');
        case 'URL':
            return 'http://' + utils.randomText(10) + '.com';
        case 'NUMBER':
            return utils.randomNumber();
        case 'DATETIME':
            return utils.getDateFormat('YYYY-MM-DDTHH:mm');
        case 'DATE':
            return utils.getDateFormat('YYYY-MM-DD');
        case 'TIME':
            return utils.getDateFormat('HH:mm');
        case 'WEEK':
            return utils.getDateFormat('GGGG-[W]WW');
        case 'MONTH':
            return utils.getDateFormat('YYYY-MM');
    }
};