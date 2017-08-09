using System;
using System.Linq;
using System.Threading.Tasks;
using Pug.ServerManager;
using Microsoft.AspNet.SignalR;

namespace PugClient.Hubs
{
    public class PugHub : Hub
    {
        private readonly IGameServerManager _serverManager;

        public PugHub(IGameServerManager serverManager)
        {
            _serverManager = serverManager;
        }

        public override Task OnConnected()
        {
            Groups.Add(Context.ConnectionId, "lobby");

            return base.OnConnected();
        }

        public async Task<ServerInfo> CreateServer()
        {
            GameServer gameServer = await _serverManager.StartServer();

            ServerInfo server = new ServerInfo()
            {
                Id = gameServer.Id,
                Ip = gameServer.Ip,
                Players = gameServer.Players
            };

            gameServer.MessagesObservable.Subscribe(data => Clients.All.ServerLog(data));
            gameServer.ErrorsObservable.Subscribe(data => Clients.All.ServerLog(data));

            Clients.OthersInGroup("lobby").ServerUpdate(server);

            return server;
        }

        public async Task DeleteServer(string serverId)
        {
            Guid id = new Guid(serverId);

            await _serverManager.StopServer(id);
        }
    }
}
