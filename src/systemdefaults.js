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
