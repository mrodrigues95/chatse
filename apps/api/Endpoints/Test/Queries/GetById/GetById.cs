namespace Api.Endpoints.Test.Queries.GetById;

public class GetById : EndpointWithoutRequest<Response>
{
    public override void Configure()
    {
        Get("/api/users/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        await SendAsync(new()
        {
            FullName = "john doe",
        });
    }
}
