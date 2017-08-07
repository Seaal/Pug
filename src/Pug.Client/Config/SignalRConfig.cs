using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Owin.Builder;
using Newtonsoft.Json;
using Owin;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pug.Client.Config
{
    public static class SignalRConfig
    {
        public static void AddSignalR(this IServiceCollection services, Container container)
        {
            //Add camelCase support for json messages in SignalR
            JsonSerializerSettings serializerSettings = new JsonSerializerSettings()
            {
                ContractResolver = new SignalRContractResolver()
            };

            JsonSerializer serializer = JsonSerializer.Create(serializerSettings);

            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => serializer);

            //Add Dependency Injection to SignalR
            IHubActivator hubActivator = new SimpleInjectorHubActivtor(container);

            GlobalHost.DependencyResolver.Register(typeof(IHubActivator), () => hubActivator);
        }

        public static void UseSignalR(this IApplicationBuilder app)
        {
            app.UseOwin(addToPipeline =>
            {
                addToPipeline(next =>
                {
                    var appBuilder = new AppBuilder();
                    appBuilder.Properties["builder.DefaultApp"] = next;

                    IAppBuilder iAppBuilder = appBuilder;

                    iAppBuilder.MapSignalR();

                    return appBuilder.Build<Func<IDictionary<string, object>, Task>>();
                });
            });
        }
    }
}
