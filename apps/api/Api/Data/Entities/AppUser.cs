namespace Api.Data.Entities;

public class AppUser : IdentityUser<int>, IEntity<int>, IAuditableEntity
{
    public PublicId PublicId { get; } = default!;
    public required string Name { get; set; }
    public override required string? Email { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public AppUser()
    {
        PublicId = new("usr_");
    }
}
