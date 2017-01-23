using System;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

public class Coords : Script
{
	[Command("coords")]
    public void showCoords(Client player)
    {
        if (API.getEntityData(player, "showCoords")!="true") {
            API.setEntityData(player, "showCoords", "true");
            API.triggerClientEvent(player, "showCoords", "true");
            //API.sendChatMessageToPlayer(player, API.getEntityData(player, "showCoords"));
        }
        else {
            API.setEntityData(player, "showCoords", "false");
            API.triggerClientEvent(player, "showCoords", "false");
            //API.sendChatMessageToPlayer(player, API.getEntityData(player, "showCoords"));
        }
    }
    [Command("tpx")]
    public void tpx(Client player, float x, float y, float z)
    {
        API.setEntityPosition(player, new Vector3(x, y, z));
        API.sendNotificationToPlayer(player, "~g~Teleported~w~");
    }
}
