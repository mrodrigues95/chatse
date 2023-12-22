namespace Api.Primitives;

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
