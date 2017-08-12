using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Seaal.DependencyInjection
{
    public class TypeRegistrar
    {
        public void RegisterTypesFromReferencedAssemblies(IContainer container)
        {
            RegisterTypesFromReferencedAssemblies(container, (assembly) => true);
        }

        public void RegisterTypesFromReferencedAssemblies(IContainer container, Func<AssemblyName, bool> assemblyFilter)
        {
            Assembly entryAssembly = Assembly.GetEntryAssembly();

            HashSet<Assembly> assemblies = new HashSet<Assembly>();

            GetReferencedAssembliesRecursive(entryAssembly, assemblies, assemblyFilter);

            foreach (Assembly assembly in assemblies)
            {
                IEnumerable<Type> dependencyInjectionConfigTypes = assembly.GetExportedTypes().Where(t => typeof(IDependencyInjectionConfig).GetTypeInfo().IsAssignableFrom(t) && !t.Equals(typeof(IDependencyInjectionConfig)));

                foreach (Type dependencyInjectionConfigType in dependencyInjectionConfigTypes)
                {
                    IDependencyInjectionConfig config = GetInstanceOfConfig(dependencyInjectionConfigType);

                    config.RegisterTypes(container);
                }
            }
        }

        private void GetReferencedAssembliesRecursive(Assembly assembly, HashSet<Assembly> assemblies, Func<AssemblyName, bool> assemblyFilter)
        {
            if (!assemblies.Add(assembly))
            {
                return;
            }

            IEnumerable<AssemblyName> referencedAssemblyNames = assembly.GetReferencedAssemblies().Where(an => assemblyFilter(an));

            foreach (AssemblyName referencedAssemblyName in referencedAssemblyNames)
            {
                Assembly referencedAssembly = Assembly.Load(referencedAssemblyName);

                GetReferencedAssembliesRecursive(referencedAssembly, assemblies, assemblyFilter);
            }
        }

        private IDependencyInjectionConfig GetInstanceOfConfig(Type dependencyInjectionConfigType)
        {
            IEnumerable<ConstructorInfo> constructors = dependencyInjectionConfigType.GetTypeInfo().GetConstructors();

            ConstructorInfo constructor = constructors.FirstOrDefault(c => c.GetParameters().Length == 0);

            if (constructor == null)
            {
                throw new InvalidOperationException($"Could not create an instance of {dependencyInjectionConfigType.FullName} because it does not have a parameterless constructor");
            }

            return (IDependencyInjectionConfig)constructor.Invoke(new Type[0]);
        }
    }
}
