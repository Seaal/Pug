using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Seaal.Authentication.Auth0;

namespace Pug.Clients.Web.Config
{
    public static class AuthenticationConfig
    {
        public static void UseAuthentication(this IApplicationBuilder app, IConfiguration configuration)
        {
            Auth0Config auth0Config = configuration.GetSection("auth0Config").Get<Auth0Config>();

            app.UseAuth0Authentication(auth0Config);
        }
    }
}
