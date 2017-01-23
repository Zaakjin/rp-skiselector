"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
var menuPool = null;
var skinMenuMain = null;
var skinMenuHair = null;

var maleHairStyleListItem = null;
var femaleHairStyleListItem = null;

var shapeVariants = ["Похож(а) на мать", "50/50", "Похож(а) на отца"];
var skinBlendVariants = ["Как у матери", "50/50", "Как у отца"];
var genderVariants = ["Мужской", "Женский"];
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
    //MAIN MENU
    skinMenuMain = API.createMenu("Выбор внешности", " ", 0, 0, 2);
    var faceList = new List(String);
    var shapeList = new List(String);
    var blendList = new List(String);
    var genderList = new List(String);
    for (var i = 0; i < 46; i++) {
        faceList.Add(i.toString());
    }
    for (var i = 0; i < skinBlendVariants.length; i++) {
        shapeList.Add(shapeVariants[i]);
    }
    for (var i = 0; i < skinBlendVariants.length; i++) {
        blendList.Add(skinBlendVariants[i]);
    }
    for (var i = 0; i < genderVariants.length; i++) {
        genderList.Add(genderVariants[i]);
    }
    var motherListItem = API.createListItem("Мать", "", faceList, 0);
    var fatherListItem = API.createListItem("Отец", "", faceList, 0);
    var shapeListItem = API.createListItem("Лицо", "", shapeList, 0);
    var blendListItem = API.createListItem("Кожа", "", blendList, 0);
    var genderListItem = API.createListItem("Пол", "", genderList, 0);
    var hairMenuItem = API.createMenuItem("Волосы", "");
    createSkinMenuHair();
    skinMenuMain.BindMenuToItem(skinMenuHair, hairMenuItem);
    skinMenuMain.AddItem(motherListItem);
    skinMenuMain.AddItem(fatherListItem);
    skinMenuMain.AddItem(shapeListItem);
    skinMenuMain.AddItem(blendListItem);
    skinMenuMain.AddItem(genderListItem);
    skinMenuMain.AddItem(hairMenuItem);
    skinMenuMain.OnListChange.connect(function (sender, listItem, newIndex) {
        API.triggerServerEvent(listItem.Text, newIndex);
        if (listItem.Text == "Пол") {
            skinMenuHair.RemoveItemAt(0);
            if (newIndex == 0) {
                skinMenuHair.InsertItem(maleHairStyleListItem, 0);
            }
            else {
                skinMenuHair.InsertItem(femaleHairStyleListItem, 0);
            }
        };
    });

    menuPool.Add(skinMenuMain);
    skinMenuMain.Visible = false; 
};

function createSkinMenuHair() {
    skinMenuHair = API.createMenu("Волосы", "", 0, 0, 2);
    maleHairStyleListItem = API.createListItem("Стиль волос", "", numberToList(37) , 0);
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

function numberToList(maxId: number) {
    var returnList = new List(String);
    for (var i = 1; i < maxId+1; i++) {
        returnList.Add(i.toString());
    }
    return returnList;
};

API.onKeyDown.connect(function (Player, args) {
    if (args.KeyCode == Keys.E && !API.isChatOpen()) {
        if (!menuPool.IsAnyMenuOpen()) {
            skinMenuMain.CurrentSelection = 0;
            skinMenuHair.CurrentSelection = 0;
            skinMenuMain.Visible = true;
        }
    }
});