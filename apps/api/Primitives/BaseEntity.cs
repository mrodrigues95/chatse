namespace Api.Primitives;

public abstract class BaseEntity : BaseEntity<int>
{
    protected BaseEntity(string publicIdPrefix) : base(publicIdPrefix)
    {
    }
}

public abstract class BaseEntity<TId> : IEntity<TId>
{
    public TId Id { get; protected set; } = default!;
    public PublicId PublicId { get; } = default!;

    protected BaseEntity(string publicIdPrefix)
    {
        PublicId = new(publicIdPrefix);
    }
}
