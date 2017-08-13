using Seaal.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Pug.Data
{
    public class DependencyInjectionConfig : IDependencyInjectionConfig
    {
        public void RegisterTypes(IContainer container)
        {
            IEnumerable<Registration> registrations = this.GetAssemblyRegistrations();

            container.RegisterMultiple(registrations);
        }
    }
}
