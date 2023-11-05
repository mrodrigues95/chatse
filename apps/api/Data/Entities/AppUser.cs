namespace Api.Data.Entities;

public class AppUser : IdentityUser<int>
{
    public Guid Guid { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public override required string? Email { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
