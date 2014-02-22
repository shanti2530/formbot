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

				var elementUnique = document.getElementById(element.id + 'Unique');
				
				//save the value in the input to the local storage	
				localStorage[elementName] = JSON.stringify({unique: elementUnique.checked, defaultValue: elementValue});
			} else {

				//we need to determine if either the defualt or unique checkbox has changed
				var indexUnique = element.id.indexOf('Unique');
				if(indexUnique > -1) {
					var elementName = element.id.substring(0, indexUnique).toUpperCase();
					localStorage[elementName] = JSON.stringify({unique: element.checked,
																defaultValue: JSON.parse(localStorage[elementName]).defaultValue});
				} else {
					var indexDefault = element.id.indexOf('Default');
					var elementName = element.id.substring(0, indexDefault).toUpperCase();
					localStorage[elementName] = JSON.stringify({unique: !element.checked,
																defaultValue: JSON.parse(localStorage[elementName]).defaultValue});
				}
			}
		};

		//fill up the options page with the system default values
		if(el.type !== 'radio') {
			var elementName = el.name.toUpperCase();
			if(localStorage[elementName]) {
				var elementDetails = JSON.parse(localStorage[elementName]);
				el.value = elementDetails.defaultValue;
			}
		} else {
			// in case of the radio buttons .. we need to check the unique boolean attribute
			var indexUnique = el.id.indexOf('Unique');
			if(indexUnique > -1) {
				var elementName = el.id.substring(0, indexUnique).toUpperCase();
				if(localStorage[elementName]) {
					var isUnique = JSON.parse(localStorage[elementName]).unique;
					if(isUnique) {
						el.checked = true;
					} else {
						el.checked = false;
					}	
				}
			} else {
				var indexDefault = el.id.indexOf('Default');
				var elementName = el.id.substring(0, indexDefault).toUpperCase();
				if(localStorage[elementName]) {
					var isUnique = JSON.parse(localStorage[elementName]).unique;
					if(isUnique) {
						el.checked = false;
					} else {
						el.checked = true;
					}
				}
			}
		}
	});
};