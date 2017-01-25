﻿using System;
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
        int[] maleHairId = { 0, 1, 2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 };
        string[] menuItemsKeys = { "SK_SEL_Цвет волос", "SK_SEL_Оттенок волос", "SK_SEL_Брови", "SK_SEL_Волосы на лице", "SK_SEL_Дефекты кожи", "SK_SEL_Старение кожи", "SK_SEL_Тип кожи", "SK_SEL_Родинки и веснушки", "SK_SEL_Повреждения кожи", "SK_SEL_Цвет глаз", "SK_SEL_Макияж глаз", "SK_SEL_Румяна", "SK_SEL_Помада" };
        string[] menuItemsValues = { "GTAO_HAIR_COLOR", "GTAO_HAIR_HIGHLIGHT_COLOR", "GTAO_EYEBROWS", "GTAO_FACIAL_HAIR", "GTAO_BLEMISHES", "GTAO_AGEING", "GTAO_COMPLEXION", "GTAO_FRECKLES", "GTAO_SUN_DAMAGE", "GTAO_EYE_COLOR", "GTAO_MAKEUP", "GTAO_BLUSH", "GTAO_LIPSTICK" };
        Dictionary<string, string> menuDictionary = new Dictionary<string, string>();

        public SkinSelector()
        {
            API.onPlayerFinishedDownload += OnPlayerFinishedDownloadHandler;
            API.onClientEventTrigger += OnClientFaceChange;
            for (int i=0; i < menuItemsKeys.Length; i++)
            {
                menuDictionary.Add(menuItemsKeys[i], menuItemsValues[i]);
            }
        }

        private void OnPlayerFinishedDownloadHandler(Client player)
        {
            //API.setPlayerSkin(player, (PedHash)1885233650);
            API.exported.gtaocharacter.initializePedFace(player.handle);
            API.setPlayerSkin(player, (PedHash)API.getEntitySyncedData(player, "GTAO_PLAYER_MODEL"));
            API.sendNativeToPlayer(player, 0x45EEE61580806D63, player.handle);
            API.exported.gtaocharacter.updatePlayerFace(player.handle);
        }

        private void OnClientFaceChange(Client sender, string eventName, object[] argsr)
        {
            string dataToChange;
            menuDictionary.TryGetValue(eventName, out dataToChange);
            if (dataToChange != null)
            {
                API.sendChatMessageToPlayer(sender, "~r~Data to change: " + dataToChange);
                API.setEntitySyncedData(sender, dataToChange, argsr[0]);
                API.exported.gtaocharacter.updatePlayerFace(sender.handle);
                return;
            }
            if (eventName == "SK_SEL_Пол") { API.sendChatMessageToPlayer(sender, "ЖОПА"); }
            API.sendChatMessageToPlayer(sender, "~r~Data to change: " + dataToChange + " ~w~Event name: ~g~" + eventName);
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
                case "SK_SEL_Лицо":
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
                case "SK_SEL_Кожа":
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
                    API.sendChatMessageToPlayer(sender, "~r~SK_SEL_Пол Event triggered");
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
                    if (API.getEntitySyncedData(sender,"GTAO_PLAYER_MODEL") == -1667301416)
                    {
                        API.setEntitySyncedData(sender, "GTAO_HAIR_STYLE", femaleHairId[(int)argsr[0]]);
                    } else
                    {
                        API.setEntitySyncedData(sender, "GTAO_HAIR_STYLE", maleHairId[(int)argsr[0]]);
                    }
                    break;
            }
            API.exported.gtaocharacter.updatePlayerFace(sender.handle);
        }
    }
}
