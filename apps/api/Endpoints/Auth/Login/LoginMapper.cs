namespace Api.Endpoints.Auth.Login;

public class LoginMapper : Mapper<LoginRequest, LoginResponse, AppUser>
{
    public override LoginResponse FromEntity(AppUser user) => new()
    {
        Message = "test"
    };
}
