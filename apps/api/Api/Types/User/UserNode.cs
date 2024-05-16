namespace Api.Types.User;

public sealed class UserType : ObjectType<AppUser>
{
    protected override void Configure(IObjectTypeDescriptor<AppUser> descriptor)
    {
        descriptor.BindFieldsExplicitly();

        descriptor
            .Field(x => x.Email)
            .Type<NonNullType<StringType>>();

        descriptor
            .Field(u => u.Name)
            .Type<NonNullType<StringType>>();
    }
}

[Node]
[ExtendObjectType<UserType>]
public sealed class UserNode
{
    [ID]
    public string GetId([Parent] AppUser user) => user.PublicId.Value;
}
