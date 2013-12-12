window.onload = function() {
	
	//save all inputs in chrome's local storage upon change
	document.querySelector('input').onchange = function(event) {
		
		//get the element and its data
		var element = event.srcElement;
		
		var elementName = element.name;
		var elementValue = element.value;
		
		//store in an object to be stored by the browser
		var data = {};
		data[elementName] = elementValue;
		
		chrome.storage.sync.set(data, 
			function() {
				console.log("Saved!");
			});
		
		chrome.storage.sync.get(elementName, function(result) {
			console.log(result);
		});
	}
	
	
}

