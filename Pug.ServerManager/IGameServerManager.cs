using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pug.ServerManager
{
    public interface IGameServerManager
    {
        Task<GameServer> StartServer();

        Task StopServer(Guid id);
    }
}
