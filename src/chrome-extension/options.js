window.onload = function() {
	'use strict';

	//all text inputs (which in this case are all inputs except checkboxes)
	Array.prototype.slice.call(document.querySelectorAll('input:not([type=checkbox])')).forEach(function(el) {

		var elementName = el.name.toUpperCase();

		//fill the inputs with the default values already stored in the local storage
		if(localStorage[elementName]) {
			var elementDetails = JSON.parse(localStorage[elementName]);
			el.value = elementDetails.defaultValue;

      //if the field is set to randomly generate .. then disable the input for defined field
      if (elementDetails.unique) {
        el.disabled = true;
      }
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

  Array.prototype.slice.call(document.querySelectorAll('span[id$=Matches]')).forEach(function(el) {

    var matchesIndex = el.id.indexOf('Matches');
    var name = el.id.substring(0, matchesIndex).toUpperCase();

    if (localStorage[name]) {
      var elementLocalStorage = JSON.parse(localStorage[name]);
      if (elementLocalStorage.includes) {
        el.innerText = elementLocalStorage.includes;
      }
    }
  });

  Array.prototype.slice.call(document.querySelectorAll('span[id$=Excludes]')).forEach(function(el) {

    var matchesIndex = el.id.indexOf('Excludes');
    var name = el.id.substring(0, matchesIndex).toUpperCase();

    if (localStorage[name]) {
      var elementLocalStorage = JSON.parse(localStorage[name]);
      if (elementLocalStorage.excludes) {
        el.innerText = elementLocalStorage.excludes;
      }
    }
  });

  //get the checkboxes which define if the field should be random or defined
  Array.prototype.slice.call(document.querySelectorAll('input[type=checkbox][name=onoffswitch]')).forEach(function(el) {

    var elementType = el.id.toUpperCase();
    var type = JSON.parse(localStorage[elementType]);
    el.checked = !type.unique;

    //every time it changes ..
    el.onclick = function (event) {

      var element = event.srcElement;

      var elementType = element.id.toUpperCase();
      var type = JSON.parse(localStorage[elementType]);

      element.checked = type.unique;

      document.getElementsByName(el.id)[0].disabled = !type.unique;

      localStorage[elementType] = JSON.stringify({unique: !type.unique,
														  defaultValue: type.defaultValue,
														  uniqueValue: type.uniqueValue});

    };
	});
};