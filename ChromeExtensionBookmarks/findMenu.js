$('head').append('<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossorigin="anonymous">');
$('head').append('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
$('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>');

$('body').append('<div id="wheelDiv" class="notVisible"></div>');
$('body').append('<div id="wrapperOpacity" class="notVisible"></div>');
$('body').append('<button id="foo">+</button>');
$('body').append('<button class="w3-button w3-xlarge w3-circle w3-blue w3-card-4 notVisible"  id="home_btn"><i class="fas fa-home"></i>');

chrome.storage.sync.set({circularMenu: $( ".section-nav" )[0]}, function() {

});




  chrome.bookmarks.getTree( process_bookmark );


function process_bookmark(bookmarks) {

    for (var i =0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            console.log("bookmark: "+ bookmark.title + " ~  " + bookmark.url);
        }

        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}
