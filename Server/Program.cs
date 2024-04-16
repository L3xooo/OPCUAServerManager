using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using OPCUAServerManager.Data;
using OPCUAServerManager.Services;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Configuration.AddEnvironmentVariables();
builder.Services.AddControllers();
var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddScoped<IOPCUAServerService, OPCUAServerService>();

builder.Services.AddDbContext<OPCUAServerContext>(options =>
{
	options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddSpaStaticFiles(configuration =>
{
	configuration.RootPath = "wwwroot";
});

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
		policy =>
		{
			policy.WithOrigins("http://localhost:5173", "http://opcua-manager-ui:5173")
			.AllowAnyMethod()
			.AllowAnyHeader();
		});
});

var app = builder.Build();

var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();

lifetime.ApplicationStopping.Register(() =>
{
	Console.WriteLine("Application Stopping!");
	var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<OPCUAServerContext>();
	var servers = dbContext.OPCUAServers.ToList();
	foreach (var server in servers)
	{
		if (server.ProcessID != 0)
		{
			try
			{
				Process process = Process.GetProcessById(server.ProcessID);
				Console.WriteLine($"Killing proces {server.ProcessID} which is running OPCUA: {server.Name}!");
				process.Kill();
			}
			catch (Exception ex)
			{
				Console.WriteLine("Error occured: ", ex);
			}
			server.ProcessID = 0;
			server.Online = false;
		}
	}
	dbContext.SaveChanges();
});

lifetime.ApplicationStarted.Register(() =>
{
	Console.WriteLine("Application Starting!");
	var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<OPCUAServerContext>();
	var servers = dbContext.OPCUAServers.ToList();
	foreach (var server in servers)
	{
		if (server.ProcessID != 0)
		{
			try
			{
				Process process = Process.GetProcessById(server.ProcessID);
				Console.WriteLine($"Killing proces {server.ProcessID}!");
				process.Kill();
			}
			catch (Exception ex)
			{
				Console.WriteLine("Error occured: ", ex);
			}
			server.ProcessID = 0;
			server.Online = false;
		}
	}
	dbContext.SaveChanges();
});

using (var scope = app.Services.CreateScope())
{
	var dbContext = scope.ServiceProvider
		.GetRequiredService<OPCUAServerContext>();
	// Here is the migration executed
	dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
//app.UseStaticFiles();
app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);

app.MapControllerRoute(
	name: "default",
	pattern: "api/{controller=OPCUAServer}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();