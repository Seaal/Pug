using Microsoft.AspNetCore.SignalR;
using SimpleInjector;
using System;

namespace Seaal.DependencyInjection.SimpleInjector
{
    public class SimpleInjectorHubActivator
    {
        private readonly Container _container;

        public SimpleInjectorHubActivator(Container container)
        {
            _container = container;
        }

        public THub Create<THub>() where THub: Hub
        {
            return _container.GetInstance<THub>();
        }
    }
}
