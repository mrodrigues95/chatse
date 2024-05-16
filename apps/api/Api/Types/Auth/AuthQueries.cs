namespace Api.Types.Auth;

[QueryType]
public sealed class AuthQueries
{
    [UseSingleOrDefault]
    [UseProjection]
    public IQueryable<AppUser>? GetMe([GlobalState] int? userId, AppDbContext ctx) =>
        userId is null ? null : ctx.Users.Where(x => x.Id == userId);
}
