using System;
using System.IO;
using System.Diagnostics;
using System.Threading.Tasks;

namespace OPCUAServerManager.Helpers
{
	public static class ServerHelper
	{
		private static string ServerFileName = "OPCUA-Server.dll";

		public static async Task<int> RunOPCUAServerAsync(string serverPath)
		{
			return await Task.Run(() => RunOPCUAServer(serverPath));
		}

		private static int RunOPCUAServer(string serverPath)
		{
			using (Process process = new Process())
			{
				Console.WriteLine("Starting Server from backend!");
				Console.WriteLine(serverPath);
				ProcessStartInfo startInfo = new ProcessStartInfo
				{
					FileName = "dotnet",
					WorkingDirectory = serverPath,
					Arguments = ServerFileName,
					CreateNoWindow = true,
				};

				process.StartInfo = startInfo;
				process.Start();

				return process.Id;
			}
		}
	}
}
