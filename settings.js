function retrieveSettings() {

    chrome.storage.sync.get(["literally", "capsLock"], function(items) {
    	document.getElementById("capsLock").checked = items.capsLock;
    	document.getElementById("literally").checked = items.literally;
    });
}

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