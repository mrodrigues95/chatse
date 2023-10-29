using Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();
builder.AddHotChocolateServices();
builder.AddIdentityServices();

var app = builder.Build();

using var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<IAppDbContextSeeder>();

app.UseRouting();
app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.MapGraphQL("/api/graphql");

if (app.Environment.IsDevelopment())
{
    await seeder.SeedAsync();
}

app.Map("/", () => Results.Redirect("/api/graphql"));

app.RunWithGraphQLCommands(args);
