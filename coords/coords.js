"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
var showCoords = false;
API.onServerEventTrigger.connect(function (name, args) {
    if (name == "showCoords" && args[0] == "true") {
        showCoords = true;
    }
    if (name == "showCoords" && args[0] == "false") {
        showCoords = false;
    }
});
API.onUpdate.connect(function () {
    if (showCoords) {
        var resolution = API.getScreenResolutionMantainRatio();
        var PlayerPos = API.getEntityPosition(API.getLocalPlayer());
        var PlayerAxis = API.getEntityRotation(API.getLocalPlayer());
        API.drawText("Pitch: " + PlayerAxis.X.toFixed(2) + " Roll: " + PlayerAxis.Y.toFixed(2) + " Yaw: " + PlayerAxis.Z.toFixed(2), resolution.Width / 2, resolution.Height - 90, 0.45, 255, 255, 255, 255, 0, 1, true, true, 0);
        API.drawText("X: " + PlayerPos.X.toFixed(2) + " Y: " + PlayerPos.Y.toFixed(2) + " Z: " + PlayerPos.Z.toFixed(2), resolution.Width / 2, resolution.Height - 45, 0.45, 255, 255, 255, 255, 0, 1, true, true, 0);
    }
});
