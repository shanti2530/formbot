// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    // code: 'document.body.appendChild(document.createElement("script")).src="//raw.github.com/shanti2530/bookmarklets/master/dest/fillForms.min.js";console.log(chrome.extension.getURL("fillForms.min.js"));'
	code: 'document.body.appendChild(document.createElement("script")).src=chrome.extension.getURL("fillForms.min.js"); console.log("appended");'
  });
});