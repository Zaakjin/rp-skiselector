using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using GTANetworkServer;
using GTANetworkShared;

namespace fuel_system
{
    class fuel_system : Script
    {
        Thread fuelUpdateThread;
        public fuel_system()
        {
            API.onClientEventTrigger += engineStartEventHandler;
            API.onResourceStop += onResourceStopHandler;
            fuelUpdateThread = new Thread(fuelUpdate);
            fuelUpdateThread.Start();
        }

        private void onResourceStopHandler()
        {
            fuelUpdateThread.Abort();
            fuelUpdateThread.Join(500);
        }

        //Обработчик запуска/остановки двигателя
        private void engineStartEventHandler(Client sender, string eventName, params object[] arguments)
        {
            if (eventName == "engine_start")
            {
                NetHandle playerVehicle = API.getPlayerVehicle(sender);
                if (API.getEntityData(playerVehicle, "FUEL_CURRENT_FUEL") > 0)
                {
                    API.setVehicleEngineStatus(playerVehicle, !API.getVehicleEngineStatus(playerVehicle));
                }
            }
        }

        
        private void fuelUpdate()
        {
            List<NetHandle> allCars = new List<NetHandle>();
            float currentFuel = 0;
            float fuelCosumption = 0;

            while (true)
            {
                allCars = API.getAllVehicles();
                foreach (NetHandle car in allCars)
                {
                    if (API.getEntityData(car, "FUEL_CURRENT_FUEL") == null) loadCarFuel(car);

                    currentFuel = API.getEntityData(car, "FUEL_CURRENT_FUEL");
                    //API.sendChatMessageToAll("FUEL_CURRENT_FUEL: " + currentFuel);
                    fuelCosumption = getFuelConsumption(car);
                    if (API.getVehicleEngineStatus(car))
                    {
                        if (fuelCosumption > currentFuel)
                        {
                            currentFuel = 0;
                            //TODO возможно сделать чтобы глушилось только когда не заглушенно
                            API.setVehicleEngineStatus(car, false);
                        }
                        else
                        {
                            currentFuel -= fuelCosumption;
                        }
                        API.setEntityData(car, "FUEL_CURRENT_FUEL", currentFuel);
                        API.setEntitySyncedData(car, "FUEL_DISPLAY_FUEL", currentFuel);

                    }
                }
                Thread.Sleep(10000);
            }

        }

        private float getFuelConsumption(NetHandle car)
        {
            return 5f;
        }

        private void loadCarFuel(NetHandle car)
        {
            API.setEntityData(car, "FUEL_CURRENT_FUEL", 50);
        }

        [Command]
        public void refill(Client player , int amount)
        {
            NetHandle playerVehicle = API.getPlayerVehicle(player);
            if (playerVehicle.Value == 0)
            {
                API.sendChatMessageToPlayer(player, "Комманду ~g~/refill [amount] ~w~ можно использовать только сидя в машине.");
                return;
            }
            API.setEntityData(playerVehicle, "FUEL_CURRENT_FUEL", amount);
            API.setEntitySyncedData(playerVehicle, "FUEL_DISPLAY_FUEL", amount);
        }
    }
}
