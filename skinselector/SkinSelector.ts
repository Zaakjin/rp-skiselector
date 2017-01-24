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
var inheritanceMenuItems = [["Мама", 		numberToList(45)], 
							["Папа", 		numberToList(45)], 
							["Внешний вид", arrayToList(shapeVariants)], 
							["Цвет кожи", 	arrayToList(shapeVariants)]];
							
var characteristicsMenuItems = [["Лоб", 				numberToList(10)], 
								["Глаза", 				numberToList(10)], 
								["Нос", 				numberToList(10)], 
								["Профиль носа", 		numberToList(10)], 
								["Кончик носа", 		numberToList(10)], 
								["Скулы", 				numberToList(10)], 
								["Щеки", 				numberToList(10)], 
								["Губы", 				numberToList(10)], 
								["Челюсть", 			numberToList(10)], 
								["Профиль подбородка", 	numberToList(10)]];
								
var appearanceMenuItems = [	["Прическа", 			numberToList(10)],
							["Цвет волос", 			numberToList(10)],
							["Оттенок волос", 		numberToList(10)],
							["Брови", 				numberToList(10)],
							["Волосы на лице", 		numberToList(10)],
							["Дефекты кожи", 		numberToList(10)],
							["Старение кожи", 		numberToList(10)],
							["Тип кожи", 			numberToList(10)],
							["Родинки и веснушки",	numberToList(10)],
							["Повреждения кожи", 	numberToList(10)],
							["Цвет глаз", 			numberToList(10)],
							["Макияж глаз", 		numberToList(10)],
							["Румяна", 				numberToList(10)],
							["Помада", 				numberToList(10)]];
							
var appearanceMenuHairstyleVariants = ["Под ноль", "Коротко", "Слои", "Косички", "Хвост", "Ирокез", "Косички", "Боб", "Ястреб", "Ракушка", "Лонг боб", "Свободно", "Пикси", "Подбритые виски", "Узел", "Волнистый боб", "Красотка", "Пучок", "Флэппер боб", "Тугой узел", "Одуванчик", "Взрыв", "Узел", "Сколотые косички", "Косички-листья", "Косички-зигзаги", "Хвостики с челкой", "Косички-волны", "Косички-завитки", "Челка-валик", "Растрепанный зачес назад", "Подстриженный зачес назад", "Подстриженный зачес набок", "Шипастый ирокез", "Банда и косички", "Челси", "Стиляга со слоями"];
							
var clothesMenuItems = [["Стиль",			numberToList(10)],
						["Одежда", 			numberToList(10)],
						["Головной убор", 	numberToList(10)],
						["Очки", 			numberToList(10)]];

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
    for (var item of mainMenuTextItems) {
        menuMainItemsArray.push(createSubMenu(skinMenuMain, "Редактор персонажа", item, 2));
    };
    var subMenuArray = [inheritanceMenuItems, characteristicsMenuItems, appearanceMenuItems, clothesMenuItems];
    for (var i = 0; i < menuMainItemsArray.length; i++) {
        fillMenuWithListItems(menuMainItemsArray[i], subMenuArray[i]);
    };
    
    menuPool.Add(skinMenuMain);
    skinMenuMain.Visible = false;
};

function fillMenuWithListItems(menu: any,itemArray: any[]) {
    for (var i = 0; i < itemArray.length; i++) {
        menu.AddItem(API.createListItem(itemArray[i][0], "", itemArray[i][1], 0));
        
    }
};

function createSubMenu(menuUI: any, subMenuTitle: string, subMenuName: string, anchorPoint: any) {
    var newMenu = API.createMenu(subMenuTitle, subMenuName, 0, 0, anchorPoint);
    menuPool.Add(newMenu);
    var newMenuItem = API.createMenuItem(subMenuName, "");
    newMenuItem.SetRightLabel("< XYZ >");
    menuUI.AddItem(newMenuItem);
    menuUI.BindMenuToItem(newMenu, newMenuItem);
    return newMenu;
};

function createSkinMenuHair() {
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
    for (var i = 0; i <= maxId; i++) {
        returnList.Add(i.toString());
    }
    return returnList;
};

function arrayToList(array: string[]) {
    var newList = new List(String);
    for (var i = 0; i < array.length; i++) {
        newList.Add(array[i]);
    }
    return newList;
};

API.onKeyDown.connect(function (Player, args) {
    if (args.KeyCode == Keys.E && !API.isChatOpen()) {
        if (!menuPool.IsAnyMenuOpen()) {
            skinMenuMain.CurrentSelection = 0;
            //skinMenuHair.CurrentSelection = 0;
            skinMenuMain.Visible = true;
        }
    }
});