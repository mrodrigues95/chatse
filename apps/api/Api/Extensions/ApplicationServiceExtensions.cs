using Api.Data.Interceptors;
using Microsoft.Net.Http.Headers;

namespace Api.Extensions;

public static class ApplicationServiceExtensions
{
    public static WebApplicationBuilder AddApplicationServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(opts =>
        {
            opts.AddPolicy("dev", policy =>
            {
                string[] origins = ["http://localhost", "http://127.0.0.1"];

                policy
                    .AllowCredentials()
                    .WithMethods("POST")
                    .WithHeaders(
                        HeaderNames.Accept,
                        HeaderNames.ContentType)
                    .SetIsOriginAllowed((origin) =>
                        origins.Any((o) => origin.StartsWith(o, StringComparison.OrdinalIgnoreCase)));
            });
        });

        builder.Services.AddValidatorsFromAssemblyContaining<Program>();

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContextPool<AppDbContext>((sp, opts) =>
        {
            opts.UseNpgsql(connectionString);
            opts.UseSnakeCaseNamingConvention();
            opts.AddInterceptors(sp.GetRequiredService<AuditingInterceptor>());
        });

        builder.Services.AddSingleton<AppDbContextInitializer>();
        builder.Services.AddSingleton<AuditingInterceptor>();

        builder.Services.AddHostedService(sp => sp.GetRequiredService<AppDbContextInitializer>());

        return builder;
    }
}
