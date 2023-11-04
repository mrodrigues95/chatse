using Api.Types.Auth.Exceptions;
using Api.Types.Auth.Inputs;
using Api.Types.Auth.Payloads;

namespace Api.Types.Auth;

[MutationType]
public sealed class AuthMutations
{
    private readonly ILogger<AuthMutations> _logger;

    public AuthMutations(ILogger<AuthMutations> logger)
    {
        _logger = logger;
    }

    [Error<SignupNewUserException>]
    public async Task<AuthPayload> SignUpAsync(
        SignupInput input,
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager)
    {
        var emailAlreadyExists = await userManager.FindByEmailAsync(input.Email);
        if (emailAlreadyExists is not null)
        {
            throw new SignupNewUserException();
        }

        var user = new AppUser
        {
            // TODO: Add name to `AppUser`.
            // Name = input.Name,
            Email = input.Email
        };

        var createUser = await userManager.CreateAsync(user, input.Password);
        if (!createUser.Succeeded)
        {
            _logger.LogError("Unable to create new user for: {user}. Result: {result}", user, createUser);
            throw new SignupNewUserException();
        }

        var loginUser = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
        if (!loginUser.Succeeded)
        {
            _logger.LogError("Unable to sign in user for {user}. Result: {result}", user, loginUser);
            throw new SignupNewUserException();
        }

        return new AuthPayload(user, true);
    }


    [Error(typeof(LoginUserException))]
    public async Task<AuthPayload> LoginAsync(
        LoginInput input,
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager)
    {
        var user = await userManager.FindByEmailAsync(input.Email) ?? throw new LoginUserException();

        var result = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
        if (!result.Succeeded)
        {

            throw new LoginUserException();
        }

        return new AuthPayload(user, true);

    }

    public async Task<AuthPayload> LogoutAsync(SignInManager<AppUser> signInManager)
    {
        await signInManager.SignOutAsync();
        return new AuthPayload(false);
    }
}
