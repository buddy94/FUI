//var for the principal wheel
var wheel;

//used for adding the other menu
var wheel2;

// var to store if the circular navigation is open
var open=false;

//array where store the sub menus/links
var linkTo=[];
var otherItems=[];
var otherItemsHome=[];

//num max of elements in a circular navigation
const numMaxElements=9;
var other=false;

var itemsParentList=[];
var itemsGrandParentList=[];
var itemsHomeList = [];


// take the html and put the elements in an array of array
itemsHome=items = retriveMenuItems($('#circularMenu'),true);


wheel = new wheelnav("wheelDiv");


//itemsHome=items = ['title-0', 'title-1', 'title-2', 'title-3', 'title-4', '5','6','7','8','9'];
createCircularNav(items);
var position = $('#wheelDiv').offset();
var top_wheel = position.top;

window.onload = function () {
  attachSubMenus();


};


$(window).keydown(function (e) {
  if (e.keyCode == 27) {
    open=false;
    $('#wheelDiv').addClass("notVisible");
    $('#home_btn').addClass("notVisible");
    $('#wrapperOpacity').addClass("notVisible");
  }
});

$(window).click(function() {
  open=false;
  $('#wheelDiv').addClass("notVisible");
  $('#home_btn').addClass("notVisible");
  $('#wrapperOpacity').addClass("notVisible");
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
  if(itemsHome.length>numMaxElements){

    itemsHome.splice(numMaxElements,1);

    itemsHome=itemsHome.concat(otherItems);

  }
  createCircularNav(itemsHome);
  itemsParentList=itemsHomeList;
  attachSubMenus();
});





function openWheel(){
  open=true;
  $('#wheelDiv').removeClass("notVisible");
  $('#home_btn').removeClass("notVisible");
  $('#wrapperOpacity').removeClass("notVisible");
  positionHomeBtn(other);
}

function setWheelItems(subMenu=false){
  courrentItem=0;
  if(subMenu){
    courrentItem=numMaxElements+wheel2.currentClick;
  }
  else{
    courrentItem=wheel.currentClick;
  }


  wheel.removeWheel();
  wheel = new wheelnav("wheelDiv");
  items=linkTo[courrentItem];

  for(l=0;l<courrentItem;l++){
    itemsBeforeCourrent=itemsGrandParentList[l].children('ul').children('li').length;
    for(r=0;r<itemsBeforeCourrent;r++){
      itemsParentList.shift();
    }
  }
  createCircularNav(items);
  attachSubMenus();
}

function goToLink(subMenu=false){
  courrentItem=0;
  if(subMenu){
    courrentItem=numMaxElements+wheel2.currentClick;
  }
  else{
    courrentItem=wheel.currentClick;
  }
  window.location.href = linkTo[courrentItem];
}



function createCircularNav(items){
  wheel.selectedNavItemIndex = null;
  wheel.clickModeRotate = false;
  wheel.titleRotateAngle = 180;
  wheel.hoverPercent = 1.1;
  wheel.animatetime = 1;
  wheel.animateeffect = 'linear';
  wheel.colors = colorpalette.gamebookers;

  // if there are more items add the "other" item
  if(items.length>numMaxElements){
    other=true;
    otherItems=[];
    wheel.wheelRadius=wheel.wheelRadius/1.2;
    while (items.length>numMaxElements) {
      otherItems.push(items.pop());
    }
    otherItems.reverse();

    if(otherItemsHome.length==0){
      otherItemsHome=otherItems;
    }

    items.push(". . .");
    wheel.initWheel(items);
    setTitleAngle(items);
    wheel.createWheel();





    wheel2 = new wheelnav('wheel2', wheel.raphael);
    wheel2.slicePathFunction = slicePath().DonutSlice;
    wheel2.slicePathCustom = slicePath().DonutSliceCustomization();
    wheel2.minRadius = wheel.wheelRadius;
    wheel2.selectedNavItemIndex = null;
    wheel2.slicePathCustom.minRadiusPercent = 0.75;
    wheel2.slicePathCustom.maxRadiusPercent = 1.1;
    wheel2.sliceSelectedPathCustom = wheel2.slicePathCustom;
    wheel2.sliceInitPathCustom = wheel2.slicePathCustom;
    wheel2.spreaderRadius = 85;
    wheel2.clickModeRotate = false;
    wheel2.clockwise=false;

    wheel2.initWheel(otherItems);

    for(i=0;i<wheel2.navItems.length;i++){
      wheel2.navItems[i].sliceAngle=20;
    }
    wheel2.navItemsContinuous = true;

    wheel2.createWheel();
  }
  else{
    wheel.initWheel(items);
    setTitleAngle(items);
    wheel.createWheel(items);

  }


}



