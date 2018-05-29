chrome.runtime.onInstalled.addListener(function() {

   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
     chrome.declarativeContent.onPageChanged.addRules([{
       conditions: [new chrome.declarativeContent.PageStateMatcher({
         pageUrl: {hostEquals: 'gizmodo.com'},

       })
       ],
           actions: [new chrome.declarativeContent.ShowPageAction()]
     }]);
     chrome.declarativeContent.onPageChanged.addRules([{
       conditions: [new chrome.declarativeContent.PageStateMatcher({
         pageUrl: {hostEquals: 'www.unifr.ch'},

       })
       ],
           actions: [new chrome.declarativeContent.ShowPageAction()]
     }]);
     chrome.declarativeContent.onPageChanged.addRules([{
       conditions: [new chrome.declarativeContent.PageStateMatcher({
         pageUrl: {hostEquals: 'www.treccani.it'},

       })
       ],
           actions: [new chrome.declarativeContent.ShowPageAction()]
     }]);
   });
 });
