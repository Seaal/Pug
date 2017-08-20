using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SimpleInjector;

namespace Seaal.DependencyInjection.SimpleInjector
{
    public class SimpleInjectorAdapter : IContainer
    {
        private readonly Container _container;

        public SimpleInjectorAdapter(Container container)
        {
            _container = container;
        }

        public void Register<TInterface, TImplementation>() where TImplementation : class, TInterface where TInterface : class
        {
            _container.Register<TInterface, TImplementation>();
        }

        public void RegisterMultiple(IEnumerable<Registration> registrations)
        {
            foreach(Registration registration in registrations)
            {
                _container.Register(registration.Interface, registration.Implementation);
            }
        }

        public void RegisterSingleton<TInterface, TImplementation>() where TImplementation : class, TInterface where TInterface : class
        {
            _container.RegisterSingleton<TInterface, TImplementation>();
        }
    }
}
