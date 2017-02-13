using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using Pug.Server.ServerManager;

namespace PugClient.Hubs
{
    [HubName("pugHub")]
    public class PugHub : Hub<IPugPushMethods>
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
    }
}
