using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Pug.Server.ServerManager;
using PugClient.Hubs;

namespace PugClient
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            JsonSerializerSettings serializerSettings = new JsonSerializerSettings()
            {
                ContractResolver = new SignalRContractResolver()
            };

            JsonSerializer serializer = JsonSerializer.Create(serializerSettings);

            services.Add(new ServiceDescriptor(
                typeof(JsonSerializer),
                provider => serializer,
                ServiceLifetime.Transient
            ));

            services.AddSingleton<IGameServerManager, GameServerManager>();

            services.AddSignalR(options =>
            {
                options.Hubs.EnableJavaScriptProxies = false;
            });
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles()
               .UseSignalR()
               .UseMvc(routes =>
               {
                   routes.MapRoute(
                    name: "default",
                    template: "{*.}",
                    defaults: new { controller = "Home", action = "Index" }
                    );
               });
        }
    }
}
