using Microsoft.AspNetCore.Authentication.Cookies;

namespace Api.Extensions;

public static class IdentityServiceExtensions
{
    public static WebApplicationBuilder AddIdentityServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

        builder.Services.AddIdentityCore<AppUser>(opts =>
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
        .AddRoles<IdentityRole<int>>()
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultTokenProviders();

        builder.Services.ConfigureApplicationCookie(opts =>
        {
            opts.Cookie.Name = "CHATSE_IDENTITY";
            opts.Cookie.HttpOnly = true;
            opts.Cookie.SameSite = SameSiteMode.Strict;
            opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            opts.ExpireTimeSpan = TimeSpan.FromDays(7);
            opts.SlidingExpiration = true;
        });

        return builder;
    }
}