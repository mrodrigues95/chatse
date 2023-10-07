using Microsoft.AspNetCore.Authentication.Cookies;

namespace Api.Extensions;

public static class IdentityServiceExtensions
{
    public static WebApplicationBuilder AddIdentityServices(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddIdentity<AppUser, IdentityRole<int>>(opts =>
                {
                    opts.User.RequireUniqueEmail = true;

                    opts.SignIn.RequireConfirmedEmail = false;
                    opts.SignIn.RequireConfirmedAccount = false;

                    opts.Password.RequireNonAlphanumeric = false;
                    opts.Password.RequireDigit = false;
                    opts.Password.RequireUppercase = false;
                    opts.Password.RequireLowercase = false;
                    opts.Password.RequiredLength = 6;
                })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();


        builder.Services
            .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie();

        builder.Services.AddAuthorization();

        builder.Services.ConfigureApplicationCookie(opts =>
            {
                opts.Cookie.Name = "identity";
                opts.Cookie.HttpOnly = true;
                opts.Cookie.SameSite = SameSiteMode.Strict;
                opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                opts.ExpireTimeSpan = TimeSpan.FromDays(7);
                opts.SlidingExpiration = true;

                opts.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = (ctx) =>
                    {
                        ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        return Task.CompletedTask;
                    },
                    OnRedirectToAccessDenied = (ctx) =>
                    {

                        ctx.Response.StatusCode = StatusCodes.Status403Forbidden;
                        return Task.CompletedTask;
                    }
                };
            });

        return builder;
    }
}
