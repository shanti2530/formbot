window.onload = function() {
	'use strict';

	//all text inputs (which in this case are all inputs except radio buttons)
//	Array.prototype.slice.call(document.querySelectorAll('input:not([type=radio])')).forEach(function(el) {
//
//		var elementName = el.name.toUpperCase();
//
//		//fill the inputs with the default values already stored in the local storage
//		if(localStorage[elementName]) {
//			var elementDetails = JSON.parse(localStorage[elementName]);
//			el.value = elementDetails.defaultValue;
//		}
//
//		//save all inputs in chrome's local storage upon change
//		el.onchange = function(event) {
//
//			//get the element and its data
//			var element = event.srcElement;
//
//			var elementValue = element.value;
//
//			if(localStorage[elementName]) {
//				var elementLocalStorage = JSON.parse(localStorage[elementName]);
//
//				//save the value in the input to the local storage
//				localStorage[elementName] = JSON.stringify({unique: elementLocalStorage.unique,
//															defaultValue: elementValue,
//															uniqueValue: elementLocalStorage.uniqueValue});
//			}
//		};
//	});

  Array.prototype.slice.call(document.querySelectorAll('input[type=checkbox][name=onoffswitch]')).forEach(function(el) {

    var elementType = el.id.toUpperCase();
    var type = JSON.parse(localStorage[elementType]);
    el.checked = type.unique;


    el.onclick = function (event) {

      var element = event.srcElement;

      var elementType = element.id.toUpperCase();
      console.log(elementType);
      var type = JSON.parse(localStorage[elementType]);


      element.checked = !type.unique;

      localStorage[elementType] = JSON.stringify({unique: !type.unique,
														  defaultValue: type.defaultValue,
														  uniqueValue: type.uniqueValue});

    };
	});
};