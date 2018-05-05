var wheel;
var open=false;
var linkTo=[];

wheel = new wheelnav("wheelDiv");
itemsHome=items = ['title-0', 'title-1', 'title-2', 'title-3', 'title-4', 'asfadsfa','asdfa'];
createCircularNav(items);


window.onload = function () {

  setTimeout(function(){$('#wheelDiv').addClass("notVisible");}, 1);
  selectSubMenus();
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
$('#home_btn').click(function(event){
    event.stopPropagation();
});


$('#foo').bind('click', function() {
  if(!open){
    openWheel();
  }
  else {
    open=false;

    $('#wheelDiv').addClass("notVisible");
    $('#home_btn').addClass("notVisible");
  }

});

$('#home_btn').bind('click', function() {
  wheel.removeWheel();
  wheel = new wheelnav("wheelDiv");
  createCircularNav(itemsHome);
  selectSubMenus();
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
  courrentItem=wheel.currentClick;
  wheel.removeWheel();
  wheel = new wheelnav("wheelDiv");
  items=linkTo[courrentItem];
  createCircularNav(items);

}

function createCircularNav(items){
  wheel.selectedNavItemIndex = null;
  wheel.clickModeRotate = false;
  wheel.titleRotateAngle = 0;
  wheel.hoverPercent = 1.1;
  wheel.animatetime = 1;
  wheel.animateeffect = 'linear';
  wheel.colors = colorpalette.gamebookers;
  wheel.createWheel(items);
}

function selectSubMenus(){
  linkTo=[['title-0', 'title-0'],['title-1', 'title-1'],['title-2', 'title-2','title-2','title-2','title-2'],['title-3', 'title-3','title-3']];
  for(var i=0;i<wheel.navItems.length;i++){
    if(linkTo[i]){
      wheel.navItems[i].navigateFunction =function(){setWheelItems();};
    }
  }
}
