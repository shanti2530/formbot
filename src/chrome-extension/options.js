window.onload = function() {
	'use strict';

	//save all inputs in chrome's local storage upon change
	Array.prototype.slice.call(document.querySelectorAll('input')).forEach(function(el) {
		el.onchange = function(event) {

			//get the element and its data
			var element = event.srcElement;
			
			if(element.type !== 'radio') {
				var elementName = element.name.toUpperCase();
				var elementValue = element.value;
				//save the value in the input to the local storage	
				localStorage[elementName] = elementValue;
			}
		};

		//fill up the options page with the system default values
		if(el.type !== 'radio') {
			var elementName = el.name.toUpperCase();
			el.value = localStorage[elementName];
		}

	});
};