using GreenDonut.Data;

namespace Api.Types.User;

public static class UserDataLoaders
{
    [DataLoader]
    public static async Task<IReadOnlyDictionary<string, AppUser>> GetUserByIdAsync(
        IReadOnlyList<string> ids,
        AppDbContext ctx,
        ISelectorBuilder selector,
        CancellationToken cancellationToken)
    {
        return await ctx.Users
            .AsNoTracking()
            .Where(u => ids.Contains(u.PublicId.Value))
            .Select(u => u.Id, selector)
            .ToDictionaryAsync(u => u.PublicId.Value, cancellationToken);
    }
}
