"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
var menuPool = null;
var skinMenuMain = null;
var skinMenuMainSubMenusAndItems = null;
var inheritanceMenuItems = null;
var characteristicsMenuItems = null;
var appearanceMenuItems = null;
var clothesMenuItems = null;
var skinMenuHair = null;
var SKIN_MENU_NAME = "Редактор персонажа";
//Схема хранения меню для автогенерации [id типа пункта меню (0 Обычная строка с подменю, 
//                                                            1 Строка с выбором < цифр >,
//                                                            2 Строка с выбором <текст>(временно одно и тоже что и id 1), 
//                                                            3 Обычная строка без подменю),
//                                       name название пункта меню,
//                                       items[] массив пунктов меню для id 0 или список вариантов для id 1,2]
var maleHairstyleVariants = ["Под ноль", "Коротко", '"Ястреб"', '"Хипстер"', 'Челка набок', '"Коротко"', '"Байкер"', '"Хвост"', '"Косички"', '"Прилиза"', '"Коротко"', '"Шипы"', '"Цезарь"', '"Чоппи"', 'Дреды', 'Длинные', 'Лохматые кудри', '"Серфингист"', '"Набок"', '"Зализ"', '"Длинные"', '"Юный хипстер"', 'Классические "Косички"', 'Косички - "пальма"', 'Косички - "молнии"', 'Зачесанные наверх косички', 'Косички - зигзаги', 'Косички - "улитки"', 'Хай - топ', 'Растрепанный зачес назад', 'Подстриженны зачес назад', 'Подстриженный зачес набок', 'Шипастый ирокез', '"Стиляга"', '"Стиляга" со слоями'];
var femaleHairstyleVariants = ["Под ноль", "Коротко", "Слои", "Косички", "Хвост", "Ирокез", "Косички", "Боб", "Ястреб", "Ракушка", "Лонг боб", "Свободно", "Пикси", "Подбритые виски", "Узел", "Волнистый боб", "Красотка", "Пучок", "Флэппер боб", "Тугой узел", "Одуванчик", "Взрыв", "Узел", "Сколотые косички", "Косички-листья", "Косички-зигзаги", "Хвостики с челкой", "Косички-волны", "Косички-завитки", "Челка-валик", "Растрепанный зачес назад", "Подстриженный зачес назад", "Подстриженный зачес набок", "Шипастый ирокез", "Банда и косички", "Челси", "Стиляга со слоями"];
var inheritanceMenuStructure = [[1, "Мать", numberToList(45)],
    [1, "Отец", numberToList(45)],
    [1, "Внешний вид", arrayToList(["Похож(а) на мать", "50/50", "Похож(а) на отца"])],
    [1, "Цвет кожи", arrayToList(["Как у матери", "50/50", "Как у отца"])]];
var characteristicsMenuStructure = [[1, "Лоб", numberToList(10)],
    [1, "Глаза", numberToList(10)],
    [1, "Нос", numberToList(10)],
    [1, "Профиль носа", numberToList(10)],
    [1, "Кончик носа", numberToList(10)],
    [1, "Скулы", numberToList(10)],
    [1, "Щеки", numberToList(10)],
    [1, "Губы", numberToList(10)],
    [1, "Челюсть", numberToList(10)],
    [1, "Профиль подбородка", numberToList(10)]];
var appearanceMenuStructure = [[0, "Волосы", function (a) { fillHairstyleMenu(a); }],
    [1, "Дефекты кожи", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 0) - 1, true)],
    [1, "Старение кожи", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 3) - 1, true)],
    [1, "Тип кожи", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 6) - 1, true)],
    [1, "Родинки и веснушки", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 9) - 1, true)],
    [1, "Повреждения кожи", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 7) - 1, true)],
    [1, "Цвет глаз", numberToList(31, true)],
    [1, "Макияж глаз", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 4) - 1, true)],
    [1, "Румяна", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 5) - 1, true)],
    [1, "Цвет румян", numberToList(API.returnNative("_GET_NUM_MAKEUP_COLORS", 0) - 1)],
    [1, "Помада", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 8) - 1, true)],
    [1, "Цвет помады", numberToList(API.returnNative("_GET_NUM_MAKEUP_COLORS", 0) - 1)]];
