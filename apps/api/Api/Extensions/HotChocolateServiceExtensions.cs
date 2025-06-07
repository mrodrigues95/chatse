using System.Net;
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
            // .AddHttpResultSerializer<CustomHttpResultSerializer>()
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
            IRequestBuilder requestBuilder,
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

    // private sealed class CustomHttpResultSerializer : DefaultHttpResultSerializer
    // {
    //     public override HttpStatusCode GetStatusCode(IExecutionResult result)
    //     {
    //         if (result is not IQueryResult { Data: null, Errors.Count: > 0 } queryResult)
    //         {
    //             return base.GetStatusCode(result);
    //         }

    //         return queryResult.Errors switch
    //         {
    //             var errors when
    //                 errors.Any(x => x.Code == "AUTH_NOT_AUTHENTICATED") =>
    //                 HttpStatusCode.Unauthorized,
    //             var errors when
    //                 errors.Any(x => x.Code == "AUTH_NOT_AUTHORIZED") =>
    //                 HttpStatusCode.Forbidden,
    //             _ => base.GetStatusCode(result)
    //         };
    //     }
    // }
}
