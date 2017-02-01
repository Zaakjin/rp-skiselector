"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
var res_X = API.getScreenResolutionMantainRatio().Width;
var res_Y = API.getScreenResolutionMantainRatio().Height;
var currentFuel = 0;
var lastUpdate = 0;
API.onUpdate.connect(function () {
    var player = API.getLocalPlayer();
    var inVeh = API.isPlayerInAnyVehicle(player);
    if (inVeh) {
        var car = API.getPlayerVehicle(player);
        var velocity = API.getEntityVelocity(car);
        var speed = Math.sqrt(velocity.X * velocity.X +
            velocity.Y * velocity.Y +
            velocity.Z * velocity.Z);
        var displaySpeed = Math.round(speed * 3.6);
        var displaySpeedMph = Math.round(speed * 2.23693629);
        if (API.getGameTime() - lastUpdate > 2000) {
            lastUpdate = API.getGameTime();
            currentFuel = API.getEntitySyncedData(car, "FUEL_DISPLAY_FUEL");
        }
        API.drawText(displaySpeedMph + " mph", 455, res_Y - 112, 1, 255, 255, 255, 255, 4, 2, false, true, 0);
        //API.drawText(`${displaySpeedMph} km/h`, 455, res_Y - 52, 0.7, 85, 85, 85, 255, 4, 2, false, true, 0);
        API.drawText(currentFuel + " fuel", 455, res_Y - 52, 0.5, 85, 85, 85, 255, 4, 2, false, true, 0);
    }
});
API.onKeyDown.connect(function (sender, key) {
    if (key.KeyCode == Keys.D2 && API.isPlayerInAnyVehicle(API.getLocalPlayer()) && (API.getPlayerVehicleSeat(API.getLocalPlayer()) == -1)) {
        API.triggerServerEvent("engine_start");
    }
});
API.onPlayerEnterVehicle.connect(function (entity) {
    if (API.getPlayerVehicleSeat(API.getLocalPlayer()) == -1) {
        API.sendNotification("Запустить/заглушить двигатель кнопка ~g~2~w~.");
    }
});