var clothesMenuStructure = [[1, "Стиль", numberToList(10)],
    [1, "Одежда", numberToList(10)],
    [1, "Головной убор", numberToList(10)],
    [1, "Очки", numberToList(10)]];
var skinMenuStructure = [[2, "Пол", arrayToList(["Мужской", "Женский"])],
    [0, "Наследственность"],
    [0, "Характеристики"],
    [0, "Внешность"],
    [0, "Одежда"]];
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
    skinMenuMain = API.createMenu(SKIN_MENU_NAME, " ", 0, 0, 2);
    skinMenuMainSubMenusAndItems = fillMenuWithListItems(skinMenuMain, skinMenuStructure, SKIN_MENU_NAME);
    inheritanceMenuItems = fillMenuWithListItems(skinMenuMainSubMenusAndItems[0][0], inheritanceMenuStructure, SKIN_MENU_NAME);
    characteristicsMenuItems = fillMenuWithListItems(skinMenuMainSubMenusAndItems[0][1], characteristicsMenuStructure, SKIN_MENU_NAME);
    appearanceMenuItems = fillMenuWithListItems(skinMenuMainSubMenusAndItems[0][2], appearanceMenuStructure, SKIN_MENU_NAME);
    clothesMenuItems = fillMenuWithListItems(skinMenuMainSubMenusAndItems[0][3], clothesMenuStructure, SKIN_MENU_NAME);
    skinMenuMain.OnItemSelect.connect(function (sender, selectedItem, index) {
        if (selectedItem.Text == "Внешность") {
            appearanceMenuRefreshIndexes(inheritanceMenuItems[1]);
        }
        ;
    });
    menuPool.Add(skinMenuMain);
    skinMenuMain.Visible = false;
}
;
function appearanceMenuRefreshIndexes(menuItems) {
    //[[0, "Волосы", function (a) { fillHairstyleMenu(a) }],
    //    [1, "Дефекты кожи", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 0) - 1)],
    //    [1, "Старение кожи", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 3) - 1)],
    //    [1, "Тип кожи", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 6) - 1)],
    //    [1, "Родинки и веснушки", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 9) - 1)],
    //    [1, "Повреждения кожи", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 7) - 1)],
    //    [1, "Цвет глаз", numberToList(30)],//TODO
    //    [1, "Макияж глаз", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 4) - 1)],
    //    [1, "Румяна", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 5) - 1)],
    //    [1, "Помада", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 8) - 1)]];
}
;
function fillHairstyleMenu(newMenu) {
    var hairstyleMenuItems = [[1, "Прическа", (API.getEntityModel(API.getLocalPlayer()) == -1667301416) ? arrayToList(femaleHairstyleVariants) : arrayToList(maleHairstyleVariants)],
        [1, "Цвет волос", numberToList(API.returnNative("_GET_NUM_HAIR_COLORS", 0) - 1)],
        [1, "Оттенок волос", numberToList(API.returnNative("_GET_NUM_HAIR_COLORS", 0) - 1)],
        [1, "Брови", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 2) - 1, true)],
        [1, "Цвет бровей", numberToList(API.returnNative("_GET_NUM_HAIR_COLORS", 0) - 1)],
        [1, "Волосы на лице", numberToList(API.returnNative("_GET_NUM_HEAD_OVERLAY_VALUES", 0, 1) - 1, true)],
        [1, "Цвет волос на лице", numberToList(API.returnNative("_GET_NUM_HAIR_COLORS", 0) - 1)]];
    //[1, "Оттенок волос на лице",numberToList(API.returnNative("_GET_NUM_HAIR_COLORS", 0)-1)]];//Useless
    if (API.getEntityModel(API.getLocalPlayer()) == -1667301416) {
        var femaleHairStyleMenu = hairstyleMenuItems;
        femaleHairStyleMenu.splice(5, 2);
        fillMenuWithListItems(newMenu, femaleHairStyleMenu, SKIN_MENU_NAME);
    }
    else {
        fillMenuWithListItems(newMenu, hairstyleMenuItems, SKIN_MENU_NAME);
    }
}
;
function fillMenuWithListItems(menu, itemArray, title) {
    var createdItems = [];
    var createdSubMenus = [];
    for (var i = 0; i < itemArray.length; i++) {
        switch (itemArray[i][0]) {
            case 0:
                if (typeof itemArray[i][2] === "function") {
                    var newMenuItemAndSubMenu = createSubMenu(menu, title, itemArray[i][1], 2);
                    createdItems.push(newMenuItemAndSubMenu[1]);
                    createdSubMenus.push(newMenuItemAndSubMenu[0]);
                    var functionToBindToMenu = itemArray[i][2];
                    menu.OnItemSelect.connect(function (sender, selectedItem, index) { if (selectedItem == newMenuItemAndSubMenu[1]) {
                        functionToBindToMenu(newMenuItemAndSubMenu[0]);
                    } });
                    newMenuItemAndSubMenu[0].OnMenuClose.connect(function (sender) { newMenuItemAndSubMenu[0].Clear(); });
                    break;
                }
                ;
                var newMenuItemsAndSubMenus = createSubMenu(menu, title, itemArray[i][1], 2);
                createdItems.push(newMenuItemsAndSubMenus[1]);
                createdSubMenus.push(newMenuItemsAndSubMenus[0]);
                break;
            case 1:
                //API.sendChatMessage("~g~Case 1");
                var newMenuListItem = API.createListItem(itemArray[i][1], "", itemArray[i][2], 0);
                newMenuListItem.OnListChanged.connect(function (menuListItem, newIndex) { API.triggerServerEvent("SK_SEL_" + menuListItem.Text, newIndex); });
                //newMenuListItem.OnListChanged.connect(function (menuListItem, newIndex) { API.sendChatMessage("~w~Player changed menu list: ~r~" + menuListItem.Text + " ~w~new index is: ~g~" + newIndex.toString()); });
                createdItems.push(newMenuListItem);
                menu.AddItem(newMenuListItem);
                break;
            case 2:
                //API.sendChatMessage("~b~Case 2");
                //TODO
                var newMenuListItem = API.createListItem(itemArray[i][1], "", itemArray[i][2], 0);
                newMenuListItem.OnListChanged.connect(function (menuListItem, newIndex) { API.triggerServerEvent("SK_SEL_" + menuListItem.Text, newIndex); });
                //newMenuListItem.OnListChanged.connect(function (menuListItem, newIndex) { API.sendChatMessage("~w~Player changed menu list: ~r~" + menuListItem.Text + " ~w~new index is: ~g~" + newIndex.toString()); });
                createdItems.push(newMenuListItem);
                menu.AddItem(newMenuListItem);
                break;
            case 3:
                break;
        }
        ;
    }
    //return createdSubMenus;
    return [createdSubMenus, createdItems];
}
;
//Creates submenu returns created menu
function createSubMenu(menuUI, subMenuTitle, subMenuName, anchorPoint) {
    var newMenu = API.createMenu(subMenuTitle, subMenuName, 0, 0, anchorPoint);
    menuPool.Add(newMenu);
    var newMenuItem = API.createMenuItem(subMenuName, "");
    menuUI.AddItem(newMenuItem);
    menuUI.BindMenuToItem(newMenu, newMenuItem);
    //API.sendChatMessage("~g~" + typeof newMenu);
    //return newMenu
    return [newMenu, newMenuItem];
}
;
//Creates List<> with nubers from 1 to maxId
function numberToList(maxId, defValue) {
    if (defValue === void 0) { defValue = false; }
    var returnList = new List(String);
    if (defValue) {
        returnList.Add("Стандарт");
    }
    for (var i = 0; i <= maxId; i++) {
        returnList.Add(i.toString());
    }
    return returnList;
}
;
//Converts array to List<>
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
            if (API.getEntityModel(API.getLocalPlayer()) == 1885233650) {
                skinMenuMainSubMenusAndItems[1][0].Index = 0;
            }
            else if (API.getEntityModel(API.getLocalPlayer()) == -1667301416) {
                skinMenuMainSubMenusAndItems[1][0].Index = 1;
            }
            ;
            skinMenuMain.CurrentSelection = 0;
            skinMenuMain.Visible = true;
        }
    }
});
