document.title = generateReplacement(document.title);

// Replace all initial text on page
replaceNodeText(document.body);

// Create a mutation observer to monitor the DOM for changes
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        Array.prototype.slice.call(mutation.addedNodes).forEach(replaceNodeText);
    });
});

// Configure and start the observer
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});


function replaceNodeText(node) {

    if(node.closest && node.closest('.kix-appview')) return;

    var walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Reject contentEditable nodes
                return (node.parentElement && node.parentElement.isContentEditable) ?
                    NodeFilter.FILTER_SKIP :
                    NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    // Replace all text nodes
    var textNode;
    while(textNode = walker.nextNode()) {
        textNode.nodeValue = generateReplacement(textNode.nodeValue);
    }
}

function generateReplacement(text) {
    var regex = /\bliterally\b/gi;
    return text.replace(regex, " ");
}