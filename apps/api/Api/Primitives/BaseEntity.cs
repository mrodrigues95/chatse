namespace Api.Primitives;

public abstract class BaseEntity(string publicIdPrefix) : BaseEntity<int>(publicIdPrefix)
{
}

public abstract class BaseEntity<TId>(string publicIdPrefix) : IEntity<TId>
{
    public TId Id { get; protected set; } = default!;
    public PublicId PublicId { get; } = new PublicId(publicIdPrefix);
}
