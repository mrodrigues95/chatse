namespace Api.Data;

public sealed class AppDbContextSeeder : IAppDbContextSeeder
{
    private readonly AppDbContext _ctx;
    private readonly UserManager<AppUser> _userManager;

    public AppDbContextSeeder(AppDbContext ctx, UserManager<AppUser> userManager)
    {
        _ctx = ctx;
        _userManager = userManager;
    }

    public async Task SeedAsync()
    {
        if ((await _ctx.Database.GetPendingMigrationsAsync()).Any())
        {
            await _ctx.Database.MigrateAsync();
        }

        if (!await _userManager.Users.AnyAsync())
        {
            foreach (var user in GetPreconfiguredUsers())
            {
                await _userManager.CreateAsync(user, "rootdev");
            }

            await _ctx.SaveChangesAsync();
        }
    }

    private IEnumerable<AppUser> GetPreconfiguredUsers()
    {
        return new List<AppUser>() {
                new () {
                    UserName = "root@dev.com",
                    Email = "root@dev.com"
                }
            };
    }
}
