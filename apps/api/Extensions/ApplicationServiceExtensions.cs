namespace Api.Extensions;

public static class ApplicationServiceExtensions
{
    public static WebApplicationBuilder AddApplicationServices(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        builder.Services.AddDbContextPool<AppDbContext>(opts =>
        {
            opts.UseNpgsql(connectionString);
            opts.UseSnakeCaseNamingConvention();
        });

        builder.Services.AddCors();

        builder.Services.AddScoped<IAppDbContextSeeder, AppDbContextSeeder>();

        return builder;
    }
}
