javascript:function f(){
	
    /*A function that given a length would return a string of characters*/
    var getRandomText = function(len) {
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var output = "";
        for (var i = 0; i < len; i++) {
            output = output + characters.charAt(Math.random()*54);
        }
        return output;
    };

    /*A function which given an element checks if it belongs to a certain text string*/
    var eleContains = function(ele, testString) {
        var eleId = ele.id.toLowerCase();
        var eleName = ele.name.toLowerCase();
        testString = testString.toLowerCase();
        if (eleId.indexOf(testString) != -1 || eleName.indexOf(testString) != -1) {
            return true;
        } else {
            var labels = document.getElementsByTagName("label");
            for (var i = 0; i < labels.length; i++) {
                if(labels[i].htmlFor != null && labels[i].htmlFor != ''
                    && labels[i].htmlFor === input.id){
                    return (labels[i].innerHTML.toLowerCase().indexOf(testString) != -1)
                }
            }
            if (ele.parentNode.tagName === 'LABEL') {
                return ele.parentNode.innerHTML.toLowerCase().indexOf(testString) != -1;
            }
        }
        return false;
    };

    /*A function that given an input tries to guess what type it is and populate its value accordingly*/
    var guessTextInput = function(element) {

        var EMAIL = 'f@ke.com';
        var PASSWORD = 'Password123';
        var CARD_NO = '4444333322221111';
        var CVV = '123';
        var PHONE = '79797979';

        if (element.type === 'email'
            || eleContains(element, 'mail')) {
            element.value = EMAIL;
        } else if (element.type === 'password') {
            element.value = PASSWORD;
        } else if (eleContains(element, 'card')) {
            element.value = CARD_NO;
        } else if (eleContains(element, 'cvv')) {
            element.value = CVV;
        } else if (eleContains(element, 'phone') 
            || eleContains(element, 'tel')
            || eleContains(element, 'mobile')) {
            element.value = PHONE;
        } else {
            element.value = getRandomText(7);
        }
    }

	/*A function that given an array of input elements would fill them up 
	with the respective values*/
	var processInputElements = function(inputs) {

		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			if (input.type === 'checkbox') {
				/*we tick all checkboxes found*/
				input.checked = true;
			} else if (input.value != null && input.value.length > 0) {
                /*we do not alter the value in the text box if it is not empty*/
            } else if (input.type === 'text'){
                guessTextInput(input);
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