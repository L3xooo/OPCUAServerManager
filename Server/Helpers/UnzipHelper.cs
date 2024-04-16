using System;
using System.IO;
using System.IO.Compression;

namespace OPCUAServerManager.Helpers
{
	public class UnzipHelper
	{
		public static bool UnzipAndDelete(string zipFilePath, string extractPath)
		{
			try
			{
				if (Directory.Exists(extractPath))
				{
					Directory.Delete(extractPath, true);
				}
				else
				{
					Directory.CreateDirectory(extractPath);
				}
				ZipFile.ExtractToDirectory(zipFilePath, extractPath);
				File.Delete(zipFilePath);
				Console.WriteLine("File was successfully extracted to: " + extractPath);
				return true;
			}
			catch (Exception ex)
			{
				Console.WriteLine("Error extracting or deleting the zip file: " + ex.Message);
				return false;
			}
		}
	}
}