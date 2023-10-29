namespace Api.Types.Auth.Exceptions;

public sealed class LoginUserException : Exception
{
    public LoginUserException() : base("Invalid email or password.") { }
}
