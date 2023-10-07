using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.Endpoints.Auth.Logout;

public class LogoutEndpointSummary : Summary<LogoutEndpoint>
{
    public LogoutEndpointSummary()
    {
        Summary = "Log out a user from an existing session.";
        Description = "Terminates a users session which disallows them from making subsequent requests to most other API endpoints.";
        Response<NoContent>(204, "User successfully logged out.");
        Response<UnauthorizedHttpResult>(401, "Invalid session.");
    }
}
