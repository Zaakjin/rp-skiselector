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
        public SkinSelector()
        {
            API.onPlayerFinishedDownload += OnPlayerFinishedDownloadHandler;
            API.onClientEventTrigger += OnClientFaceChange;
            API.onClientEventTrigger += OnClientHairChange;
        }

        private void OnPlayerFinishedDownloadHandler(Client player)
        {
            //API.setPlayerSkin(player, (PedHash)1885233650);
            API.exported.gtaocharacter.initializePedFace(player.handle);
            API.setPlayerSkin(player, (PedHash)API.getEntitySyncedData(player, "GTAO_PLAYER_MODEL"));
            API.sendNativeToPlayer(player, 0x45EEE61580806D63, player.handle);
            API.exported.gtaocharacter.updatePlayerFace(player.handle);
        }

        [Command("skinblack")]
        public void skinBlack(Client player)
        {
            API.setEntitySyncedData(player, "GTAO_SHAPE_FIRST_ID", 3);
            API.setEntitySyncedData(player, "GTAO_SHAPE_SECOND_ID", 21);
            API.setEntitySyncedData(player, "GTAO_SKIN_FIRST_ID", 3);

            API.exported.gtaocharacter.updatePlayerFace(player.handle);
        }

        private void OnClientFaceChange(Client sender, string eventName, object[] argsr)
        {
            switch (eventName)
            {
                case "Мать":
                    API.setEntitySyncedData(sender, "GTAO_SHAPE_FIRST_ID", argsr[0]);
                    API.setEntitySyncedData(sender, "GTAO_SKIN_FIRST_ID", argsr[0]);
                    break;
                case "Отец":
                    API.setEntitySyncedData(sender, "GTAO_SHAPE_SECOND_ID", argsr[0]);
                    API.setEntitySyncedData(sender, "GTAO_SKIN_SECOND_ID", argsr[0]);
                    break;
                case "Лицо":
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
                case "Кожа":
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
                case "Пол":
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

            }
            API.exported.gtaocharacter.updatePlayerFace(sender.handle);
        }

        private void OnClientHairChange(Client sender, string eventName, object[] argsr)
        {
            switch (eventName)
            {

                case "Стиль волос":
                    API.setEntitySyncedData(sender, "GTAO_HAIR_STYLE", argsr[0]);
                    break;
                case "Цвет волос":
                    API.setEntitySyncedData(sender, "GTAO_HAIR_COLOR", argsr[0]);
                    break;
                case "Оттенок волос":
                    API.setEntitySyncedData(sender, "GTAO_HAIR_HIGHLIGHT_COLOR", argsr[0]);
                    break;
                case "Брови":
                    API.setEntitySyncedData(sender, "GTAO_EYEBROWS", argsr[0]);
                    break;

            }
            API.exported.gtaocharacter.updatePlayerFace(sender.handle);
        }
    }
}
