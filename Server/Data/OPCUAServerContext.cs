using Microsoft.EntityFrameworkCore;
using OPCUAServerManager.Models;

namespace OPCUAServerManager.Data
{
	public class OPCUAServerContext : DbContext
	{

		public OPCUAServerContext(DbContextOptions<OPCUAServerContext> options) : base(options)
		{
		}
		public DbSet<OPCUAServer> OPCUAServers { get; set; }
	}
}