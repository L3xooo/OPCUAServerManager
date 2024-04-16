using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using OPCUAServerManager.Models;

namespace OPCUAServerManager.Services
{
	public interface IOPCUAServerService
	{
		Task<List<OPCUAServer>> GetAllServers();
		Task<OPCUAServer?> AddServer(OPCUAServer data, string url);
		Task DeleteServer(int id);
		Task<OPCUAServer> RunServer(int id);
		Task<OPCUAServer> StopServer(int id);
		Task<string?> GetServer(int id);
	}
}
