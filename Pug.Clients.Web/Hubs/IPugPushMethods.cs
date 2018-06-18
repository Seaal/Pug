using System.Threading.Tasks;

namespace PugClient.Hubs
{
    public interface IPugPushMethods
    {
        Task ServerUpdate(ServerInfo serverInfo);
        Task ServerLog(string data);
    }
}
