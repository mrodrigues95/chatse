namespace Api.Endpoints.Auth.Login;

public class LoginEndpoint : Endpoint<LoginRequest, LoginResponse, LoginMapper>
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

    public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
    {
        var user = await _userManager.FindByEmailAsync(req.Email);
        if (user is null)
        {
            ThrowError("Invalid credentials", 401);
        };

        var result = await _signInManager.PasswordSignInAsync(user, req.Password, true, false);
        if (!result.Succeeded)
        {
            ThrowError("Invalid credentials", 401);
        };

        Response = Map.FromEntity(user);
        await SendAsync(Response);
    }
}
