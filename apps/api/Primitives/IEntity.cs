namespace Api.Primitives;

public interface IEntity
{
    public PublicId PublicId { get; }
}

public interface IEntity<TId> : IEntity
{
    public TId Id { get; }
}
