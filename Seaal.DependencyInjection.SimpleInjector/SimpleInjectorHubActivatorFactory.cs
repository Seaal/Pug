using Microsoft.AspNetCore.SignalR;
using System;

namespace Seaal.DependencyInjection.SimpleInjector
{
    public class SimpleInjectorHubActivatorFactory<THub> : IHubActivator<THub> where THub : Hub
    {
        private readonly SimpleInjectorHubActivator _hubActivator;

        public SimpleInjectorHubActivatorFactory(SimpleInjectorHubActivator hubActivator)
        {
            _hubActivator = hubActivator;
        }

        public THub Create()
        {
            return _hubActivator.Create<THub>();
        }

        public void Release(THub hub)
        {
        }
    }
}
