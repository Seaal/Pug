using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.DependencyInjection
{
    public static class IDependencyInjectionConfigExtensions
    {
        public static IEnumerable<Registration> GetAssemblyRegistrations(this IDependencyInjectionConfig config)
        {
            return GetAssemblyRegistrations(config, (t) => true);
        }

        public static IEnumerable<Registration> GetAssemblyRegistrations(this IDependencyInjectionConfig config, Func<Type, bool> typeFilter)
        {
            Type configType = config.GetType();

            Assembly assembly = configType.GetTypeInfo().Assembly;

            return assembly.GetExportedTypes()
                .Where(t => !t.Equals(configType) && t.GetTypeInfo().GetInterfaces().Any() && !typeof(Exception).GetTypeInfo().IsAssignableFrom(t))
                .Where(typeFilter)
                .Select(t => new Registration() { Implementation = t, Interface = t.GetTypeInfo().GetInterfaces().Single() });
        }
    }
}
