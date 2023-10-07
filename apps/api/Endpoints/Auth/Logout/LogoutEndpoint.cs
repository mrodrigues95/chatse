using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.Endpoints.Auth.Logout;

public class LogoutEndpoint : EndpointWithoutRequest<Results<NoContent, UnauthorizedHttpResult>>
{
    private readonly SignInManager<AppUser> _signInManager;

    public LogoutEndpoint(SignInManager<AppUser> signInManager)
    {
        _signInManager = signInManager;
    }

    public override void Configure()
    {
        Delete("/auth/logout");
    }

    public override async Task<Results<NoContent, UnauthorizedHttpResult>> ExecuteAsync(CancellationToken ct)
    {
        await _signInManager.SignOutAsync();
        return TypedResults.NoContent();
    }
}
