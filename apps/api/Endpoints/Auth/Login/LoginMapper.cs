namespace Api.Endpoints.Auth.Login;

public class LoginMapper : Mapper<LoginRequest, LoginResponse, AppUser>
{
    public override LoginResponse FromEntity(AppUser user) => new()
    {
        Id = user.Id,
        Email = user.Email!,
        IsTwoFactorEnabled = user.TwoFactorEnabled
    };
}
