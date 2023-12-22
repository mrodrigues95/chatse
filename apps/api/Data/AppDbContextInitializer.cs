using System.Diagnostics;

namespace Api.Data;

public sealed class AppDbContextInitializer : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<AppDbContextInitializer> _logger;

    public AppDbContextInitializer(IServiceProvider serviceProvider, ILogger<AppDbContextInitializer> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

        await InitializeDatabaseAsync(dbContext, userManager, cancellationToken);
    }

    private async Task InitializeDatabaseAsync(
        AppDbContext dbContext,
        UserManager<AppUser> userManager,
        CancellationToken cancellationToken)
    {
        var sw = Stopwatch.StartNew();

        var strategy = dbContext.Database.CreateExecutionStrategy();
        await strategy.ExecuteAsync(dbContext.Database.MigrateAsync, cancellationToken);

        await SeedAsync(dbContext, userManager, cancellationToken);

        _logger.LogInformation(
            "Database initialization completed after {time}ms.", sw.ElapsedMilliseconds);
    }

    public async Task SeedAsync(
        AppDbContext dbContext,
        UserManager<AppUser> userManager,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Seeding database.");

        if (!userManager.Users.Any())
        {
            var users = GetPreconfiguredUsers();

            _logger.LogInformation("Seeding {count} application users.", users.Count);

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "rootdev");
            }


            await dbContext.SaveChangesAsync(cancellationToken);
        }

        static List<AppUser> GetPreconfiguredUsers()
            => [
              new () {
                    UserName = "root@dev.com",
                    Email = "root@dev.com",
                    Name = "Root Dev"
                }
                ];

    }
}
