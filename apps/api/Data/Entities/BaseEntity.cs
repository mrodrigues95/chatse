namespace Api.Data.Entities;

public abstract class BaseEntity
{
    public int Id { get; set; }
    public Guid Guid { get; set; } = Guid.NewGuid();
}
