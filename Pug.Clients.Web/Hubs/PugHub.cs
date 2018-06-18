using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Pug.ServerManager;

namespace PugClient.Hubs
{
    public class PugHub : Hub<IPugPushMethods>
    {
        private readonly IGameServerManager _serverManager;

        public PugHub(IGameServerManager serverManager)
        {
            _serverManager = serverManager;
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "lobby");

            await base.OnConnectedAsync();
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
