namespace Api.Endpoints.Auth.Login;

public class Login : Endpoint<LoginRequest, LoginResponse, LoginMapper>
{
    public override void Configure()
    {
        Post("/auth/login");
        AllowAnonymous();
    }

    public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
    {
        AppUser user = new() { };
        Response = Map.FromEntity(user);
        await SendAsync(Response);
    }
}
