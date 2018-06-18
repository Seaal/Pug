using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SimpleInjector;
using Pug.Client.Config;
using Microsoft.Extensions.Configuration;
using Seaal.Authentication.Auth0;
using Seaal.DependencyInjection.SimpleInjector;

namespace Pug.Client
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private Container container = new Container();

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                    .AddRazorPagesOptions(options =>
                    {
                        options.Conventions.AddPageRoute("/Index", "{*url:regex(^(?!api).*$)}");
                    });

            SignalRConfig.AddSignalR(services);

            services.IntegrateSimpleInjector(container);

            Configuration.RegisterOptions(container);

            services.AddAuth0Authentication(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.InitializeContainer(container);

            loggerFactory.AddConsole(LogLevel.Warning);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseSignalR();

            app.UseMvc();
        }
    }
}
