javascript:function f(){
	
	/*function which given an array of input elements would fill them up 
	with the respective values*/
	var processInputElements = function(inputs) {
	
        /*A function which given a length would return a string of characters*/
        var getRandomText = function(len) {
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var output = "";
            for (var i = 0; i < len; i++) {
                output = output + characters.charAt(Math.random()*54);
            }
            return output;
        }

        /*A function which given an element checks if it belongs to a certain text string*/
        var eleContains = function(ele, testString, caseSensitive) {
            var eleId;
            var eleName;
            if (caseSensitive) {
                eleId = input.id;
                eleName = input.name;
            } else {
                eleId = input.id.toLowerCase();
                eleName = input.name.toLowerCase();
                testString = testString.toLowerCase();
            }
            return (eleId.indexOf(testString) != -1 || eleName.indexOf(testString) != -1);
        }

		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];

            if (input.value != null && input.value.length > 0) {
                /*we do not alter the value in the text box if it is not empty*/
            } else {
                if (input.type === 'email'
                    || eleContains(input, 'mail', false)) {
                    input.value = 'f@ke.com';
                } else if (input.type === 'password') {
                    input.value = 'Password123';
                } else if (eleContains(input, 'card', false)) {
                    input.value = '4444333322221111';
                } else if (input.type === 'text') {
                    input.value = getRandomText(7);
                }
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