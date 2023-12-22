using System.Diagnostics;

namespace Api.Data;

internal sealed class AppDbContextInitializer(
    IServiceProvider serviceProvider,
    ILogger<AppDbContextInitializer> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        using var scope = serviceProvider.CreateScope();
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

        logger.LogInformation(
            "Database initialization completed after {time}ms.", sw.ElapsedMilliseconds);
    }

    public async Task SeedAsync(
        AppDbContext dbContext,
        UserManager<AppUser> userManager,
        CancellationToken cancellationToken)
    {
        logger.LogInformation("Seeding database.");

        if (!userManager.Users.Any())
        {
            var users = GetPreconfiguredUsers();

            logger.LogInformation("Seeding {count} application users.", users.Count);

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "rootdev");
            }


            await dbContext.SaveChangesAsync(cancellationToken);
        }

        static List<AppUser> GetPreconfiguredUsers()
            => [
                new()
                {
                    UserName = "root@dev.com",
                    Email = "root@dev.com",
                    Name = "Root Dev"
                }
            ];

    }
}
