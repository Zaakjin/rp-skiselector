﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace skinselector
{
    class ClothSelector : Script
    {
        public ClothSelector()
        {
        }

        [Command]
        public void cloth(Client player)//, int slotId, int clothId)
        {
            API.triggerClientEvent(player, "cloth_selector", player);
        }

        [Command]
        public void cam(Client player, int type)//, int slotId, int clothId)
        {
            API.triggerClientEvent(player, "set_cam", type);
        }

        [Command]
        public void rotate (Client player, int type)
        {
            switch (type) {
                case 0:
                    API.setEntityPositionFrozen(player, player.handle, false);
                    API.setEntitySyncedData(player, "ROTATION", false);
                    break;
                case 1:
                    API.setEntityPositionFrozen(player, player.handle, true);
                    API.setEntitySyncedData(player, "ROTATION", true);
                    break;
            }
        }
    }
}
