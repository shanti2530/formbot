window.onload = function() {

	//save all inputs in chrome's local storage upon change
	Array.prototype.slice.call(document.querySelectorAll('input')).forEach(function(el) {
		el.onchange = function(event) {

		//get the element and its data
			var element = event.srcElement;
			
			var elementName = element.name.toUpperCase();
			var elementValue = element.value;
			
			localStorage[elementName] = elementValue;
		}
	})

	
}

