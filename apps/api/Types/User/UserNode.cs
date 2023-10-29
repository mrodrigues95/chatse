namespace Api.Types.User;

[Node]
[ExtendObjectType(typeof(AppUser))]
public sealed class UserNode
{
    [ID]
    public int GetId([Parent] AppUser user) => user.Id;
}
