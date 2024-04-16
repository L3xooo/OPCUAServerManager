namespace OPCUAServerManager.Models
{
	public class OPCUAServer
	{
		public int ID { get; set; }
		public string? Name { get; set; }
		public string? FileName { get; set; }
		public bool? Online { get; set; }
		public int ProcessID { get; set; } = 0;
	}
}