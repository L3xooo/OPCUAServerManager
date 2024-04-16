using System.Diagnostics;

namespace OPCUAServerManager.Helpers
{
	public static class ScriptHelper
	{
		public static async Task<string> ExecuteScriptAsync(string scriptPath, string arguments = "")
		{
			return await Task.Run(() => ExecuteScript(scriptPath, arguments));
		}
		public static string ExecuteScript(string scriptPath, string arguments = "")
		{
			using (Process process = new Process())
			{
				Console.WriteLine($"Executing {scriptPath} in backend!");
				Console.WriteLine($"Arguments {arguments}");

				string fileName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ? "cmd.exe" : "sh";
				string args = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ? $"/c {scriptPath} {arguments}" : $"{scriptPath} {arguments}";

				ProcessStartInfo startInfo = new ProcessStartInfo
				{
					FileName = fileName, //cmd.exe
					WorkingDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Scripts"),
					Arguments = args, // $"/c {scriptPath} {arguments}"
					CreateNoWindow = true,
					RedirectStandardOutput = true,
					RedirectStandardError = true,
					UseShellExecute = false,
				};


				process.StartInfo = startInfo;
				process.Start();

				string output = process.StandardOutput.ReadToEnd();
				Console.WriteLine(output);

				if (process.HasExited)
				{
					Console.WriteLine("Process has exited.");
				}
				else
				{
					Console.WriteLine("Process is still running.");
				}

				process.Close();
				return output;
			}
		}
	}
}
