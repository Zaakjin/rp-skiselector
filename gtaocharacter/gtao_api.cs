using System;
using System.Linq;
using System.Collections.Generic;
using GTANetworkServer;
using GTANetworkShared;

public class GTAOnlineCharacter : Script
{
	// Exported

	public void initializePedFace(NetHandle ent)
	{
		API.setEntitySyncedData(ent, "GTAO_HAS_CHARACTER_DATA", true);

        
        //API.setEntitySyncedData(ent, "GTAO_PLAYER_MODEL", 1885233650);
        //Inheritance
        API.setEntitySyncedData(ent, "GTAO_PLAYER_MODEL", -1667301416);
		API.setEntitySyncedData(ent, "GTAO_SHAPE_FIRST_ID", 0);
        API.setEntitySyncedData(ent, "GTAO_SHAPE_SECOND_ID", 0);
        API.setEntitySyncedData(ent, "GTAO_SKIN_FIRST_ID", 0);
        API.setEntitySyncedData(ent, "GTAO_SKIN_SECOND_ID", 0);
        API.setEntitySyncedData(ent, "GTAO_SHAPE_MIX", 0f);
        API.setEntitySyncedData(ent, "GTAO_SKIN_MIX", 0f);
        //Appearance --
        //--Hairstyle
        API.setEntitySyncedData(ent, "GTAO_HAIR_STYLE", 0);
        API.setEntitySyncedData(ent, "GTAO_HAIR_COLOR", 0);
        API.setEntitySyncedData(ent, "GTAO_HAIR_HIGHLIGHT_COLOR", 0);
        API.setEntitySyncedData(ent, "GTAO_EYEBROWS", 0);
        API.setEntitySyncedData(ent, "GTAO_FACIAL_HAIR", 0);
        //Appearance
        API.setEntitySyncedData(ent, "GTAO_BLEMISHES", 0);
        API.setEntitySyncedData(ent, "GTAO_AGEING", 0);
        API.setEntitySyncedData(ent, "GTAO_COMPLEXION", 0);
        API.setEntitySyncedData(ent, "GTAO_FRECKLES", 0);
        API.setEntitySyncedData(ent, "GTAO_SUN_DAMAGE", 0);
        API.setEntitySyncedData(ent, "GTAO_EYE_COLOR", 0);
        //API.setEntitySyncedData(ent, "GTAO_MAKEUP", 0); // No lipstick by default. 
        //API.setEntitySyncedData(ent, "GTAO_MAKEUP", 0);
        API.setEntitySyncedData(ent, "GTAO_BLUSH", 0);
        //API.setEntitySyncedData(ent, "GTAO_LIPSTICK", 0); // No makeup by default.
        
        API.setEntitySyncedData(ent, "GTAO_EYEBROWS_COLOR", 0);
        API.setEntitySyncedData(ent, "GTAO_MAKEUP_COLOR", 0);
        API.setEntitySyncedData(ent, "GTAO_LIPSTICK_COLOR", 0);
        API.setEntitySyncedData(ent, "GTAO_EYEBROWS_COLOR2", 0);
        API.setEntitySyncedData(ent, "GTAO_MAKEUP_COLOR2", 0);
        API.setEntitySyncedData(ent, "GTAO_LIPSTICK_COLOR2", 0);

        var list = new float[21];

        for (var i = 0; i < 21; i++) {
            list[i] = 0f;
        }

        API.setEntitySyncedData(ent, "GTAO_FACE_FEATURES_LIST", list);
	}

	public void removePedFace(NetHandle ent)
	{
		API.setEntitySyncedData(ent, "GTAO_HAS_CHARACTER_DATA", false);
        //Inheritance
        API.resetEntitySyncedData(ent, "GTAO_PLAYER_MODEL");
		API.resetEntitySyncedData(ent, "GTAO_SHAPE_FIRST_ID");
        API.resetEntitySyncedData(ent, "GTAO_SHAPE_SECOND_ID");
        API.resetEntitySyncedData(ent, "GTAO_SKIN_FIRST_ID");
        API.resetEntitySyncedData(ent, "GTAO_SKIN_SECOND_ID");
        API.resetEntitySyncedData(ent, "GTAO_SHAPE_MIX");
        API.resetEntitySyncedData(ent, "GTAO_SKIN_MIX");
        //Appearance
        //--Hairstyle
        API.resetEntitySyncedData(ent, "GTAO_HAIR_STYLE");
        API.resetEntitySyncedData(ent, "GTAO_HAIR_COLOR");
        API.resetEntitySyncedData(ent, "GTAO_HAIR_HIGHLIGHT_COLOR");
        API.resetEntitySyncedData(ent, "GTAO_EYEBROWS");
        API.resetEntitySyncedData(ent, "GTAO_FACIAL_HAIR");
        //Appearance
        API.resetEntitySyncedData(ent, "GTAO_BLEMISHES");
        API.resetEntitySyncedData(ent, "GTAO_AGEING");
        API.resetEntitySyncedData(ent, "GTAO_COMPLEXION");
        API.resetEntitySyncedData(ent, "GTAO_FRECKLES");
        API.resetEntitySyncedData(ent, "GTAO_SUN_DAMAGE");
        API.resetEntitySyncedData(ent, "GTAO_EYE_COLOR");
        API.resetEntitySyncedData(ent, "GTAO_MAKEUP");
        API.resetEntitySyncedData(ent, "GTAO_BLUSH");
        API.resetEntitySyncedData(ent, "GTAO_LIPSTICK");

        API.resetEntitySyncedData(ent, "GTAO_EYEBROWS_COLOR");
        API.resetEntitySyncedData(ent, "GTAO_MAKEUP_COLOR");
        API.resetEntitySyncedData(ent, "GTAO_LIPSTICK_COLOR");
        API.resetEntitySyncedData(ent, "GTAO_EYEBROWS_COLOR2");
        API.resetEntitySyncedData(ent, "GTAO_MAKEUP_COLOR2");
        API.resetEntitySyncedData(ent, "GTAO_LIPSTICK_COLOR2");
        
        API.resetEntitySyncedData(ent, "GTAO_FACE_FEATURES_LIST");
	}

    
    //TODO
	public bool isPlayerFaceValid(NetHandle ent)
	{
		if (!API.hasEntitySyncedData(ent, "GTAO_SHAPE_FIRST_ID")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_SHAPE_SECOND_ID")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_SKIN_FIRST_ID")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_SKIN_SECOND_ID")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_SHAPE_MIX")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_SKIN_MIX")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_HAIR_STYLE")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_HAIR_COLOR")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_HAIR_HIGHLIGHT_COLOR")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_EYE_COLOR")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_EYEBROWS")) return false;
        //if (!API.hasEntitySyncedData(ent, "GTAO_MAKEUP")) return false; // Player may have no makeup
        //if (!API.hasEntitySyncedData(ent, "GTAO_LIPSTICK")) return false; // Player may have no lipstick
        if (!API.hasEntitySyncedData(ent, "GTAO_EYEBROWS_COLOR")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_MAKEUP_COLOR")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_LIPSTICK_COLOR")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_EYEBROWS_COLOR2")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_MAKEUP_COLOR2")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_LIPSTICK_COLOR2")) return false;
        if (!API.hasEntitySyncedData(ent, "GTAO_FACE_FEATURES_LIST")) return false;

        return true;
	}

	public void updatePlayerFace(NetHandle player)
	{
		API.triggerClientEventForAll("UPDATE_CHARACTER", player);
	}
}