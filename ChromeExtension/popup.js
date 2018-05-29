// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

$('#hideNav').change(function(){
    if($(this).is(':checked')) {
        // Checkbox is checked..



chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
chrome.tabs.executeScript(tabs[0].id, {code: "document.getElementById('circularNavigation').style.display = 'none';"}, function(response) {

});
});
    } else {
        // Checkbox is not checked..
        alert("not checked");
    }
});

/*
let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});


changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};
*/
