using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Api.Data.Interceptors;

public sealed class PublicIdInterceptor : SaveChangesInterceptor
{
    // TODO: Logger.
    public override Task SaveChangesFailedAsync(
        DbContextErrorEventData eventData,
        CancellationToken cancellationToken = default)
    {
        return base.SaveChangesFailedAsync(eventData, cancellationToken);
    }

    public override void SaveChangesFailed(DbContextErrorEventData eventData)
    {
        base.SaveChangesFailed(eventData);
    }

    private void TryGeneratePublicId(DbContext? context)
    {
        if (context is null)
        {
            return;
        }

        // TODO: Generate new id's on a unique constraint failure.
    }
}