function retriveMenuItems(node,firstLevel=false){
  var listOfElements=[];
  var listOfElementsObject=[];

  node.children('li').each(function() {
        listOfElementsObject.push($(this));
        listOfElements.push($(this).html());
        itemsParentList.push($(this));
        if(firstLevel){
          itemsHomeList.push($(this));
        }
      });



  var listOfTrimmedElements=[];
  for(s=0;s<listOfElements.length;s++){

    if($(listOfElementsObject[s]).children('a').length==1){
      listOfElements[s]=$(listOfElementsObject[s]).children('a').html();
    }

    trimmedElement=$.trim(listOfElements[s]);
    itemText="";
    counterSpaces=0;
    j=0;
    while(counterSpaces<2&&j<trimmedElement.length){
      if(trimmedElement.charAt(j)!=" "){
        itemText+=trimmedElement.charAt(j);
        counterSpaces=0;
      }
      else{
        itemText+=trimmedElement.charAt(j);
        counterSpaces++;
      }
      j++;

    }

    listOfTrimmedElements[s]=$.trim(itemText);

  }

  return listOfTrimmedElements;

}


function attachSubMenus(){



  itemsGrandParentList=itemsParentListTemp=itemsParentList;
  itemsParentList=[];

  for(v=0;v<itemsParentListTemp.length;v++){

    if($(itemsParentListTemp[v]).children('ul').length>=1){
      linkTo[v]=retriveMenuItems($(itemsParentListTemp[v]).children('ul'))
    }
    else if ($(itemsParentListTemp[v]).children('a').length==1) {
      linkTo[v]=[$(itemsParentListTemp[v]).children('a').attr("href")];
    }
    else {
      linkTo[v]=[];
    }
  }


  //linkTo=[['http:/www.google.ch'],[],['title-1', 'title-1'],['title-2', 'title-2','title-2','title-2','title-2'],['title-3', 'title-3','title-3']];
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
      for(y=0;y<wheel2.navItems.length;y++){
        wheel2.navItems[y].navItem.hide();
      }

      var otherSelected = false;
      wheel.navItems[numMaxElements].navigateFunction = function () {

          if (otherSelected) {
            for(y=0;y<wheel2.navItems.length;y++){
              wheel2.navItems[y].navItem.hide();
            }
          }
          else {
            for(y=0;y<wheel2.navItems.length;y++){
              wheel2.navItems[y].navItem.show();
            }
          }
          otherSelected = !otherSelected;

      };
      for(var e=0;e<wheel2.navItems.length;e++){
        if(linkTo[numMaxElements+e]){
          if(linkTo[numMaxElements+e].length==1){
            wheel2.navItems[e].navigateFunction = function(){goToLink(true);};
          }
          else if(linkTo[e].length==0){
          }
          else{
            wheel2.navItems[e].navigateFunction =function(){setWheelItems(true);};
          }

        }
      }
    }
  }
}

