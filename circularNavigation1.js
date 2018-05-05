
var open=false;

var wheel;




$( document ).ready(function() {
  titles = ['title-0', 'title-1', 'title-2', 'title-3', 'title-4', 'asfadsfa','asdfa'];
  wheelCreate(wheel,titles);
  wheel.createWheel(titles);
    //$('#wheelDiv').addClass("notVisible");

});

$('#foo').bind('click', function() {
  if(!open){
    open=true;
    $('#wheelDiv').removeClass("notVisible");

    wheel.removeWheel();
    window.alert("sdf");
    titles = ['titlasdfe-0', 'sadf-1', 'tidddtle-2', 'title-ddd3', 'titdddle-4', 'asfadsfa','asdfa'];
    wheelCreate(wheel,titles);
    wheel.createWheel(titles);

  }
  else {
    open=false;
    $('#wheelDiv').addClass("notVisible");

  }

});




function wheelCreate(wheel,titles){
  wheel = new wheelnav('wheelDiv');
  wheel.selectedNavItemIndex = null;
  wheel.clickModeRotate = false;
  wheel.titleRotateAngle = 0;

  wheel.hoverPercent = 1.1;
  wheel.animatetime = 1;
  wheel.animateeffect = 'linear';


  wheel.colors = colorpalette.gamebookers;

}
