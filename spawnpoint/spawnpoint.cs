using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkServer;
using GTANetworkShared;

namespace spawnpoint
{
    public class spawnpoint :Script
    {
        public spawnpoint()
        {
            API.onPlayerConnected += OnPlayerConnectedHandler;
        }

        private void OnPlayerConnectedHandler(Client player)
        {
            API.setEntityPosition(player, new Vector3 (-1037.9, -2738, 20.25));
            API.setEntityRotation(player, new Vector3(0, 0, -32.2));
        }
    }
}
