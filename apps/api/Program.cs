using FastEndpoints.Swagger;

var builder = WebApplication.CreateBuilder(args);

// Configure the database.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(opts =>
{
    opts.UseNpgsql(connectionString);
    opts.UseSnakeCaseNamingConvention();
});

// Configure identity.
builder.Services.AddIdentityCore<AppUser>()
    .AddRoles<IdentityRole<int>>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddFastEndpoints();
builder.Services.SwaggerDocument();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseFastEndpoints();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerGen();
}

app.Map("/", () => Results.Redirect("/swagger"));

// app.UseHttpsRedirection();

app.Run();
