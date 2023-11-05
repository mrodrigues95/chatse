namespace Api.Types.Auth.Inputs;

public record SignupInput(string Name, string Email, string Password);

public class SignupInputValidator : AbstractValidator<SignupInput>
{
    public SignupInputValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(70);
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
    }
}
