using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;

namespace PugClient.Hubs
{
    [HubName("pugHub")]
    public class PugHub : Hub<IPugPushMethods>
    {
        private static readonly List<ServerInfo> Servers = new List<ServerInfo>();
        private static int _serverIdCount = 0;

        public override Task OnConnected()
        {
            Groups.Add(Context.ConnectionId, "lobby");

            return base.OnConnected();
        }

        public ServerInfo CreateServer()
        {
            Process dockerProcess = new Process
            {
                StartInfo =
                {
                    Arguments = "",
                    FileName = "docker",
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true
                }
            };


            dockerProcess.ErrorDataReceived += (s, e) => Clients.All.ServerLog(e.Data);
            dockerProcess.OutputDataReceived += (s, e) => Clients.All.ServerLog(e.Data);

            dockerProcess.Start();
            dockerProcess.BeginOutputReadLine();
            dockerProcess.BeginErrorReadLine();

            _serverIdCount++;
            ServerInfo server = new ServerInfo()
            {
                Id = _serverIdCount,
                Ip = "192.168.0.1:2907" + _serverIdCount,
                Players = 0
            };

            Servers.Add(server);

            Clients.OthersInGroup("lobby").ServerUpdate(server);

            return server;
        }
    }
}
