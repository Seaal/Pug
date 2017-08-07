using Microsoft.AspNet.SignalR.Hubs;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Client.Config
{
    public class SimpleInjectorHubActivtor : IHubActivator
    {
        private readonly Container _container;

        public SimpleInjectorHubActivtor(Container container)
        {
            _container = container;
        }

        public IHub Create(HubDescriptor descriptor)
        {
            return (IHub)_container.GetInstance(descriptor.HubType);
        }
    }
}
