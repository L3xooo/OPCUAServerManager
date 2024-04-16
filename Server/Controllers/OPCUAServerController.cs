using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OPCUAServerManager.Data;
using OPCUAServerManager.Models;
using OPCUAServerManager.Services;

namespace OPCUAServerManager.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class OPCUAServerController : ControllerBase
	{
		public readonly OPCUAServerContext _db;
		private readonly ILogger<OPCUAServerController> _logger;
		private readonly IOPCUAServerService _opcuaServerService;


		public OPCUAServerController(OPCUAServerContext db, ILogger<OPCUAServerController> logger, IOPCUAServerService opcuaServerService)
		{
			_db = db;
			_logger = logger;
			_opcuaServerService = opcuaServerService;
		}

		[HttpGet]
		public async Task<IActionResult> GetData()
		{
			_logger.LogInformation("Get Data from Database!");
			try
			{
				var servers = await _opcuaServerService.GetAllServers();
				return Ok(servers); //200 Error code
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error retrieving servers: {ex.Message}");
				return StatusCode(500, new { message = "Internal server error!" });    //500 Error code
			}
		}

		[HttpPost]
		public async Task<IActionResult> AddServer([FromBody] OPCUAServerRequest request)
		{

			OPCUAServer? data = request.Data;
			_logger.LogInformation($"Adding server to database! {request.Url}");
			try
			{
				var result = await _opcuaServerService.AddServer(data, request.Url);
				return Ok(result); //200 Error code
			}
			catch (InvalidOperationException ex)
			{
				_logger.LogError($"Error adding server: {ex.Message}");
				return BadRequest(new { message = ex.Message }); //400 Error code
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error adding server: {ex.Message}");
				return StatusCode(500, new { message = "Internal server error!" }); //500 Error code
			}
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteData(int id)
		{
			try
			{
				await _opcuaServerService.DeleteServer(id);
				return Ok(new { });  //200 Error code
			}
			catch (KeyNotFoundException ex)
			{
				_logger.LogError($"Error deleting server: {ex.Message}");
				return BadRequest(new { message = ex.Message });     //400 Error code
			}
			catch (InvalidOperationException ex)
			{
				_logger.LogError($"Error deleting server: {ex.Message}");
				return BadRequest(new { message = ex.Message });     //400 Error code
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error deleting server: {ex.Message}");
				return StatusCode(500, new { message = "Internal server error!" });    //500 Error code
			}
		}

		[HttpPut("{id}/run-server")]
		public async Task<IActionResult> RunServer(int id)
		{
			try
			{
				var server = await _opcuaServerService.RunServer(id);
				return Ok(server);
			}
			catch (KeyNotFoundException ex)
			{
				_logger.LogError($"Error starting server: {ex.Message}");
				return NotFound(new { message = ex.Message });
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error starting server: {ex.Message}");
				return StatusCode(500, new { message = "Internal server error!" });
			}
		}

		[HttpPut("{id}/stop-server")]
		public async Task<IActionResult> StopServer(int id)
		{
			try
			{
				var server = await _opcuaServerService.StopServer(id);
				return Ok(server);
			}
			catch (KeyNotFoundException ex)
			{
				_logger.LogError($"Error stopping server: {ex.Message}");
				return NotFound(new { message = ex.Message });
			}
			catch (InvalidOperationException ex)
			{
				_logger.LogError($"Error stopping server: {ex.Message}");
				return BadRequest(new { message = ex.Message });
			}
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetServer(int id)
		{
			var result = await _opcuaServerService.GetServer(id);

			if (result == null)
			{
				return NotFound();
			}

			return Ok(result);
		}
	}
}

