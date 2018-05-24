//Use advanced constructor for more wheelnav on same div
wheel1 = new wheelnav('wheelDiv', null, 600, 600);
wheel2 = new wheelnav('wheel2', wheel1.raphael);

//Customize slicePaths for proper size
wheel1.slicePathFunction = slicePath().DonutSlice;
wheel1.slicePathCustom = slicePath().DonutSliceCustomization();
wheel1.slicePathCustom.minRadiusPercent = 0.3;
wheel1.slicePathCustom.maxRadiusPercent = 0.6;
wheel1.sliceSelectedPathCustom = wheel1.slicePathCustom;
wheel1.sliceInitPathCustom = wheel1.slicePathCustom;
wheel2.slicePathFunction = slicePath().DonutSlice;
wheel2.slicePathCustom = slicePath().DonutSliceCustomization();
wheel2.slicePathCustom.minRadiusPercent = wheel.slicePathCustom.radiusPercent;
window.alert("wheel.slicePathCustom.radiusPercent");
wheel2.slicePathCustom.maxRadiusPercent = wheel.slicePathCustom.radiusPercent+4;
wheel2.sliceSelectedPathCustom = wheel2.slicePathCustom;
wheel2.sliceInitPathCustom = wheel2.slicePathCustom;
wheel2.spreaderRadius = 85;

window.alert(wheel1.slicePathCustom.maxRadiusPercent);


//Disable rotation, set navAngle and create the menus
wheel1.clickModeRotate = false;
wheel2.clickModeRotate = false;
wheel2.navAngle = -30;
wheel2.initWheel(["1.1", "1.2","sad"]);

wheel1.createWheel(["1", "2", "3"]);

for(i=0;i<wheel2.navItems.length;i++){
  wheel2.navItems[i].sliceAngle=20;
}
wheel2.navItemsContinuous = true;

wheel2.createWheel();


//Add function to each main menu for show/hide sub menus
