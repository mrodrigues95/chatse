namespace Api.Primitives;

public abstract class AuditableEntity : AuditableEntity<int>
{
    protected AuditableEntity(string publicIdPrefix) : base(publicIdPrefix)
    {
    }
}

public abstract class AuditableEntity<TId> : BaseEntity<TId>, IAuditableEntity
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    protected AuditableEntity(string publicIdPrefix) : base(publicIdPrefix)
    {
    }
}
