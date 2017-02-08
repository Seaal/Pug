using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PugClient.Hubs
{
    public class ServerInfo
    {
        public int Id { get; set; }
        public string Ip { get; set; }
        public int Players { get; set; }
    }
}
