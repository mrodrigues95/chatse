namespace Api.Primitives;

public abstract class AuditableEntity(string publicIdPrefix) : AuditableEntity<int>(publicIdPrefix)
{
}

public abstract class AuditableEntity<TId>(string publicIdPrefix) : BaseEntity<TId>(publicIdPrefix), IAuditableEntity
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
