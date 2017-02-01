using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace skinselector
{
    public class SkinSelector : Script
    {
        int[] femaleHairId = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38 };
        int[] maleHairId = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 };
        string[] menuItemsKeysSameValue = { "SK_SEL_Цвет волос", "SK_SEL_Оттенок волос", "SK_SEL_Брови", "SK_SEL_Цвет бровей", "SK_SEL_Оттенок бровей", "SK_SEL_Цвет волос на лице", "SK_SEL_Цвет румян", "SK_SEL_Цвет помады" };
        string[] menuItemsValuesSameValue = { "GTAO_HAIR_COLOR", "GTAO_HAIR_HIGHLIGHT_COLOR", "GTAO_EYEBROWS", "GTAO_EYEBROWS_COLOR", "GTAO_EYEBROWS_COLOR2", "GTAO_FACIAL_HAIR_COLOR", "GTAO_BLUSH_COLOR", "GTAO_LIPSTICK_COLOR" };
        string[] menuItemsKeysMinusValue = { "SK_SEL_Волосы на лице", "SK_SEL_Дефекты кожи", "SK_SEL_Старение кожи", "SK_SEL_Тип кожи", "SK_SEL_Родинки и веснушки", "SK_SEL_Повреждения кожи", "SK_SEL_Цвет глаз", "SK_SEL_Макияж глаз", "SK_SEL_Румяна", "SK_SEL_Помада" };
        string[] menuItemsValuesMinusValue = { "GTAO_FACIAL_HAIR", "GTAO_BLEMISHES", "GTAO_AGEING", "GTAO_COMPLEXION", "GTAO_FRECKLES", "GTAO_SUN_DAMAGE", "GTAO_EYE_COLOR", "GTAO_MAKEUP", "GTAO_BLUSH", "GTAO_LIPSTICK" };

        string[] fieldsToLoad = { "GTAO_SHAPE_FIRST_ID", "GTAO_SHAPE_SECOND_ID", "GTAO_SKIN_FIRST_ID", "GTAO_SKIN_SECOND_ID", "GTAO_SHAPE_MIX", "GTAO_SKIN_MIX", "GTAO_HAIR_COLOR", "GTAO_HAIR_HIGHLIGHT_COLOR", "GTAO_EYE_COLOR", "GTAO_EYEBROWS", "GTAO_MAKEUP", "GTAO_LIPSTICK", "GTAO_EYEBROWS_COLOR", "GTAO_LIPSTICK_COLOR", "GTAO_EYEBROWS_COLOR2",  /*"GTAO_HAS_CHARACTER_DATA",*/ "GTAO_PLAYER_MODEL", "GTAO_HAIR_STYLE", "GTAO_FACIAL_HAIR", "GTAO_FACIAL_HAIR_COLOR", "GTAO_BLEMISHES", "GTAO_AGEING", "GTAO_COMPLEXION", "GTAO_FRECKLES", "GTAO_SUN_DAMAGE", "GTAO_BLUSH", "GTAO_BLUSH_COLOR" };/*,"GTAO_FACE_FEATURES_LIST" };*/
        Dictionary<string, string> menuDictionarySameValue = new Dictionary<string, string>();
        Dictionary<string, string> menuDictionaryMinusValue = new Dictionary<string, string>();

        public SkinSelector()
        {
            API.onPlayerFinishedDownload += OnPlayerFinishedDownloadHandler;
            API.onClientEventTrigger += OnClientFaceChange;
            API.onPlayerDisconnected += onPlayerDisconnectedHandler;
            for (int i = 0; i < menuItemsKeysSameValue.Length; i++)
            {
                menuDictionarySameValue.Add(menuItemsKeysSameValue[i], menuItemsValuesSameValue[i]);
            }
            for (int i = 0; i < menuItemsKeysMinusValue.Length; i++)
            {
                menuDictionaryMinusValue.Add(menuItemsKeysMinusValue[i], menuItemsValuesMinusValue[i]);
            }
        }

        private void onPlayerDisconnectedHandler(Client player, string reason)
        {
            savePlayerFace(player);
        }

        private void OnPlayerFinishedDownloadHandler(Client player)
        {
            //API.setPlayerSkin(player, (PedHash)1885233650);
            API.exported.gtaocharacter.initializePedFace(player.handle);
            loadPlayerFace(player);
            API.setPlayerSkin(player, (PedHash)API.getEntitySyncedData(player, "GTAO_PLAYER_MODEL"));
            //DEBUG
            API.consoleOutput(">>>>>>>>>>>>>>>>>>>>>>>>");
            API.sendNativeToPlayer(player, 0x45EEE61580806D63, player.handle);
            API.exported.gtaocharacter.updatePlayerFace(player.handle);
        }

        public void loadPlayerFace(Client player)
        {
            Dictionary<String, System.Object> loadedData = API.exported.DbController.LoadPlayerDataFromTable(player, "user_skins", fieldsToLoad.ToList());
            if (loadedData.Count > 0)
            {
                foreach (KeyValuePair<String, System.Object> item in loadedData)
                {
                    //DEBUG
                    API.consoleOutput(item.Key + "-----" + item.Value.GetType().ToString() + ">>>" + item.Value);
                    API.setEntitySyncedData(player, item.Key, item.Value.GetType() == new Int64().GetType() ? Convert.ToInt32(item.Value) : item.Value.GetType() == new Double().GetType() ? Convert.ToSingle(item.Value) : item.Value);
                    var data = API.getEntitySyncedData(player, item.Key);
                    //DEBUG
                    API.consoleOutput(item.Key + "-----" + data.GetType() + "$$$$" + data);

                }
            }
        }

        public void savePlayerFace(Client player)
        {
            Dictionary<String, System.Object> dic = new Dictionary<String, System.Object>();
            var keys = API.getAllEntitySyncedData(player);
            foreach (var key in keys)
            {
                if (key.Contains("GTAO_") && !key.Contains("FEATURES_LIST"))
                {
                    var data = API.getEntitySyncedData(player, key);
                    //DEBUG
                    API.consoleOutput(key + "-----" + data.GetType() + "<<<<" + data);
                    dic.Add(key, API.getEntitySyncedData(player, key));
                }
            }
            //TODO сделать обрабоку FACE_FEATURE_LIST
            API.exported.DbController.SavePlayerDataToTable(player, "user_skins", dic);
        }

        private void OnClientFaceChange(Client sender, string eventName, object[] argsr)
        {
            if (eventName.Contains("SK_SEL_"))
            {
                string dataToChange;
                menuDictionarySameValue.TryGetValue(eventName, out dataToChange);
                if (dataToChange != null)
                {
                    API.setEntitySyncedData(sender, dataToChange, argsr[0]);
                    API.exported.gtaocharacter.updatePlayerFace(sender.handle);
                    return;
                }
                menuDictionaryMinusValue.TryGetValue(eventName, out dataToChange);
                if (dataToChange != null)
                {
                    var temp = Int32.Parse(argsr[0].ToString()) - 1;
                    API.setEntitySyncedData(sender, dataToChange, temp);
                    API.exported.gtaocharacter.updatePlayerFace(sender.handle);
                    return;
                }
                switch (eventName)
                {
                    case "SK_SEL_Мать":
                        API.setEntitySyncedData(sender, "GTAO_SHAPE_FIRST_ID", argsr[0]);
                        API.setEntitySyncedData(sender, "GTAO_SKIN_FIRST_ID", argsr[0]);
                        break;
                    case "SK_SEL_Отец":
                        API.setEntitySyncedData(sender, "GTAO_SHAPE_SECOND_ID", argsr[0]);
                        API.setEntitySyncedData(sender, "GTAO_SKIN_SECOND_ID", argsr[0]);
                        break;
                    case "SK_SEL_Внешний вид":
                        switch ((int)argsr[0])
                        {
                            case 0:
                                API.setEntitySyncedData(sender, "GTAO_SHAPE_MIX", 0.30f);
                                break;
                            case 1:
                                API.setEntitySyncedData(sender, "GTAO_SHAPE_MIX", 0.50f);
                                break;
                            case 2:
                                API.setEntitySyncedData(sender, "GTAO_SHAPE_MIX", 0.70f);
                                break;
                        }
                        break;
                    case "SK_SEL_Цвет кожи":
                        switch ((int)argsr[0])
                        {
                            case 0:
                                API.setEntitySyncedData(sender, "GTAO_SKIN_MIX", 0.30f);
                                break;
                            case 1:
                                API.setEntitySyncedData(sender, "GTAO_SKIN_MIX", 0.50f);
                                break;
                            case 2:
                                API.setEntitySyncedData(sender, "GTAO_SKIN_MIX", 0.70f);
                                break;

                        }
                        break;
                    case "SK_SEL_Пол":
                        switch ((int)argsr[0])
                        {
                            case 0:
                                API.setEntitySyncedData(sender, "GTAO_PLAYER_MODEL", 1885233650);
                                break;
                            case 1:
                                API.setEntitySyncedData(sender, "GTAO_PLAYER_MODEL", -1667301416);
                                break;
                        }
                        API.setPlayerSkin(sender, (PedHash)API.getEntitySyncedData(sender, "GTAO_PLAYER_MODEL"));
                        break;
                    case "SK_SEL_Прическа":
                        if (API.getEntitySyncedData(sender, "GTAO_PLAYER_MODEL") == -1667301416)
                        {
                            API.setEntitySyncedData(sender, "GTAO_HAIR_STYLE", femaleHairId[(int)argsr[0]]);
                        }
                        else
                        {
                            API.setEntitySyncedData(sender, "GTAO_HAIR_STYLE", maleHairId[(int)argsr[0]]);
                        }
                        break;
                }
                API.exported.gtaocharacter.updatePlayerFace(sender.handle);
            }
        }
    }
}
