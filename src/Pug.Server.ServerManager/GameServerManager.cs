using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reactive.Subjects;
using System.Threading.Tasks;

namespace Pug.Server.ServerManager
{
    public class GameServerManager : IGameServerManager
    {
        private readonly ConcurrentDictionary<Guid, GameServer> _gameServers;
        private readonly int basePort = 29070;

        public GameServerManager()
        {
            _gameServers = new ConcurrentDictionary<Guid, GameServer>();
        }

        public async Task<GameServer> StartServer()
        {
            int port = GetServerPort();

            Guid id = Guid.NewGuid();

            Process dockerProcess = new Process
            {
                StartInfo =
                {
                    FileName = "docker",
                    Arguments = $"run -v \"C:/jedi-academy-server\":\"/jedi-academy\" --name \"{id}\" -e NET_PORT={port} -p {port}:{port}/udp docker-jedi-server",
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true
                }
            };

            ISubject<string> outputSubject = new Subject<string>();
            ISubject<string> errorSubject = new Subject<string>();

            outputSubject.OnNext("Starting Server!");

            dockerProcess.ErrorDataReceived += (s, e) => errorSubject.OnNext(e.Data);
            dockerProcess.OutputDataReceived += (s, e) => outputSubject.OnNext(e.Data);

            dockerProcess.Start();
            dockerProcess.BeginOutputReadLine();
            dockerProcess.BeginErrorReadLine();

            GameServer gameServer = new GameServer()
            {
                Id = id,
                Port = port,
                Ip = "192.168.0.1",
                Password = "test",
                Players = 0,
                ErrorsObservable = errorSubject,
                MessagesObservable = outputSubject,
                Process = dockerProcess
            };

            _gameServers.TryAdd(gameServer.Id, gameServer);

            return gameServer;
        }

        public async Task StopServer(Guid id)
        {
            GameServer gameServer;

            if (_gameServers.TryRemove(id, out gameServer))
            {
                Process dockerKillProcess = new Process()
                {
                    StartInfo =
                    {
                        FileName = "docker",
                        Arguments = $"kill {id}",
                        UseShellExecute = false
                    }
                };

                dockerKillProcess.Start();
                dockerKillProcess.WaitForExit(5000);

                gameServer.Process.Dispose();
            }
        }

        private int GetServerPort()
        {
            int currentPort = basePort;

            while (_gameServers.Values.Any(gs => gs.Port == currentPort))
            {
                currentPort++;
            }

            return currentPort;
        }
    }
}
