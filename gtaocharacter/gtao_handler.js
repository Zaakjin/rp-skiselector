API.onResourceStart.connect(function () {
    var players = API.getStreamedPlayers();
    for (var i = players.Length - 1; i >= 0; i--) {
        setPedCharacter(players[i]);
    }
});
API.onServerEventTrigger.connect(function (name, args) {
    if (name == "UPDATE_CHARACTER") {
        setPedCharacter(args[0]);
    }
});
API.onEntityStreamIn.connect(function (ent, entType) {
    if (entType == 6 || entType == 8) {
        setPedCharacter(ent);
    }
});
function setPedCharacter(ent) {
    //if (API.getEntitySyncedData(ent, "GTAO_HAS_CHARACTER_DATA") === true) {
    //    //PLAYER MODEL
    //    var playerModel = API.getEntitySyncedData(ent, "GTAO_PLAYER_MODEL");
    //    //TODO перенести на серверную сторону
    //    API.setPlayerSkin(playerModel);
    //    //API.setPlayerSkin(player, (PedHash)playerModel);
    //}
    //API.sendChatMessage("~g~Case 1");
    if (API.isPed(ent) &&
        API.getEntitySyncedData(ent, "GTAO_HAS_CHARACTER_DATA") === true &&
        (API.getEntityModel(ent) == 1885233650 ||
            API.getEntityModel(ent) == -1667301416)) {
        // FACE
        var shapeFirstId = API.getEntitySyncedData(ent, "GTAO_SHAPE_FIRST_ID");
        var shapeSecondId = API.getEntitySyncedData(ent, "GTAO_SHAPE_SECOND_ID");
        var skinFirstId = API.getEntitySyncedData(ent, "GTAO_SKIN_FIRST_ID");
        var skinSecondId = API.getEntitySyncedData(ent, "GTAO_SKIN_SECOND_ID");
        var shapeMix = API.f(API.getEntitySyncedData(ent, "GTAO_SHAPE_MIX"));
        var skinMix = API.f(API.getEntitySyncedData(ent, "GTAO_SKIN_MIX"));
        API.callNative("SET_PED_HEAD_BLEND_DATA", ent, shapeFirstId, shapeSecondId, 0, skinFirstId, skinSecondId, 0, shapeMix, skinMix, 0, false);
        // HAIR STYLE 
        var hairStyle = API.getEntitySyncedData(ent, "GTAO_HAIR_STYLE");
        API.callNative("SET_PED_COMPONENT_VARIATION", ent, 2, hairStyle, 0, 0);
        // HAIR COLOR
        var hairColor = API.getEntitySyncedData(ent, "GTAO_HAIR_COLOR");
        var highlightColor = API.getEntitySyncedData(ent, "GTAO_HAIR_HIGHLIGHT_COLOR");
        API.callNative("_SET_PED_HAIR_COLOR", ent, hairColor, highlightColor);
        // EYEBROWS
        var eyebrowsStyle = API.getEntitySyncedData(ent, "GTAO_EYEBROWS");
        var eyebrowsColor = API.getEntitySyncedData(ent, "GTAO_EYEBROWS_COLOR");
        //var eyebrowsColor2 = API.getEntitySyncedData(ent, "GTAO_EYEBROWS_COLOR2");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 2, eyebrowsStyle, API.f(1));
        API.callNative("_SET_PED_HEAD_OVERLAY_COLOR", ent, 2, 1, eyebrowsColor, eyebrowsColor);
        // FACIAL_HAIR
        var facialHairStyle = API.getEntitySyncedData(ent, "GTAO_FACIAL_HAIR");
        var facialHairColor = API.getEntitySyncedData(ent, "GTAO_FACIAL_HAIR_COLOR");
        //var facialHairColor2 = API.getEntitySyncedData(ent, "GTAO_FACIAL_HAIR_COLOR2");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 1, facialHairStyle, API.f(1));
        API.callNative("_SET_PED_HEAD_OVERLAY_COLOR", ent, 1, 1, facialHairColor, facialHairColor);
        // BLEMISHES
        var blemishes = API.getEntitySyncedData(ent, "GTAO_BLEMISHES");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 0, blemishes, API.f(1));
        // AGEING
        var ageing = API.getEntitySyncedData(ent, "GTAO_AGEING");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 3, ageing, API.f(1));
        // COMPLEXION
        var complexion = API.getEntitySyncedData(ent, "GTAO_COMPLEXION");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 6, complexion, API.f(1));
        // FRECKLES
        var freckles = API.getEntitySyncedData(ent, "GTAO_FRECKLES");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 9, freckles, API.f(1));
        // SUN DAMAGE
        var sunDamage = API.getEntitySyncedData(ent, "GTAO_SUN_DAMAGE");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 7, sunDamage, API.f(1));
        // EYE COLOR
        var eyeColor = API.getEntitySyncedData(ent, "GTAO_EYE_COLOR");
        API.callNative("_SET_PED_EYE_COLOR", ent, eyeColor);
        // MAKEUP
        var makeup = API.getEntitySyncedData(ent, "GTAO_MAKEUP");
        //var makeupColor = API.getEntitySyncedData(ent, "GTAO_MAKEUP_COLOR");
        //var makeupColor2 = API.getEntitySyncedData(ent, "GTAO_MAKEUP_COLOR2");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 4, makeup, API.f(1));
        //API.callNative("_SET_PED_HEAD_OVERLAY_COLOR", ent, 4, 0, makeupColor, makeupColor2);
        // BLUSH
        var blush = API.getEntitySyncedData(ent, "GTAO_BLUSH");
        var blushColor = API.getEntitySyncedData(ent, "GTAO_BLUSH_COLOR");
        //var blushColor2 = API.getEntitySyncedData(ent, "GTAO_BLUSH_COLOR2");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 5, blush, API.f(0.4));
        API.callNative("_SET_PED_HEAD_OVERLAY_COLOR", ent, 5, 2, blushColor, blushColor);
        // LIPSTICK
        var lipstick = API.getEntitySyncedData(ent, "GTAO_LIPSTICK");
        var lipstickColor = API.getEntitySyncedData(ent, "GTAO_LIPSTICK_COLOR");
        //var lipstickColor2 = API.getEntitySyncedData(ent, "GTAO_LIPSTICK_COLOR2");
        API.callNative("SET_PED_HEAD_OVERLAY", ent, 8, lipstick, API.f(0.8));
        API.callNative("_SET_PED_HEAD_OVERLAY_COLOR", ent, 8, 2, lipstickColor, lipstickColor);
        // FACE FEATURES (e.g. nose length, chin shape, etc)
        var faceFeatureList = API.getEntitySyncedData(ent, "GTAO_FACE_FEATURES_LIST");
        for (var i = 0; i < 21; i++) {
            API.callNative("_SET_PED_FACE_FEATURE", ent, i, API.f(faceFeatureList[i]));
        }
    }
}
