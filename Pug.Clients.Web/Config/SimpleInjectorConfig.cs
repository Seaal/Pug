using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Seaal.Data.MongoDB;
using Seaal.DependencyInjection;
using Seaal.DependencyInjection.SimpleInjector;
using SimpleInjector;

namespace Pug.Client.Config
{
    public static class SimpleInjectorConfig
    {
        public static void InitializeContainer(this IApplicationBuilder app, Container container)
        {
            // Add application presentation components
            container.RegisterMvcControllers(app);
            container.RegisterMvcViewComponents(app);

            // Cross-wire ASP.NET services
            container.CrossWire<ILoggerFactory>(app);

            // Add application services
            TypeRegistrar registrar = new TypeRegistrar();

            registrar.RegisterTypesFromReferencedAssemblies(new SimpleInjectorAdapter(container), (an) => an.FullName.StartsWith("Seaal") || an.FullName.StartsWith("Pug"));

            container.Verify();
        }

        public static void RegisterOptions(this IConfiguration configuration, Container container)
        {
            RegisterOptions<MongoConfig>(configuration.GetSection("mongoConfig"), container);
        }

        private static void RegisterOptions<T>(IConfigurationSection configurationSection, Container container) where T : class
        {
            container.RegisterInstance(configurationSection.Get<T>());
        }
    }
}
