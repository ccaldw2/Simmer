/*
	This file contains the application logic and algorithms used to parse text and convert
	web pages as per the desired function of the software's design goals
*/



document.addEventListener("DOMContentLoaded", function() {

	var listOfOptions = document.getElementsByClassName("selectionBox")

	for(var i = 0; i < listOfOptions.length; i++) { 
		listOfOptions[i].addEventListener("click", function() {
			sweepWebsite();
		});
	}
})

function sweepWebsite(){
  	var queryInfo = {
    	active: true,
    	currentWindow: true
  	};

  	var tab; 
  	chrome.tabs.query (queryInfo, function(tabs){
		tab = tabs[0];
  	});

  	injectScript ();
	
}

function injectScript() {

	var scripts = ['capsLockScript.js', 'literallyScript.js'];

    chrome.storage.sync.get({"capsLock" : ""}, function(items) {
    	if(items.capsLock){
	    	chrome.tabs.executeScript({
	    		file: scripts[1]
  			});
    	};
    });

    chrome.storage.sync.get({"literally" : ""}, function(items) {
    	if(items.literally){
	    	chrome.tabs.executeScript({
	    		file: scripts[2]
  			});
    	};
    });
}

