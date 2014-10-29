(function fillForms(){
  'use strict';

  //Everytime the fill forms script is executed, send an event to google analytics
  chrome.extension.sendMessage({method: 'analytics', category: 'chrome-extension', action: location.host});

  var fillInput = function(input) {

    chrome.extension.sendMessage({method: 'checkInput',
        id: input.id,
        name: input.name,
        placeholder: input.placeholder,
        type: input.type},
          function(response) {
            input.value = response.key;
            triggerOnChangeEventOnInput(input);
          });
  };

  /*
   *Trigger a change event on the input so that the browser would be notified
   * that the input value has changed.
   * This is important in AngularJS apps as angular would update the model
   * with the new value when the change event triggers. Otherwise the model would
   * not be updated with the latest value
   */
  var triggerOnChangeEventOnInput = function(input) {

    if ('createEvent' in document) {
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', true, false);
      input.dispatchEvent(evt);
    } else {
      input.fireEvent('onchange');
    }
  }

  /*A function that given an array of input elements would fill them up
   with the respective values*/
  var processInputElements = function(inputs) {

    for(var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      if (input.type === 'radio' || input.type === 'hidden' || input.type === 'button' ||
        input.type === 'submit' || input.type === 'file') {
        /*hidden inputs should not be altered .. they are hidden for a reason*/
        /*radio buttons are handled separately in the function processRadioButtonGroupElements*/
        /*buttons/submit inputs could not be prefilled therefore we skip them*/
        /*file input types could not be prefilled, therefore we do not try to process them*/
      } else if (input.type === 'checkbox') {
        /*tick all checkboxes bottons found*/
        input.checked = true;
      } else if (input.value && input.value.length > 0) {
        /*we do not alter the value in the text box if it is not empty*/
      } else {
        fillInput(input);
      }

    }
  };

  /*A function which processes groups of radio buttons,
   the reason to treating radio buttons seperately from other inputs
   is that we have to take care that only one radio button is selected per group
   and that if one is already selected, then we do not chnage the group*/
  var processRadioButtonGroupElements = function(radios) {
    for (var i = 0; i < radios.length; i++) {
      //get the radio group name
      var group = radios[i].name;

      //check if for this specific group there is no radio button checked already
      var groupRadios = document.querySelectorAll('input[name=' + group + ']:checked');

      //if one is already checked .. then skip this radio button
      //else check it
      if (groupRadios.length < 1) {
        radios[i].checked = true;
        chrome.extension.sendMessage({method: 'analytics', category: 'input-type', action: 'RADIO'});
      }
    }
  };

  /*function which given an array of selects would choose a random option*/
  var processSelectElements = function(selects) {
    for(var i = 0; i < selects.length; i++){
      var dd = selects[i];

      //get a random valid option
      var allValidOptions = dd.querySelectorAll('option[value]:not([value=""])');
      dd.selectedIndex = allValidOptions[Math.floor(Math.random() * allValidOptions.length)].index;

      // Triggers the change event
      dd.dispatchEvent(new Event('change'));
      chrome.extension.sendMessage({method: 'analytics', category: 'input-type', action: 'SELECT'});
    }
  };

  /*function which given an array of text areas would insert random text*/
  var processTextAreaElements = function(textAreas) {
    for (var i = 0; i < textAreas.length; i++) {
      var txtArea = textAreas[i];
      fillInput(txtArea);
      chrome.extension.sendMessage({method: 'analytics', category: 'input-type', action: 'TEXTAREA'});
    }
  };

  /*lookup for the form elements to fill*/
  processRadioButtonGroupElements(document.querySelectorAll('input[type=radio]:not([disabled])'));
  processInputElements(document.querySelectorAll('input:not([disabled]):not([type="radio"])'));
  processSelectElements(document.querySelectorAll('select:not([disabled])'));
  processTextAreaElements(document.querySelectorAll('textarea:not([disabled])'));
})();