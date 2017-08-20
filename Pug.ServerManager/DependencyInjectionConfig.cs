using System;
using Seaal.DependencyInjection;

namespace Pug.ServerManager
{
    public class DependencyInjectionConfig : IDependencyInjectionConfig
    {
        public void RegisterTypes(IContainer container)
        {
            container.Register<IGameServerManager, GameServerManager>();
        }
    }
}
