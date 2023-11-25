using System.Security.Claims;
using HotChocolate.Execution;
using HotChocolate.Types.Pagination;

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
            .RegisterService<UserManager<AppUser>>(ServiceKind.Resolver)
            .RegisterService<SignInManager<AppUser>>(ServiceKind.Resolver)
            .RegisterDbContext<AppDbContext>()
            .ModifyOptions(o =>
            {
                o.EnableDefer = true;
            })
            .SetPagingOptions(new PagingOptions { MaxPageSize = 100, IncludeTotalCount = false });

        return builder;
    }

    private sealed class CustomHttpRequestInterceptor : DefaultHttpRequestInterceptor
    {
        public async override ValueTask OnCreateAsync(
            HttpContext context,
            IRequestExecutor requestExecutor,
            IQueryRequestBuilder requestBuilder,
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
