(function () { 
    document.addEventListener("DOMContentLoaded", alterText)
    chrome.storage.onChanged.addListener(alterText)
    //chrome.webRequest.onCompleted.addListener(alterText)
})()


String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


function alterText() {
    chrome.storage.sync.get(["literally","capsLock"], function(items) {
        replaceTitleText(items)
        replaceNodeText(document.body, items);
    })
}



function replaceTitleText(conditions) {
    document.title = delegateEdits(document.title, conditions)
}

function replaceNodeText(node, conditions) {

    if (node.closest && node.closest('.kix-appview')) return;

    var walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                return (node.parentElement && node.parentElement.isContentEditable) ?
                    NodeFilter.FILTER_SKIP :
                    NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    var textNode;
    while(textNode = walker.nextNode()) {
        textNode.nodeValue = delegateEdits(textNode.nodeValue,conditions);
    }
}



function delegateEdits(text, conditions) {
    if (conditions["literally"] === true)
        text = removeLiterallys(text)
    if (conditions["capsLock"] === true) 
        text = deCapitalise(text)
    return text;
}



function removeLiterallys(text) {
    var regex = / *\bliterally\b/gi;

    return text.replace(regex, "");
}

function deCapitalise(text) {
    var regex = RegExp(/[A-Z]/g);

    while(text.search(regex) !== -1) {
        var loc = text.search(regex);
        var replacement = text.charAt(loc).toLowerCase();
        text = text.replaceAt(loc,replacement);
    }
    return text;
} //TO-DO: create a more sophisticated decapitalisation function
