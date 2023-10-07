using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.Endpoints.Auth.Login;

public class LoginEndpoint : Endpoint<LoginRequest, Results<Ok<LoginResponse>, UnauthorizedHttpResult>, LoginMapper>
{
    private readonly SignInManager<AppUser> _signInManager;
    private readonly UserManager<AppUser> _userManager;

    public LoginEndpoint(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    public override void Configure()
    {
        Post("/auth/login");
        AllowAnonymous();
    }

    public override async Task<Results<Ok<LoginResponse>, UnauthorizedHttpResult>> ExecuteAsync(
        LoginRequest req,
        CancellationToken ct)
    {
        var user = await _userManager.FindByEmailAsync(req.Email);
        if (user is null)
        {
            return TypedResults.Unauthorized();
        };

        var result = await _signInManager.PasswordSignInAsync(user, req.Password, true, false);
        if (!result.Succeeded)
        {
            return TypedResults.Unauthorized();
        };

        return TypedResults.Ok(Map.FromEntity(user));
    }
}
