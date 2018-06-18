using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PugClient.Hubs;
using SimpleInjector;

namespace Pug.Client.Config
{
    public static class SignalRConfig
    {
        public static void AddSignalR(this IServiceCollection services, Container container)
        {
            services.AddSignalR();
        }

        public static void UseSignalR(this IApplicationBuilder app)
        {
            app.UseSignalR(routes =>
            {
                routes.MapHub<PugHub>("/hubs/pug");
            });
        }
    }
}
