using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pug.Client.Hubs
{
    public class InjectionDependencyResolver : DefaultDependencyResolver
    {
        private readonly IServiceProvider _serviceProvider;

        public InjectionDependencyResolver(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public override object GetService(Type serviceType)
        {
            var service = _serviceProvider.GetService(serviceType);

            return service ?? base.GetService(serviceType);
        }
    }
}
