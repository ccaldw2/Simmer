document.addEventListener("DOMContentLoaded", function() {
  sweepWebsite();
})

function sweepWebsite() {
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
	chrome.tabs.executeScript(
    {file: "DOMAlterScript.js"}
  );
}

