using Api.Types.Auth.Exceptions;
using Api.Types.Auth.Inputs;
using Api.Types.Auth.Payloads;

namespace Api.Types.Auth;

[MutationType]
public sealed class AuthMutations(ILogger<AuthMutations> logger)
{
    [Error<SignUpNewUserException>]
    public async Task<AuthPayload> SignUpAsync(
        SignUpInput input,
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager)
    {
        // TODO: When the email confirmation flow is implemented, this should be moved to the appropriate methods.
        var emailAlreadyExists = await userManager.FindByEmailAsync(input.Email);
        if (emailAlreadyExists is not null)
        {
            throw new SignUpNewUserException();
        }

        var user = new AppUser
        {
            Name = input.Name,
            UserName = input.Email,
            Email = input.Email
        };

        var createUserResult = await userManager.CreateAsync(user, input.Password);
        if (!createUserResult.Succeeded)
        {
            logger.LogError("Unable to create new user -> name: {name}, email: {email}. Result: {result}",
                input.Name, input.Email, createUserResult);
            throw new SignUpNewUserException();
        }

        var loginUserResult = await signInManager.PasswordSignInAsync(user, input.Password, true, false);
        if (!loginUserResult.Succeeded)
        {
            logger.LogError("Unable to login new user -> name: {name}, email: {email}. Result: {result}",
                input.Name, input.Email, loginUserResult);
            throw new SignUpNewUserException();
        }

        return new(user, true);
    }

    [Error<LoginUserException>]
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

        return new(user, true);

    }

    public async Task<AuthPayload> LogoutAsync(SignInManager<AppUser> signInManager)
    {
        await signInManager.SignOutAsync();
        return new(false);
    }
}
