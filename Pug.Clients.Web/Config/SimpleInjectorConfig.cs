using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Pug.Server.ServerManager;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore.Mvc;
using SimpleInjector.Lifestyles;

namespace Pug.Client.Config
{
    public static class SimpleInjectorConfig
    {
        public static void IntegrateSimpleInjector(this IServiceCollection services, Container container)
        {
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddSingleton<IControllerActivator>(new SimpleInjectorControllerActivator(container));
            services.AddSingleton<IViewComponentActivator>(new SimpleInjectorViewComponentActivator(container));

            services.EnableSimpleInjectorCrossWiring(container);
            services.UseSimpleInjectorAspNetRequestScoping(container);
        }

        public static void InitializeContainer(this IApplicationBuilder app, Container container)
        {
            // Add application presentation components
            container.RegisterMvcControllers(app);
            container.RegisterMvcViewComponents(app);

            // Add application services
            container.Register<IGameServerManager, GameServerManager>();

            // Cross-wire ASP.NET services
            container.CrossWire<ILoggerFactory>(app);
            container.CrossWire<JsonSerializer>(app);
        }
    }
}
