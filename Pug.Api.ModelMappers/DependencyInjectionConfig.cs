using Pug.Api.ModelMappers.Pugs.Phases;
using Seaal.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Api.ModelMappers
{
    public class DependencyInjectionConfig : IDependencyInjectionConfig
    {
        public void RegisterTypes(IContainer container)
        {
            IEnumerable<Registration> registrations = this.GetAssemblyRegistrations(t => !typeof(IPugPhaseModelMapper).GetTypeInfo().IsAssignableFrom(t));

            container.RegisterMultiple(registrations);
            container.Register<IPugPhaseModelMapper, PugPhaseModelMapper>(); 
        }
    }
}
