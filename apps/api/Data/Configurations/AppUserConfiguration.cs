using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Data.Configurations;

public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Guid)
            .IsRequired();

        builder.Property(u => u.Name)
            .HasMaxLength(70)
            .IsRequired();

        builder.Property(u => u.Email)
            .HasMaxLength(256)
            .IsRequired();

        builder.Property(u => u.CreatedAt)
            .HasDefaultValueSql("now()")
            .ValueGeneratedOnAdd()
            .IsRequired();

        builder.Property(u => u.UpdatedAt)
            .HasDefaultValueSql("now()")
            .IsRequired();

        builder
            .HasIndex(u => u.Guid)
            .IsUnique();
    }
}
