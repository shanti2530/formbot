function fillForms(){
	'use strict';
	
	/* jshint ignore:start */
    include "assets/utils.js"

    // include "assets/defaultvalues.js"
	/* jshint ignore:end */
	
    var getDefaultValue = function (inputType, maxLength, input) {
        console.log(inputType);
        chrome.extension.sendMessage({method: 'getInputValue',
                                      inputType: inputType,
                                      maxLength: maxLength},
            function(response) {
                console.log(response);
                fillInput(input, response.data);
            }
        );
    };

    var fillInput = function(input, data) {
        input.value = data;
    };

    /*Checker text which the inputs should be matched to
        The values which are assigned have a priority. The first in the list
        has the most priority over the others in the list
    */
    var inputChecker = {
        defaults: [
            {includes: ['mail'], type:'EMAIL'},
            {includes: ['pass'], type:'PASSWORD'},
            {includes: ['card'], excludes: ['name', 'code'], type:'CARD_NO'},
            {includes: ['cvv'],  type:'CVV'},
            {includes: ['phone', 'tel', 'mobile'], type:'PHONE'},
            {includes: ['url', 'site'], type:'URL'},
            {includes: ['username', 'userId'], type:'USERNAME'},
            {includes: ['datetime'], type:'DATETIME'},
            {includes: ['date'], type:'DATE'},
            {includes: ['time'], type:'TIME'},
            {includes: ['month'], type:'MONTH'},
            {includes: ['week'], type:'WEEK'},
            {includes: ['number', 'amount', 'range'], type:'NUMBER'},
            {includes: ['text'],  type:'TEXT'}
		],

        isEmpty: function(variable) {
            if (!variable || variable === '' || variable === 'undefined') {
                return true;
            }
        },

        checkText: function(text) {

            if (this.isEmpty(text)){
                return;
            }

            var inputType;
            var excluded = false;

            /*First we try to match the text we have with one of the default includes*/
            for (var i = this.defaults.length - 1; i >= 0; i--) {
                if (this.isEmpty(this.defaults[i].includes)) {
                    continue;
                }
                for (var j = this.defaults[i].includes.length - 1; j >= 0; j--) {

                    if (text.toLowerCase().indexOf(this.defaults[i].includes[j]) !== -1) {
                        inputType = this.defaults[i].type;

                        /*If we find a match with one of the includes we then check that the text
                        does not also match one of the exluded of the same type*/

                        if (this.isEmpty(this.defaults[i].excludes)) {
                            continue;
                        }

                        for (var k = this.defaults[i].excludes.length - 1; k >= 0; j--) {
                            if (text.toLowerCase().indexOf(this.defaults[i].excludes[k]) !== -1) {
                                excluded = true;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            if (!excluded) {
                return inputType;
            }
        },

        checkInput: function(input) {

            var identifiedTextType;

            //check input id
            var inputId = input.id;
            if (inputId) {
                identifiedTextType = this.checkText(inputId);
            }

            //check input name
            var inputName = input.name;
            if (this.isEmpty(identifiedTextType) && !this.isEmpty(inputName)) {
                identifiedTextType = this.checkText(inputName);
            }

            //check input placeholder
            var inputPlaceholder = input.placeholder;
            if (this.isEmpty(identifiedTextType) && !this.isEmpty(inputPlaceholder)) {
                identifiedTextType = this.checkText(inputPlaceholder);
            }

            //Check input label
            if (this.isEmpty(identifiedTextType) && !this.isEmpty(inputId)) {
                var labels = document.getElementsByTagName('LABEL');
                for (var i = 0; i < labels.length; i++) {
                    if (!this.isEmpty(labels[i].htmlFor) && labels[i].htmlFor === inputId) {
                        identifiedTextType = this.checkText(labels[i].innerHTML);
                        break;
                    }
                }
            }

            //check input type
            var inputType = input.type;
            if (this.isEmpty(identifiedTextType) && !this.isEmpty(inputType)) {
                identifiedTextType = this.checkText(inputType);
            }

            //if we were unable to match an input with a type then always default to text
            if (this.isEmpty(identifiedTextType)) {
                identifiedTextType = 'TEXT';
            }

            return identifiedTextType;
        }
    };

    /*A function that given an array of input elements would fill them up
    with the respective values*/
    var processInputElements = function(inputs) {

        for(var i = 0; i < inputs.length; i++) {
            var input = inputs[i];

            if (input.type === 'radio' || input.type === 'hidden') {
                /*hidden inputs should not be altered .. they are hidden for a reason*/
                /*radio buttons are handled separately in the function processRadioButtonGroupElements*/
            } else if (input.type === 'checkbox') {
                /*tick all checkboxes bottons found*/
                input.checked = true;
            } else if (input.value && input.value.length > 0) {
                /*we do not alter the value in the text box if it is not empty*/
            } else {
                var inputCheckerResult = inputChecker.checkInput(input);

                /**Checking for the max length that is allowed by this input
                 if not defined the value is very large and therefore we do not want to use it **/
                var maxLength = 7;

                if (input.maxLength && input.maxLength < 7) {
                    maxLength = input.maxLength;
                }

                // getDefaultValue(inputCheckerResult, maxLength);
                getDefaultValue(inputCheckerResult, maxLength, input);
                // if (inputCheckerResult && defaultValue) {
                //     input.value = defaultValue;
                // }
            }
            
        }
    };

    /*A function which processes groups of radio buttons,
      the reason to treating radio buttons seperately from other inputs
      is that we have to take care that only one radio button is selected per group
      and that if one is already selected, then we do not chnage the group*/
    var processRadioButtonGroupElements = function(radios) {
        for (var i = 0; i < radios.length; i++) {
            //get the radio group name 
            var group = radios[i].name;
            
            //check if for this specific group there is no radio button checked already
            var groupRadios = document.querySelectorAll('input[name=' + group + ']:checked');
            
            //if one is already checked .. then skip this radio button
            //else check it
            if (groupRadios.length < 1) {
                radios[i].checked = true;
            }
        }
    };
    
    /*function which given an array of selects would choose a random option*/
    var processSelectElements = function(selects) {
        for(var i = 0; i < selects.length; i++){
            var dd = selects[i];
            //get the first option which have a value assigned to them
            dd.selectedIndex = dd.querySelector('option[value]:not([value=""])').index;
            // Triggers the change event
            dd.dispatchEvent(new Event('change'));
        }
    };
    
    /*function which given an array of text areas would insert random text*/
    var processTextAreaElements = function(textAreas) {
        for (var i = 0; i < textAreas.length; i++) {
            var txtArea = textAreas[i];
            txtArea.value = utils.randomText(20);
        }
    };
    
    /*lookup for the form elements to fill*/
    processRadioButtonGroupElements(document.querySelectorAll('input[type=radio]:not([disabled])'));
    processInputElements(document.querySelectorAll('input:not([disabled]):not([type="radio"])'));
    processSelectElements(document.querySelectorAll('select:not([disabled])'));
    processTextAreaElements(document.querySelectorAll('textarea:not([disabled])'));
}
fillForms();