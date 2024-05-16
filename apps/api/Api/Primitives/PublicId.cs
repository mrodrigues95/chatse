namespace Api.Primitives;

// TODO: Intercept `SaveChangesAsync()` when a collision occurs and attempt to regenerate a new id.
// The likely hood of this happening is really low but it's still something we can prevent.
public class PublicId : IPublicId
{
    public string Value { get; private set; } = default!;
    public string Prefix { get; }

    public PublicId(string prefix)
    {
        Prefix = prefix;
        NewPublicId();
    }

    public string NewPublicId()
    {
        Value = PublicIdGenerator.GenerateByPrefix(Prefix);
        return Value;
    }

    public string WithoutPrefix => Value.Split(Prefix).Last();
}
