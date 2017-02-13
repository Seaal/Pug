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
        private readonly ConcurrentDictionary<Guid, Process> _gameProcesses;

        public GameServerManager()
        {
            _gameProcesses = new ConcurrentDictionary<Guid, Process>();
        }

        public async Task<GameServer> StartServer()
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

            ISubject<string> outputSubject = new Subject<string>();
            ISubject<string> errorSubject = new Subject<string>();

            dockerProcess.ErrorDataReceived += (s, e) => errorSubject.OnNext(e.Data);
            dockerProcess.OutputDataReceived += (s, e) => outputSubject.OnNext(e.Data);

            dockerProcess.Start();
            dockerProcess.BeginOutputReadLine();
            dockerProcess.BeginErrorReadLine();

            GameServer gameServer = new GameServer()
            {
                Id = Guid.NewGuid(),
                Ip = "192.168.0.1:" + (29070 + _gameProcesses.Count),
                Password = "test",
                Players = 0,
                ErrorsObservable = errorSubject,
                MessagesObservable = outputSubject
            };

            _gameProcesses.TryAdd(gameServer.Id, dockerProcess);

            return gameServer;
        }

        public async Task StopServer(Guid id)
        {
            Process gameProcess;

            if (_gameProcesses.TryRemove(id, out gameProcess))
            {
                gameProcess.Kill();
                gameProcess.Dispose();
            }
        }
    }
}
