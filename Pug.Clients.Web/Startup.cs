using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SimpleInjector;
using Pug.Client.Config;
using Microsoft.Extensions.Configuration;
using Pug.Clients.Web.Config;

namespace Pug.Client
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            
            if(env.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            Configuration = builder.Build();
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

            app.UseAuthentication(Configuration);

            app.UseSignalR();

            app.UseMvc(routes =>
            {
                routes.MapSpaFallbackRoute(
                    name: "default",
                    defaults: new { controller = "Home", action = "Index" }
                );
            });
        }
    }
}
