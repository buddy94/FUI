//var for the principal wheel
var wheel;

//used for adding the other menu
var wheel2;

// var to store if the circular navigation is open
var open=false;

//array where store the sub menus/links
var linkTo=[];
var otherItems=[];

//num max of elements in a circular navigation
const numMaxElements=10;
var other=false;

// take the html and put the elements in an array of array
retriveMenuItems();


wheel = new wheelnav("wheelDiv");

itemsHome=items = ['title-0', 'title-1', 'title-2', 'title-3', 'title-4', '5','6','7','8','9'];
createCircularNav(items);


window.onload = function () {

  setTimeout(function(){$('#wheelDiv').addClass("notVisible");}, 1);
  attachSubMenus();
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



$.ctrl = function(key, callback, args) {
    var isCtrl = false;
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null

        if(e.ctrlKey) isCtrl = true;
        if(e.keyCode == key.charCodeAt(0) && isCtrl) {
            callback.apply(this, args);
            return false;
        }
    }).keyup(function(e) {
        if(e.ctrlKey) isCtrl = false;
    });
};


$.ctrl('M', function() {
  if(!open){
    openWheel();
  }
  else {
    open=false;

    $('#wheelDiv').addClass("notVisible");
    $('#home_btn').addClass("notVisible");
    $('#wrapperOpacity').addClass("notVisible");
  }
});

$('#foo').bind('click', function() {
  if(!open){
    openWheel();
  }
  else {
    open=false;

    $('#wheelDiv').addClass("notVisible");
    $('#home_btn').addClass("notVisible");
    $('#wrapperOpacity').addClass("notVisible");
  }

});

$('#home_btn').bind('click', function() {
  wheel.removeWheel();
  wheel = new wheelnav("wheelDiv");
  createCircularNav(itemsHome);
  attachSubMenus();
});





function openWheel(){
  open=true;
  $('#wheelDiv').removeClass("notVisible");
  $('#home_btn').removeClass("notVisible");
  $('#wrapperOpacity').removeClass("notVisible");
  positionWheel(other);
}

function setWheelItems(){
  courrentItem=wheel.currentClick;
  wheel.removeWheel();
  wheel = new wheelnav("wheelDiv");
  items=linkTo[courrentItem];
  createCircularNav(items);
}

function goToLink(){
  courrentItem=wheel.currentClick;
  window.location.href = linkTo[courrentItem];
}



function createCircularNav(items){
  wheel.selectedNavItemIndex = null;
  wheel.clickModeRotate = false;
  wheel.titleRotateAngle = 0;
  wheel.hoverPercent = 1.1;
  wheel.animatetime = 1;
  wheel.animateeffect = 'linear';
  wheel.colors = colorpalette.gamebookers;

  // if there are more items add the "other" item
  if(items.length>numMaxElements){
    other=true;
    while (items.length>numMaxElements) {
      otherItems.push(items.pop());
    }
    items.push("Other");

    wheel.createWheel(items);



    wheel2 = new wheelnav('wheel2', wheel.raphael);
    wheel2.slicePathFunction = slicePath().DonutSlice;
    wheel2.slicePathCustom = slicePath().DonutSliceCustomization();
    wheel2.minRadius = wheel.wheelRadius;
    wheel2.slicePathCustom.minRadiusPercent = 0.9;
    wheel2.slicePathCustom.maxRadiusPercent = 1.3;
    wheel2.sliceSelectedPathCustom = wheel2.slicePathCustom;
    wheel2.sliceInitPathCustom = wheel2.slicePathCustom;
    wheel2.spreaderRadius = 85;

    wheel2.initWheel(otherItems);

    for(i=0;i<wheel2.navItems.length;i++){
      wheel2.navItems[i].sliceAngle=20;
    }
    wheel2.navItemsContinuous = true;

    wheel2.createWheel();
  }
  else{
    wheel.createWheel(items);
  }


}



function retriveMenuItems(){
  var listOfElements=[];
  $('#circularMenu').children('li').each(function() {
        listOfElements.push($(this).html());
      });


  var listOfTrimmedElements=[];
  for(s=0;s<listOfElements.length;s++){
    trimmedElement=$.trim(listOfElements[s]);
    itemText="";
    counterSpaces=0;
    j=0;
    while(counterSpaces<2&&j<trimmedElement.length){
      if($.trim(trimmedElement).charAt(j)!=" "){
        itemText+=trimmedElement.charAt(j);
        counterSpaces=0;
      }
      else{

        counterSpaces++;
      }
      j++;

    }
    window.alert(itemText);
    listOfTrimmedElements[s]=$.trim(itemText);
  }



}


function attachSubMenus(){

  linkTo=[['http:/www.google.ch'],[],['title-1', 'title-1'],['title-2', 'title-2','title-2','title-2','title-2'],['title-3', 'title-3','title-3']];
  for(var i=0;i<wheel.navItems.length;i++){
    if(linkTo[i]&&i<numMaxElements){
      if(linkTo[i].length==1){
        wheel.navItems[i].navigateFunction = function(){goToLink();};
      }
      else if(linkTo[i].length==0){
      }
      else{
        wheel.navItems[i].navigateFunction =function(){setWheelItems();};
      }

    }
    else if (i==numMaxElements) {
      var otherSelected = false;
      wheel2.navItems[numMaxElements-1].navigateFunction = function () {
          if (otherSelected) {
            for(y=0;y<wheel2.navItems.length;y++){
              wheel2.navItems[y].navItem.hide();
            }
          }
          else {
            for(y=0;y<whee2.navItems.length;y++){
              wheel2.navItems[y].navItem.show();
            }
          }
          otherSelected = !otherSelected;
      };
    }
  }
}

function positionWheel(other=false){


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


function getChildNodes(node) {
    var children = new Array();
    for(var child in node.childNodes) {
        if(node.childNodes[child].nodeType == 1) {
            children.push(child);
        }
    }
    return children;
}
