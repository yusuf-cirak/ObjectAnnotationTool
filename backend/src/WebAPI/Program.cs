using System.Security.Claims;
using System.Text.Json;
using FastEndpoints;
using FastEndpoints.Swagger;
using WebAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.WithOrigins("http://localhost:4200","https://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
// Accept anything from header, accept any method. Only on localhost:4200 and http & https protocol 

builder.Services.AddFastEndpoints();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddSwaggerDoc(); //add this

builder.Services.AddRepositoryServices();

builder.Services.AddDbContextServices(builder.Configuration); // Extension method

builder.Services.AddBusinessRuleServices();

builder.Services.AddAuthorization();


var app = builder.Build();


// Configure the HTTP request pipeline.

app.UseCors();

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseFastEndpoints(c => {
    c.Endpoints.RoutePrefix = "api";
    //c.Serializer.Options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});
app.UseOpenApi();

app.UseSwaggerUi3(s => s.ConfigureDefaults()); // Method from FastEndpoints.Swagger



app.Run();
