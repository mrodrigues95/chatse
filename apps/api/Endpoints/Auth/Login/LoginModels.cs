using System.ComponentModel.DataAnnotations;

namespace Api.Endpoints.Auth.Login;

public class LoginEndpointSummary : Summary<LoginEndpoint>
{
    public LoginEndpointSummary()
    {
        Summary = "Authenticate a user with Cookie Based authentication.";
        Description = "Creates an authentication cookie that allows users to access other API endpoints.";
        Response<LoginResponse>(200, "The authenticated user.");
        Response<ErrorResponse>(400, "Validation failed.");
        Response<ErrorResponse>(401, "Invalid credentials.");
    }
}

public class LoginRequest
{
    /// <summary>
    /// The email address of the user wishing to authenticate.
    /// </summary>
    public required string Email { get; set; }
    /// <summary>
    /// The password of the user wishing to authenticate.
    /// </summary>
    public required string Password { get; set; }
}

public class LoginResponse
{
    /// <summary>
    /// The unique identifier for the authenticated user.
    /// </summary>
    public required int Id { get; set; }

    /// <summary>
    /// The email address for the authenticated user.
    /// </summary>
    public required string Email { get; set; }

    /// <summary>
    /// If <c>true</c>, two-factor authenticated is enabled for the authenticated user.
    /// </summary>
    public required bool IsTwoFactorEnabled { get; set; }
}

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
