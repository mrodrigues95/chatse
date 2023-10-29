namespace Api.Types.Auth;

[QueryType]
public class AuthQueries
{
    public async Task<AppUser?> GetMeAsync(
        [GlobalState] int? userId,
        AppDbContext ctx,
        CancellationToken cancellationToken) =>
        userId is null ? null : await ctx.Users.Where(x => x.Id == userId).SingleOrDefaultAsync(cancellationToken);
}
