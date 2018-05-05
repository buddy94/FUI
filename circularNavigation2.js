var wheel;
var homeWheel;
var wheelIcons;
var open=false;

items = ['title-0', 'title-1', 'title-2', 'title-3', 'title-4', 'asfadsfa','asdfa'];
wheel = new wheelnav("wheelDiv");
wheel.selectedNavItemIndex = null;
wheel.clickModeRotate = false;
wheel.titleRotateAngle = 0;
wheel.hoverPercent = 1.1;
wheel.animatetime = 1;
wheel.animateeffect = 'linear';
wheel.colors = colorpalette.gamebookers;
wheel.createWheel(items);

window.onload = function () {

  $('#wheelDiv').addClass("notVisible");
};



$(window).click(function() {
  open=false;
  $('#wheelDiv').addClass("notVisible");
  $('#home_btn').addClass("notVisible");
});

$('#wheelDiv').click(function(event){
    event.stopPropagation();
});
$('#foo').click(function(event){
    event.stopPropagation();
});


$('#foo').bind('click', function() {
  if(!open){
    openWheel();
  }
  else {
    open=false;

    setWheelItems();
    //$('#wheelDiv').addClass("notVisible");
  }

});


function openWheel(){
  open=true;
  $('#wheelDiv').removeClass("notVisible");
  $('#home_btn').removeClass("notVisible");
    //$('#wrapperOpacity').removeClass("notVisible");
    var width_wheel = $('#wheelDiv').width();
    var viewWidth = $( window ).width();
    var left_wheel = (viewWidth-width_wheel)/2;
    $('#wheelDiv').css({"left":left_wheel});

    var position = $('#wheelDiv').offset();
    var height_wheel = $('#wheelDiv').height();
    //var left_wheel = position.left;
    var top_wheel = position.top;
    $('#home_btn').css({"left":left_wheel+(width_wheel/2)-35,"top":top_wheel+(height_wheel/2)-35});
}

function setWheelItems(){
  wheel.removeWheel();
  wheel = new wheelnav("wheelDiv");
  items = ['titlasdfe-0', 'sadf-1'];
  wheel.selectedNavItemIndex = null;
  wheel.clickModeRotate = false;
  wheel.titleRotateAngle = 0;
  wheel.hoverPercent = 1.1;
  wheel.animatetime = 1;
  wheel.animateeffect = 'linear';
  wheel.colors = colorpalette.gamebookers;
  wheel.createWheel(items);

}
