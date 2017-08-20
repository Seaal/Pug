using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Pug.ServerManager
{
    public class GameServer
    {
        public Guid Id { get; set; }
        public string Ip { get; set; }
        public int Port { get; set; }
        public string Password { get; set; }
        public int Players { get; set; }
        public IObservable<string> MessagesObservable { get; set; }
        public IObservable<string> ErrorsObservable { get; set; }
        internal Process Process { get; set; }
    }
}
