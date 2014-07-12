/*The default object with which the fields will be filled up*/
var getDefaults = function() {
    'use strict';

    var defaults = [
        {name:'EMAIL',    value: {defaultValue:'f@ke.com', includes: ['mail']}},
        {name:'PASSWORD', value: {defaultValue:'Password123', includes: ['pass']}},
        {name:'CARD_NO',  value: {defaultValue:'4444333322221111', includes: ['card'], excludes: ['name', 'code']}},
        {name:'CVV',      value:{defaultValue:'123', includes: ['cvv', 'cvc', 'cv2']}},
        {name:'PHONE',    value:{defaultValue:'79797979', includes: ['phone', 'tel', 'mobile']}},
        {name:'USERNAME', value:{defaultValue: 'john', includes: ['username', 'userId']}},
        {name:'DOMAIN',   value:{defaultValue: 'fakeaddresshere.com', includes: ['domain']}},
        {name:'URL',      value:{defaultValue: 'http://www.fakeaddresshere.com', includes: ['url', 'site']}},
        {name:'NUMBER',   value: {defaultValue: 5, includes: ['number', 'amount', 'range']}},
        {name:'DATETIME', value: {defaultValue: utils.getDateFormat('YYYY-MM-DDTHH:mm'), includes: ['datetime']}},
        {name:'DATE',     value: {defaultValue: utils.getDateFormat('YYYY-MM-DD'), includes: ['date']}},
        {name:'TIME',     value: {defaultValue: utils.getDateFormat('HH:mm'), includes: ['time']}},
        {name:'WEEK',     value: {defaultValue: utils.getDateFormat('GGGG-[W]WW'), includes: ['week']}},
        {name:'MONTH',    value: {defaultValue: utils.getDateFormat('YYYY-MM'), includes: ['month']}},
        {name:'TEXT',     value: {defaultValue: 'Lorem', includes: ['text']}}
    ];
    return defaults;
};

var getUniqueValue = function(inputType) {
    'use strict';
    switch (inputType) {
        case 'TEXT':
            return chance.word({length: 7});
        case 'DOMAIN':
            return chance.domain();
        case 'EMAIL':
            return chance.email();
        case 'PASSWORD':
            return chance.string({length: 7});
        case 'CARD_NO':
            return chance.cc();
        case 'CVV':
            return chance.integer({min:100, max:999});
        case 'PHONE':
            return chance.phone();
        case 'USERNAME':
            return chance.word({length: 7});
        case 'URL':
            return 'http://' + chance.domain();
      case 'NUMBER':
            return chance.integer({min:1,max:99});
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