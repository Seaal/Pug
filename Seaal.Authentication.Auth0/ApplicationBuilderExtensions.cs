using Microsoft.AspNetCore.Builder;
using System;

namespace Seaal.Authentication.Auth0
{
    public static class ApplicationBuilderExtensions
    {
        public static void UseAuth0Authentication(this IApplicationBuilder app, Auth0Config config)
        {
            JwtBearerOptions jwtOptions = new JwtBearerOptions()
            {
                Audience = config.ApiIdentifier,
                Authority = $"https://{config.Domain}/"
            };

            app.UseJwtBearerAuthentication(jwtOptions);
        }
    }
}
