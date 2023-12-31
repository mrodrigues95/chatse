namespace Api.Types.Auth.Inputs;

public record SignUpInput(string Name, string Email, string Password);

public class SignUpInputValidator : AbstractValidator<SignUpInput>
{
    public SignUpInputValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(70);
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
    }
}
