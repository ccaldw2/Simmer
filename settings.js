/*
	This file contains all the scripts required to manage the memory of the simmer
	extension, with regards to the application settings.
*/


/*
	retrieves data stored via chrome.storage for each parameter of the application
*/
function retrieveSettings() {

    chrome.storage.sync.get({"capsLock" : ""}, function(items) {
    	console.log('retrieved capsLock as ' + items.capsLock);
    	document.getElementById("capsLock").checked = items.capsLock;
    });

    chrome.storage.sync.get({"literally" : ""}, function(items) {
    	console.log('retrieved literally as ' + items.literally);
    	document.getElementById("literally").checked = items.literally;
    });
}

/*
	uses chrome.storage API to save settings for each parameter of the application
	so that the application maintains continuity when the window is closed
*/
function changeSettings() {
	var capsLock = document.getElementById("capsLock").checked;
	var literally = document.getElementById("literally").checked;

	chrome.storage.sync.set({"capsLock" : capsLock}, function() {
		console.log('set capsLock to ' + capsLock);
	});

	chrome.storage.sync.set({"literally" : literally}, function() {
		console.log('set literally to ' + literally);
	});

}


document.addEventListener("DOMContentLoaded", function() {

	retrieveSettings();

	var listOfOptions = document.getElementsByClassName("selectionBox")

		for(var i = 0; i < listOfOptions.length; i++) { 
			listOfOptions[i].addEventListener("click", function() {
				changeSettings();
			})
		}
})