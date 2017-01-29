"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
var menuPool = null;
var clothMainMenu = null;
var clothMenuItemsAndSubMenus = null;
//var N = 0;
var mainCam = null;

var componentIdList = [0,1,3,4,5,6,7,8,9,10,11];

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


function createClothMainMenu()
{
    clothMainMenu = API.createMenu("Cloth", "_", 0, 0, 2);
    menuPool.Add(clothMainMenu);
    clothMainMenu.OnMenuClose.connect(function (senderMenu) { menuPool.RefreshIndex() });
    clothMenuItemsAndSubMenus = resource.SkinSelector.fillMenuWithListItems(clothMainMenu, clothMainMenuStructure, "Cloth");
    for (var menu of clothMenuItemsAndSubMenus[0])
    {
        menu.OnMenuClose.connect(function (senderMenu)
        {
            senderMenu.Clear();
        });
    }
    clothMainMenu.OnItemSelect.connect(function (senderMenu, selectedItem, index)
    {
        generateClothSubMenu(index);
    });
}

function generateClothSubMenu(index)
{    
    var drawableIdItem = API.createListItem("Drawable ID", " ", resource.SkinSelector.numberToList(API.returnNative("GET_NUMBER_OF_PED_DRAWABLE_VARIATIONS", 0, API.getLocalPlayer(), componentIdList[index])), 0);
    clothMenuItemsAndSubMenus[0][index].AddItem(drawableIdItem);
    var textureItem = API.createListItem("Texture ID", " ", resource.SkinSelector.numberToList(63), 0);
    clothMenuItemsAndSubMenus[0][index].AddItem(textureItem);

    drawableIdItem.OnListChanged.connect(function (menuListItem, newIndex)
    {
        //API.sendChatMessage("~r~SLOT: ~w~" + componentIdList[clothMainMenu.CurrentSelection] + " ~g~ID: ~w~" + newIndex + " ~b~TEX VARS: ~w~" + API.returnNative("GET_NUMBER_OF_PED_TEXTURE_VARIATIONS", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection], newIndex) + "~y~ PALETE VARS: ~w~" + API.returnNative("GET_PED_PALETTE_VARIATION", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection]));
        API.returnNative("SET_PED_COMPONENT_VARIATION", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection], newIndex, textureItem.Index, 0);
    });

    textureItem.OnListChanged.connect(function (menuListItem, newIndex)
    {
        var currentDrawable = API.returnNative("GET_PED_DRAWABLE_VARIATION", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection]);
        API.sendChatMessage("~y~Is valid: ~w~" + API.returnNative("IS_PED_COMPONENT_VARIATION_VALID", 8, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection], currentDrawable, textureItem.Index));
        if (newIndex > API.returnNative("GET_NUMBER_OF_PED_TEXTURE_VARIATIONS", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection], currentDrawable))
        {
            menuListItem.Index = 0;
        }
        API.returnNative("SET_PED_COMPONENT_VARIATION", 0, API.getLocalPlayer(), componentIdList[clothMainMenu.CurrentSelection], currentDrawable, textureItem.Index, 0);
    });
}


API.onServerEventTrigger.connect(function (name, args)
{
    if (name == "cloth_selector")
    {
        menuPool.CloseAllMenus();
        clothMainMenu.Visible = true;
    }
    if (name == "set_cam")
    {
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

function setCam(id: number)
{
    var currentPos = API.getEntityPosition(API.getLocalPlayer());
    var currentRot = API.getEntityRotation(API.getLocalPlayer());
    var rot = (currentRot.Z * 0.174533) / 10;
    if (currentRot.Z < 0)
    {
        rot = ((360 + currentRot.Z) * 0.174533) / 10;
    } 
    switch (id)
    {
        case 0:
            API.setActiveCamera(null);
            break;
        case 1:
            currentPos.X += Math.sin(rot)*-1;
            currentPos.Y += Math.cos(rot);
            currentPos.Z += 1;
            mainCam = API.createCamera(currentPos, new Vector3());
            API.pointCameraAtEntityBone(mainCam, API.getLocalPlayer(), 31086, new Vector3());
            API.setActiveCamera(mainCam);
            break;
        case 2:
            currentPos.X += 2.5*Math.sin(rot)*-1;
            currentPos.Y += 2.5*Math.cos(rot);
            currentPos.Z += 0.5;
            mainCam = API.createCamera(currentPos, new Vector3());
            API.pointCameraAtEntity(mainCam, API.getLocalPlayer(), new Vector3());
            API.setActiveCamera(mainCam);
            break;


    }
};