using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.Endpoints.Auth.Login;

public class LoginEndpointSummary : Summary<LoginEndpoint>
{
    public LoginEndpointSummary()
    {
        Summary = "Authenticate a user with Cookie Based authentication.";
        Description = "Creates an authentication cookie that allows users to access other API endpoints.";
        Response<LoginResponse>(200, "The authenticated user.");
        Response<ErrorResponse>(400, "Validation failed.");
        Response<UnauthorizedHttpResult>(401, "Invalid credentials.");
    }
}

/// <param name="Email">The email address of the user wishing to authenticate.</param>
/// <param name="Password">The password of the user wishing to authenticate.</param>
public record LoginRequest(string Email, string Password);

/// <param name="Id">The unique identifier for the user.</param>
/// <param name="Email">The email address for the user.</param>
/// <param name="IsTwoFactorEnabled">If <c>true</c>, two-factor authenticated is enabled for the user.</param>
public record LoginResponse(int Id, string Email, bool IsTwoFactorEnabled);

public class LoginValidator : Validator<LoginRequest>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6);
    }
}
