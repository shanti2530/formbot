javascript:function f(){
	
	//function which given an array of input elements would fill them up 
	//with the respective values
	var processInputElements = function(inputs) {
	
		var emailRegx = /email/g;
	
		for(var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			var inputId = input.id;
			if (input.type === 'email' || emailRegx.test(inputId)) {
				input.value = 'f@ke.com';
			} else if (input.type === 'password') {
				input.value = 'Password123';
			} else if (input.type === 'text') {
				input.value = Math.random().toString(36).slice(2, 7 + 2);   
			}
		}
	};
	
	//function which given an array of selects would choose a random option
	var processSelectElements = function(selects) {
		for(var i = 0; i < selects.length; i++){
			var dd = selects[i];
			dd.selectedIndex = Math.random() * (selects.length - 1) + 1;
		}
	};
	
	//lookup for the form elements to fill
    processInputElements(document.getElementsByTagName('input'));
    processSelectElements(document.getElementsByTagName('select'));
}f();