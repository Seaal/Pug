using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SimpleInjector;
using Pug.Client.Config;
using Microsoft.Extensions.Configuration;
using Seaal.Data.MongoDB;

namespace Pug.Client
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();
        }

        private Container container = new Container();

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.IntegrateSimpleInjector(container);

            Configuration.RegisterOptions(container);

            services.AddMvc();

            services.AddSignalR(container);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.InitializeContainer(container);

            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseSignalR();

            app.UseMvc(routes =>
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
