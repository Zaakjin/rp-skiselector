"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
var menuPool = null;
var clothMainMenu = null;
//var N = 0;
var mainCam = null;
var componentIdList = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var clothMainMenuStructure = [
    [0, "Face (0)"],
    [0, "Mask (1)"],
    //[0, "Hair"],
    [0, "Torso (3)"],
    [0, "Legs (4)"],
    [0, "Bags and backpacks (5)"],
    [0, "Feet (6)"],
    [0, "Accessories (7)"],
    [0, "Undershirt (8)"],
    [0, "Body Armor (9)"],
    [0, "Decals (10)"],
    [0, "Tops (11)"]];
function createClothMainMenu() {
    clothMainMenu = API.createMenu("Cloth", "_", 0, 0, 2);
    menuPool.Add(clothMainMenu);
    clothMainMenu.OnMenuClose.connect(function (senderMenu) { menuPool.RefreshIndex(); });
    var clothMenuItemsAndSubMenus = resource.SkinSelector.fillMenuWithListItems(clothMainMenu, clothMainMenuStructure, "Cloth");
    for (var N = 0; N < clothMenuItemsAndSubMenus[0].length; N++) {
        var drawableIdItem = API.createListItem("Drawable ID", " ", resource.SkinSelector.numberToList(API.returnNative("GET_NUMBER_OF_PED_DRAWABLE_VARIATIONS", 0, API.getLocalPlayer(), componentIdList[N])), 0);
        clothMenuItemsAndSubMenus[0][N].AddItem(drawableIdItem);
        var textureItem = API.createListItem("Texture ID", " ", resource.SkinSelector.numberToList(63), 0);
        clothMenuItemsAndSubMenus[0][N].AddItem(textureItem);
        drawableIdItem.OnListChanged.connect(function (menuListItem, newIndex) {
            API.sendChatMessage("~r~SLOT: ~w~" + componentIdList[clothMainMenu.CurrentSelection] + " ~g~ID: ~w~" + newIndex + " ~b~TEX VARS: ~w~" + API.returnNative("GET_NUMBER_OF_PED_TEXTURE_VARIATIONS", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection], newIndex) + "~y~ PALETE VARS: ~w~" + API.returnNative("GET_PED_PALETTE_VARIATION", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection]));
            API.returnNative("SET_PED_COMPONENT_VARIATION", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection], newIndex, textureItem.Index, 0);
        });
        textureItem.OnListChanged.connect(function (menuListItem, newIndex) {
            var currentDrawable = API.returnNative("GET_PED_DRAWABLE_VARIATION", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection]);
            //API.sendChatMessage("Current ID: " + API.returnNative("GET_PED_DRAWABLE_VARIATION", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection]) + " IN SLOT:" + componentIdList[clothMainMenu.CurrentSelection]);
            if (newIndex > API.returnNative("GET_NUMBER_OF_PED_TEXTURE_VARIATIONS", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection], currentDrawable)) {
                menuListItem.Index = 0;
            }
            API.returnNative("SET_PED_COMPONENT_VARIATION", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection], currentDrawable, textureItem.Index, 0);
        });
    }
}
function generateClothSubMenu(sender, selectedItem) {
}
API.onServerEventTrigger.connect(function (name, args) {
    if (name == "cloth_selector") {
        clothMainMenu.Visible = true;
    }
    if (name == "set_cam") {
        setCam(args[0]);
    }
});
API.onUpdate.connect(function () {
    if (menuPool != null) {
        menuPool.ProcessMenus();
    }
});
API.onResourceStart.connect(function () {
    menuPool = API.getMenuPool();
    createClothMainMenu();
});
function setCam(id) {
    var currentPos = API.getEntityPosition(API.getLocalPlayer());
    var currentRot = API.getEntityRotation(API.getLocalPlayer());
    var rot = currentRot.Z * 0.0174533;
    if (currentRot.Z < 0) {
        rot = (360 + currentRot.Z) * 0.0174533;
    }
    switch (id) {
        case 0:
            API.setActiveCamera(null);
            break;
        case 1:
            currentPos.X += Math.sin(rot) * -1;
            currentPos.Y += Math.cos(rot);
            currentPos.Z += 1;
            API.sendChatMessage("Current rot :" + (rot * 57.3) + " Math.cos(0): " + Math.cos(rot));
            mainCam = API.createCamera(currentPos, new Vector3());
            API.pointCameraAtEntityBone(mainCam, API.getLocalPlayer(), 31086, new Vector3());
            API.setActiveCamera(mainCam);
            break;
        case 2:
            currentPos.X += 3 * Math.cos(rot) * -1;
            currentPos.Y += 3 * Math.sin(rot);
            currentPos.Z += 1;
            mainCam = API.createCamera(currentPos, new Vector3());
            API.pointCameraAtEntityBone(mainCam, API.getLocalPlayer(), 31086, new Vector3());
            //API.pointCameraAtEntity(mainCam, API.getLocalPlayer(), new Vector3());
            API.setActiveCamera(mainCam);
            break;
    }
}
;