function positionHomeBtn(other=false){


    var width_wheel = $('#wheelDiv').width();


    var viewWidth = $( window ).width();
    var left_wheel = (viewWidth-width_wheel)/2;
    $('#wheelDiv').css({"left":left_wheel});


    var height_wheel = $('#wheelDiv').height();
    //var left_wheel = position.left;


    $('#home_btn').css({"left":left_wheel+(width_wheel/2)-35,"top":top_wheel+(height_wheel/2)-35});
    //$('#home_btn').css({"left":viewWidth/2,"top":viewHeight/2});
}



function setTitleAngle(items){
  if(items.length==2){
    wheel.navItems[0].titleRotateAngle = 0;
    wheel.navItems[1].titleRotateAngle = 180;
  }
  else if(items.length==3){
    wheel.navItems[0].titleRotateAngle = 0;
    wheel.navItems[1].titleRotateAngle = 180;
    wheel.navItems[2].titleRotateAngle = 180;
  }
  else if(items.length==4){
    wheel.navItems[0].titleRotateAngle = 0;
    wheel.navItems[1].titleRotateAngle = 180;
    wheel.navItems[2].titleRotateAngle = 180;
    wheel.navItems[3].titleRotateAngle = 180;
  }
  else if(items.length==5){
    wheel.navItems[0].titleRotateAngle = 0;
    wheel.navItems[1].titleRotateAngle = 0;
    wheel.navItems[2].titleRotateAngle = 180;
    wheel.navItems[3].titleRotateAngle = 180;
    wheel.navItems[4].titleRotateAngle = 0;
  }
  else if(items.length==6){
    wheel.navItems[0].titleRotateAngle = 0;
    wheel.navItems[1].titleRotateAngle = 0;
    wheel.navItems[2].titleRotateAngle = 180;
    wheel.navItems[3].titleRotateAngle = 180;
    wheel.navItems[4].titleRotateAngle = 180;
    wheel.navItems[5].titleRotateAngle = 0;
  }
  else if(items.length==7){
    wheel.navItems[0].titleRotateAngle = 0;
    wheel.navItems[1].titleRotateAngle = 0;
    wheel.navItems[2].titleRotateAngle = 180;
    wheel.navItems[3].titleRotateAngle = 180;
    wheel.navItems[4].titleRotateAngle = 180;
    wheel.navItems[5].titleRotateAngle = 180;
    wheel.navItems[6].titleRotateAngle = 0;
  }
  else if(items.length==8){
    wheel.navItems[0].titleRotateAngle = 0;
    wheel.navItems[1].titleRotateAngle = 0;
    wheel.navItems[2].titleRotateAngle = 180;
    wheel.navItems[3].titleRotateAngle = 180;
    wheel.navItems[4].titleRotateAngle = 180;
    wheel.navItems[5].titleRotateAngle = 180;
    wheel.navItems[6].titleRotateAngle = 0;
    wheel.navItems[7].titleRotateAngle = 0;
  }
  else if(items.length==9){
    wheel.navItems[0].titleRotateAngle = 0;
    wheel.navItems[1].titleRotateAngle = 0;
    wheel.navItems[2].titleRotateAngle = 180;
    wheel.navItems[3].titleRotateAngle = 180;
    wheel.navItems[4].titleRotateAngle = 180;
    wheel.navItems[5].titleRotateAngle = 180;
    wheel.navItems[6].titleRotateAngle = 180;
    wheel.navItems[7].titleRotateAngle = 0;
    wheel.navItems[8].titleRotateAngle = 0;
  }
  else if(items.length==10){
    wheel.navItems[0].titleRotateAngle = 0;
    wheel.navItems[1].titleRotateAngle = 0;
    wheel.navItems[2].titleRotateAngle = 180;
    wheel.navItems[3].titleRotateAngle = 180;
    wheel.navItems[4].titleRotateAngle = 180;
    wheel.navItems[5].titleRotateAngle = 180;
    wheel.navItems[6].titleRotateAngle = 180;
    wheel.navItems[7].titleRotateAngle = 180;
    wheel.navItems[8].titleRotateAngle = 0;
    wheel.navItems[9].titleRotateAngle = 0;
  }
}
