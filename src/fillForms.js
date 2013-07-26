javascript:function f(){
	
	/*function which given an array of input elements would fill them up 
	with the respective values*/
	var processInputElements = function(inputs) {
	
		var emailRegx = /email/g;

        /*A function which given a length would return a string of characters*/
        var getRandomText = function(len) {
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var output = "";
            for (var i = 0; i < len; i++) {
                output = output + characters.charAt(Math.random()*54);
            }
            return output;
        }

		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];

            if (input.value != null && input.value.length > 0) {
                /*we do not alter the value in the text box if it is not empty*/
            } else {
                if (input.type === 'email'
                    || emailRegx.test(input.id)
                    || emailRegx.test(input.name)) {

                    input.value = 'f@ke.com';
                } else if (input.type === 'password') {
                    input.value = 'Password123';
                } else if (input.id.toLowerCase().indexOf('card') != -1
                    || input.name.toLowerCase().indexOf('card') != -1) {
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