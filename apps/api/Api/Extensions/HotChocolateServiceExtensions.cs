using System.Security.Claims;
using HotChocolate.Execution;

namespace Api.Extensions;

public static class HotChocolateServiceExtensions
{
    public static WebApplicationBuilder AddHotChocolateServices(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddGraphQLServer()
            .AddTypes()
            .AddFiltering()
            .AddSorting()
            .AddProjections()
            .AddAuthorization()
            .AddGlobalObjectIdentification()
            .AddMutationConventions()
            .AddFairyBread()
            .AddHttpRequestInterceptor<CustomHttpRequestInterceptor>()
            .AddInstrumentation(o =>
                {
                    o.RenameRootActivity = true;
                    o.IncludeDocument = true;
                })
            .RegisterDbContextFactory<AppDbContext>()
            .ModifyOptions(o =>
            {
                o.EnableDefer = true;
            })
            .ModifyPagingOptions(o =>
            {
                o.MaxPageSize = 100;
                o.IncludeTotalCount = false;
            });

        return builder;
    }

    private sealed class CustomHttpRequestInterceptor : DefaultHttpRequestInterceptor
    {
        public async override ValueTask OnCreateAsync(
            HttpContext context,
            IRequestExecutor requestExecutor,
            OperationRequestBuilder requestBuilder,
            CancellationToken cancellationToken)
        {
            int? userId = null;
            string? userEmail = null;

            if (context.User.Identity?.IsAuthenticated ?? false)
            {
                var userIdClaim = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
                userId = int.TryParse(userIdClaim, out var id) ? id : null;
                userEmail = context.User.FindFirstValue(ClaimTypes.Email);
            }

            requestBuilder.TryAddGlobalState("userId", userId);
            requestBuilder.TryAddGlobalState("userEmail", userEmail);

            await base.OnCreateAsync(context, requestExecutor, requestBuilder, cancellationToken);
        }
    }
}
