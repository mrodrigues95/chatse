using Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();
builder.AddHotChocolateServices();
builder.AddIdentityServices();

var app = builder.Build();

app.UseCors("dev");

app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.MapGraphQL("/api/graphql");

app.Map("/", () => Results.Redirect("/api/graphql"));

await app.RunWithGraphQLCommandsAsync(args);
