using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Seaal.Authentication.Auth0
{
    public static class ApplicationBuilderExtensions
    {
        public static void AddAuth0Authentication(this IServiceCollection services, IConfiguration configuration)
        {
            Auth0Config auth0Config = configuration.GetSection("auth0Config").Get<Auth0Config>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = $"https://{auth0Config.Domain}/";
                options.Audience = auth0Config.ApiIdentifier;
            });
        }
    }
}
