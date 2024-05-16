namespace Api.Primitives;

interface IPublicId
{
    public string Value { get; }
    public string Prefix { get; }
    public string NewPublicId();
}
