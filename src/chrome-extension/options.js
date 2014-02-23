window.onload = function() {
	'use strict';

	//all text inputs (which in this case are all inputs except radio buttons) 
	Array.prototype.slice.call(document.querySelectorAll('input:not([type=radio])')).forEach(function(el) {

		var elementName = el.name.toUpperCase();

		//fill the inputs with the default values already stored in the local storage
		if(localStorage[elementName]) {
			var elementDetails = JSON.parse(localStorage[elementName]);
			el.value = elementDetails.defaultValue;
		}

		//save all inputs in chrome's local storage upon change
		el.onchange = function(event) {

			//get the element and its data
			var element = event.srcElement;

			var elementValue = element.value;

			if(localStorage[elementName]) {
				var elementLocalStorage = JSON.parse(localStorage[elementName]);
				
				//save the value in the input to the local storage	
				localStorage[elementName] = JSON.stringify({unique: elementLocalStorage.unique, 
															defaultValue: elementValue,
															uniqueValue: elementLocalStorage.uniqueValue});
			}
		};
	});

	//all unique radio buttons in options form
	Array.prototype.slice.call(document.querySelectorAll('input[type=radio][id$=Unique]')).forEach(function(el) {

		//check radio buttons according to local storage
		var radioName = el.id.substring(0, el.id.indexOf('Unique')).toUpperCase();

		if(localStorage[radioName]) {
			var radioLocalStorage = JSON.parse(localStorage[radioName]);
			el.checked = radioLocalStorage.unique;
	
			//save changes made to the local storage
			el.onchange = function(event) {
				var radio = event.srcElement;
				var radioChecked = radio.checked;

				localStorage[radioName] = JSON.stringify({unique: radioChecked, 
														  defaultValue: radioLocalStorage.defaultValue,
														  uniqueValue: radioLocalStorage.uniqueValue});
			};
		}
	});

	//all default radio buttons in options form
	Array.prototype.slice.call(document.querySelectorAll('input[type=radio][id$=Default]')).forEach(function(el) {

		//check radio buttons according to local storage
		var radioName = el.id.substring(0, el.id.indexOf('Default')).toUpperCase();
		
		if(localStorage[radioName]) {
			var radioLocalStorage = JSON.parse(localStorage[radioName]);

			el.checked = !radioLocalStorage.unique;

			//save changes made to the local storage
			el.onchange = function(event) {
				var radio = event.srcElement;
				var radioChecked = radio.checked;
				//update checked value in local storage
				localStorage[radioName] = JSON.stringify({unique: !radioChecked, 
														  defaultValue: radioLocalStorage.defaultValue,
														  uniqueValue: radioLocalStorage.uniqueValue});
			};
		}
	});
};