using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PugClient.Hubs;

namespace Pug.Client.Config
{
    public static class SignalRConfig
    {
        public static void AddSignalR(this IServiceCollection services)
        {
            services.AddSignalR(builder =>
            {
                builder.EnableDetailedErrors = true;
            });
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
