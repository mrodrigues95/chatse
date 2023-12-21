using Api.Data.Interceptors;

namespace Api.Extensions;

public static class ApplicationServiceExtensions
{
    public static WebApplicationBuilder AddApplicationServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors();
        builder.Services.AddValidatorsFromAssemblyContaining<Program>();

        builder.Services.AddScoped<IAppDbContextSeeder, AppDbContextSeeder>();

        builder.Services.AddSingleton<AuditingInterceptor>();
        builder.Services.AddSingleton<PublicIdInterceptor>();

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

        return builder;
    }
}
