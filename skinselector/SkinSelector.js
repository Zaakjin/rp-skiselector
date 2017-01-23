"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
var menuPool = null;
var skinMenuMain = null;
var skinMenuHair = null;
var maleHairStyleListItem = null;
var femaleHairStyleListItem = null;
var mainMenuTextItems = ["Наследственность", "Характеристики", "Внешность", "Одежда"];
var shapeVariants = ["Похож(а) на мать", "50/50", "Похож(а) на отца"];
var skinBlendVariants = ["Как у матери", "50/50", "Как у отца"];
var genderVariants = ["Мужской", "Женский"];
var inheritanceMenuItems = [["Мама", numberToList(45)], ["Папа", numberToList(45)], ["Внешний вид", arrayToList(shapeVariants)], ["Цвет кожи", arrayToList(shapeVariants)]];
API.onUpdate.connect(function () {
    if (menuPool != null) {
        menuPool.ProcessMenus();
    }
});
API.onResourceStart.connect(function () {
    menuPool = API.getMenuPool();
    createSkinMainMenu();
});
function createSkinMainMenu() {
    skinMenuMain = API.createMenu("Редактор персонажа", " ", 0, 0, 2);
    var menuMainItemsArray = [];
    for (var _i = 0, mainMenuTextItems_1 = mainMenuTextItems; _i < mainMenuTextItems_1.length; _i++) {
        var item = mainMenuTextItems_1[_i];
        menuMainItemsArray.push(createSubMenu(skinMenuMain, "Редактор персонажа", item, 2));
    }
    ;
    fillMenuWithListItems(menuMainItemsArray[0], inheritanceMenuItems);
    menuPool.Add(skinMenuMain);
    skinMenuMain.Visible = false;
}
;
function fillMenuWithListItems(menu, itemArray) {
    for (var i = 0; i < itemArray.length; i++) {
        menu.AddItem(API.createListItem(itemArray[i][0], "", itemArray[i][1], 0));
    }
}
;
function createSubMenu(menuUI, subMenuTitle, subMenuName, anchorPoint) {
    var newMenu = API.createMenu(subMenuTitle, subMenuName, 0, 0, anchorPoint);
    menuPool.Add(newMenu);
    var newMenuItem = API.createMenuItem(subMenuName, "");
    newMenuItem.SetRightLabel("< XYZ >");
    menuUI.AddItem(newMenuItem);
    menuUI.BindMenuToItem(newMenu, newMenuItem);
    return newMenu;
}
;
function createSkinMenuHair() {
    skinMenuHair = API.createMenu("Волосы", "", 0, 0, 2);
    maleHairStyleListItem = API.createListItem("Стиль волос", "", numberToList(37), 0);
    femaleHairStyleListItem = API.createListItem("Стиль волос", "", numberToList(39), 0);
    var hairColorListItem = API.createListItem("Цвет волос", "", numberToList(64), 0);
    var hairHighlightColorListItem = API.createListItem("Оттенок волос", "", numberToList(64), 0);
    var eyebrowsStyleListItem = API.createListItem("Брови", "", numberToList(34), 0);
    if (API.getEntityModel(API.getLocalPlayer()) == 1885233650) {
        skinMenuHair.AddItem(maleHairStyleListItem);
    }
    else if (API.getEntityModel(API.getLocalPlayer()) == -1667301416) {
        skinMenuHair.AddItem(femaleHairStyleListItem);
    }
    skinMenuHair.AddItem(hairColorListItem);
    skinMenuHair.AddItem(hairHighlightColorListItem);
    skinMenuHair.AddItem(eyebrowsStyleListItem);
    skinMenuHair.OnListChange.connect(function (sender, listItem, newIndex) {
        //API.sendChatMessage("~r~_GET_NUM_HEAD_OVERLAY_VALUES:~w~ " + API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 2));
        //.callNative("SET_PED_COMPONENT_VARIATION", API.getLocalPlayer(), 2, newIndex, 0, 0);
        API.triggerServerEvent(listItem.Text, newIndex);
    });
    skinMenuHair.OnItemSelect.connect(function (sender, listItem, newIndex) {
    });
    menuPool.Add(skinMenuHair);
}
function numberToList(maxId) {
    var returnList = new List(String);
    for (var i = 0; i <= maxId; i++) {
        returnList.Add(i.toString());
    }
    return returnList;
}
;
function arrayToList(array) {
    var newList = new List(String);
    for (var i = 0; i < array.length; i++) {
        newList.Add(array[i]);
    }
    return newList;
}
;
API.onKeyDown.connect(function (Player, args) {
    if (args.KeyCode == Keys.E && !API.isChatOpen()) {
        if (!menuPool.IsAnyMenuOpen()) {
            skinMenuMain.CurrentSelection = 0;
            //skinMenuHair.CurrentSelection = 0;
            skinMenuMain.Visible = true;
        }
    }
});
