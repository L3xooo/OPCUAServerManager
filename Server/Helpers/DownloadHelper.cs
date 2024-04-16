using System;
using System.IO;
using System.Net.Http;
using System.IO.Compression;
using System.Threading.Tasks;

namespace OPCUAServerManager.Helpers
{
	public static class FileDownloader
	{
		public static async Task<string?> DownloadFile(string url, string destinationFilePath = "Servers")
		{
			try
			{
				string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Servers");
				if (!Directory.Exists(directoryPath))
				{
					Directory.CreateDirectory(directoryPath);
				}
				string filePath = Path.Combine(directoryPath, "OPCUAServer.zip");

				using (HttpClient client = new HttpClient())
				{
					using (HttpResponseMessage response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead))
					{
						response.EnsureSuccessStatusCode();

						using (Stream contentStream = await response.Content.ReadAsStreamAsync())
						using (FileStream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None))
						{
							await contentStream.CopyToAsync(fileStream);
						}
					}
				}
				return filePath;
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error downloading file: {ex.Message}");
				return null;
			}
		}
	}
}
