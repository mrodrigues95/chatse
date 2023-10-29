namespace Api.Types.Auth.Exceptions;

public sealed class SignupNewUserException : Exception
{
    public SignupNewUserException() : base("There was a problem registering your account.") { }
}
