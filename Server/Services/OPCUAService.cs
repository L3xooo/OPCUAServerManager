using System;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using OPCUAServerManager.Data;
using OPCUAServerManager.Models;
using OPCUAServerManager.Helpers;

namespace OPCUAServerManager.Services
{
	public class OPCUAServerService : IOPCUAServerService
	{
		private readonly OPCUAServerContext _db;
		private readonly ILogger<OPCUAServerService> _logger;
		private readonly string ProjectPath = Directory.GetCurrentDirectory();
		private readonly string DestinationFileForServers = "Servers/";

		public OPCUAServerService(OPCUAServerContext db, ILogger<OPCUAServerService> logger)
		{
			_db = db;
			_logger = logger;
		}

		public async Task<List<OPCUAServer>> GetAllServers()
		{
			return await _db.OPCUAServers.ToListAsync();
		}

		public async Task<OPCUAServer?> AddServer(OPCUAServer data, string url)
		{
			Uri urn = new Uri(url);
			string path = urn.AbsolutePath;
			string uri = Environment.GetEnvironmentVariable("ASPNETCORE_AAS_SERVER_SERVICE_URL") + path;

			_logger.LogInformation("Adding a new server to the database...");

			var existingItem = _db.OPCUAServers.FirstOrDefault(t => t.Name == data.Name);

			if (existingItem != null || string.IsNullOrEmpty(data.FileName))
			{
				throw new InvalidOperationException("Bad request: Item with the same identifier already exists or URL is empty or null");
			}

			string? downloadResult = await DownloadHelper.DownloadFile(uri);
			if (downloadResult == null)
			{
				_logger.LogError($"Failed to download file for {data.Name}");
				throw new Exception("Error downloading the file");
			}

			_logger.LogInformation($"File downloaded successfully as {data.Name}");
			if (!UnzipHelper.UnzipAndDelete(downloadResult, DestinationFileForServers + data.Name))
			{
				throw new Exception("Error durring unziping the file");
			}

			_db.OPCUAServers.Add(data);
			await _db.SaveChangesAsync();
			return data;
		}

		public async Task DeleteServer(int id)
		{
			_logger.LogInformation("Deleting server from the database and file system...");
			var item = await _db.OPCUAServers.FindAsync(id);

			if (item == null)
			{
				throw new KeyNotFoundException("Server not found in the database.");
			}

			if (item.Online ?? false)
			{
				throw new InvalidOperationException("Server is currently online and cannot be deleted.");
			}

			try
			{
				Directory.Delete(DestinationFileForServers + item.Name, true);
				_logger.LogInformation($"Server folder '{item.Name}' deleted successfully.");
			}
			catch (Exception ex)
			{
				throw new Exception($"Error deleting server folder '{item.Name}': {ex.Message}");
			}

			_db.OPCUAServers.Remove(item);
			await _db.SaveChangesAsync();
		}

		public async Task<OPCUAServer> RunServer(int id)
		{
			_logger.LogInformation($"Running server with ID {id}...");

			var server = _db.OPCUAServers.Find(id);
			if (server == null)
			{
				throw new KeyNotFoundException("Server not found in the database.");
			}

			server.Online = true;

			string serverDir = Path.Combine(ProjectPath, "Servers", $"{server.Name}");

			try
			{
				int processId = await ServerHelper.RunOPCUAServerAsync(serverDir);
				server.ProcessID = processId;
				_logger.LogInformation("Server starting with process ID: {ProcessId}", processId);
				_db.SaveChanges();
				return server;
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error running the server: {ex.Message}");
				throw;
			}
		}

		public async Task<OPCUAServer> StopServer(int id)
		{
			_logger.LogInformation("Stopping server from the backend...");

			var server = _db.OPCUAServers.Find(id);
			if (server == null)
			{
				throw new KeyNotFoundException("Server not found in the database.");
			}

			try
			{
				Process process = Process.GetProcessById(server.ProcessID);
				Console.WriteLine($"Process with ID {server.ProcessID} was killed.");
				process.Kill();
				process.Close();
				server.ProcessID = 0;
				server.Online = false;
				_db.SaveChanges();
				return server;
			}
			catch (ArgumentException)
			{
				Console.WriteLine($"No process found with ID {server.ProcessID}.");
				throw new InvalidOperationException("No process found with the specified ID.");
			}
		}

		public async Task<string?> GetServer(int id)
		{
			_logger.LogInformation($"Getting Server from Backend with id {id}!");

			var server = _db.OPCUAServers.Find(id);
			if (server == null)
			{
				return null;
			}

			try
			{
				Process process = Process.GetProcessById(server.ProcessID);
				_logger.LogInformation($"Process ID: {server.ProcessID}");
				string result = await ScriptHelper.ExecuteScriptAsync(Environment.GetEnvironmentVariable("DETAIL_SCRIPT_NAME") ?? "getServerDetail.sh", process.Id.ToString());
				_logger.LogInformation(result);
				return result;
			}
			catch (ArgumentException)
			{
				_logger.LogInformation($"No process found with ID {server.ProcessID}.");
				return null;
			}
		}
	}
}


