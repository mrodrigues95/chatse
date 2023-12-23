namespace Api.Types.Auth.Exceptions;

public sealed class SignUpNewUserException : Exception
{
    public SignUpNewUserException() : base("There was a problem registering your account.") { }
}
