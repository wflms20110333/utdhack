console.log("Loaded extension");
var urls = ["*://*.instagram.com/*"];   //    *://*.facebook.com/*
 
 function addURL(details){
    urls.push(details);
 }

 // function deleteURL(url){
 // 	var index = urls.indexOf(url);
 // 	urls.splice(index, 1);
 // }

 function setDefaultUrls(){
 	return{
 		urls:[
 			'facebook.com',
 			'twitch.tv',
 			'reddit.com',
 			'youtube.com',
 			'netflix.com',
 			'twitter.com',
 			'tumblr.com'
 		]
 	}
 }

 function loadPrefs() {
  if(typeof localStorage['prefs'] !== 'undefined') {
    return updatePrefsFormat(JSON.parse(localStorage['prefs']));
  } else {
    return savePrefs(defaultPrefs());
  }
}

function updatePrefsFormat(prefs){

}

function savePrefs(prefs){
	
}

 function blockRequest(details) {
    return {cancel: true};
 }
 
function updateFilters(urls) {
    if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest))
      chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
    chrome.webRequest.onBeforeRequest.addListener(blockRequest, {urls: urls}, ['blocking']);
 }

 function addSlash(url) {

 	//split by ://
 	//split by .    check if it's a valid domain name or like www. or us. or some shit and delete that and replace with *
 	//rejoin with .
 	//conantenate 

 	url = url.split(.);
 	if (url[0] )
 	return "*://*.".concat(url).concat("/*");
 }

 function ValidURL(str) {
 	alert("inside valid");
 	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
  	if(!pattern.test(str)) {
    	alert("Please enter a valid URL.");
    	return false;
  	} else {
    	return true;
  	}
}

var timeLeft1 = 50000000000;
var timeLeft2 = 300000000;
chrome.runtime.onMessage.addListener(
     function(request, sender, sendResponse) {
//     	console.log("hi");

/*        if (request.greeting == "hello"){
            sendResponse({farewell: "goodbye", time1: timeLeft1, time2: timeLeft2});
            console.log("hi");
        }*/

/*        else if (request.greeting == "herestheinput") {
            timeLeft1 = request.input1 * 1000;
            timeLeft2 = request.input2 * 1000;
            console.log("hi");

            //alert(timeLeft);
        }*/
        if (request.greeting == "blacklistinput") {
        	if (ValidURL(request.input4)) {
        		//parsed = addSlash(request.input4);
	        	addURL(request.input4);

	        	//alert(urls.length);
	        	updateFilters(urls);
        	}
	        	//urls.push("*://*.facebook.com/*");

       		alert(urls);
	        	//alert(urls.length);
	        updateFilters(urls);
        	//urls.push(request.input4);
        }
    }
);
 
//addURL("*://*.facebook.com/*");
//urls.push("*://*.facebook.com/*");
updateFilters(urls);
