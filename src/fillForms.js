javascript:function f(){
	
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
        getTimestamp:
            function() {
                var date = new Date();
                return date.getTime();
            }
    };

    /*The default object with which the fields will be filled up*/
    var defaults = {
        "EMAIL"    : {value:'f@ke.com'},
        "PASSWORD" : {value:'Password123'},
        "CARD_NO"  : {value:'4444333322221111'},
        "CVV"      : {value:'123'},
        "PHONE"    : {value:'79797979'},
        "TEXT"     : {value: utils.randomText(7)},
        "USERNAME" : {value : 'u' + utils.getTimestamp()}
            
    };

    /*Checker text which the inputs should be matched to*/
    var inputChecker = {
        defaults: [
            {includes: ["mail"], type:"EMAIL"},
            {includes: ["pass"], type:"PASSWORD"},
            {includes: ["card"], excludes: ["name"], type:"CARD_NO"},
            {includes: ["cvv"],  type:"CVV"},
            {includes: ["phone", "tel", "mobile"], type:"PHONE"},
            {includes: ["text"],  type:"TEXT"},
            {includes: ["username", "userId", "user"], type:"USERNAME"}],


        //TODO: add excludes functionality
        checkText: function(text) {
            for (var i = this.defaults.length - 1; i >= 0; i--) {
                for (var j = this.defaults[i].includes.length - 1; j >= 0; j--) {
                    if (text.toLowerCase().indexOf(this.defaults[i].includes[j]) != -1) {
                        return this.defaults[i].type;
                    }
                }
            }
        },

        checkInput: function(input) {
            
            var identifiedTextType;

            //check input id
            var inputId = input.id;
            if (inputId) {
                identifiedTextType = this.checkText(inputId);
            }

            if (identifiedTextType && identifiedTextType != undefined) {
                return identifiedTextType;
            }    
            
            //check input name
            var inputName = input.name;
            if (inputName) {
                identifiedTextType = this.checkText(inputName);
            }
            
            if (identifiedTextType && identifiedTextType != undefined) {
                return identifiedTextType;
            }               
            
            //check input type
            var inputType = input.type;
            if (inputType) {
                identifiedTextType = this.checkText(inputType);
            }

            if (identifiedTextType && identifiedTextType != undefined) {
                return identifiedTextType;
            }

            //TODO: check input label
            return identifiedTextType;
        }
    };

	/*A function that given an array of input elements would fill them up 
	with the respective values*/
	var processInputElements = function(inputs) {

		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];

            if (input.type === 'checkbox') {
				/*tick all checkboxes found*/
				input.checked = true;
			} else if (input.value && input.value.length > 0) {
                /*we do not alter the value in the text box if it is not empty*/
            } else {
                var inputCheckerResult = inputChecker.checkInput(input);
                input.value = defaults[inputCheckerResult].value;
            }
		}
	};
	
	/*function which given an array of selects would choose a random option*/
	var processSelectElements = function(selects) {
		for(var i = 0; i < selects.length; i++){
			var dd = selects[i];
			dd.selectedIndex = Math.random() * (selects.length - 1) + 1;
		}
	};
	
	/*lookup for the form elements to fill*/
    processInputElements(document.getElementsByTagName('input'));
    processSelectElements(document.getElementsByTagName('select'));
}f();