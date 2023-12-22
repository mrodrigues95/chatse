using Api.Data.Interceptors;

namespace Api.Extensions;

public static class ApplicationServiceExtensions
{
    public static WebApplicationBuilder AddApplicationServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors();
        builder.Services.AddValidatorsFromAssemblyContaining<Program>();

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContextPool<AppDbContext>((sp, opts) =>
        {
            opts.UseNpgsql(connectionString);
            opts.UseSnakeCaseNamingConvention();
            opts.AddInterceptors(
                sp.GetRequiredService<AuditingInterceptor>(),
                sp.GetRequiredService<PublicIdInterceptor>()
            );
        });

        builder.Services.AddSingleton<AppDbContextInitializer>();
        builder.Services.AddSingleton<AuditingInterceptor>();
        builder.Services.AddSingleton<PublicIdInterceptor>();

        builder.Services.AddHostedService(sp => sp.GetRequiredService<AppDbContextInitializer>());

        return builder;
    }
}
