using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PugClient.Hubs
{
    public interface IPugPushMethods
    {
        void ServerUpdate(ServerInfo serverInfo);
        void ServerLog(string data);
    }
}
