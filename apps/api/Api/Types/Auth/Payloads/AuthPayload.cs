namespace Api.Types.Auth.Payloads;

public sealed class AuthPayload
{
    public AppUser? User { get; }
    public bool IsLoggedIn { get; }

    public AuthPayload(AppUser user, bool isLoggedIn)
    {
        User = user;
        IsLoggedIn = isLoggedIn;
    }

    public AuthPayload(bool isLoggedIn)
    {
        IsLoggedIn = isLoggedIn;
    }
}
