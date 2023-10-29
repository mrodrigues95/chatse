namespace Api.Types.Auth.Inputs;

public record LoginInput(string Email, string Password);


// public class LoginInputValidator : AbstractValidator<LoginInput>
// {
//     public LoginInputValidator()
//     {
//         RuleFor(x => x.Email).NotEmpty().EmailAddress();
//         RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
//     }
// }
