using Api.Extensions;
using FastEndpoints.Swagger;

var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();
builder.AddIdentityServices();

builder.Services.AddFastEndpoints();
builder.Services.SwaggerDocument(opts => opts.ShortSchemaNames = true);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<IAppDbContextSeeder>();

app.UseFastEndpoints();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerGen();
    await seeder.SeedAsync();
}

app.UseAuthentication();
app.UseAuthorization();
// app.UseHttpsRedirection();

app.Map("/", () => Results.Redirect("/swagger"));

app.Run();
