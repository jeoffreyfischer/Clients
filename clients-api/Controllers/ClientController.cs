using Microsoft.AspNetCore.Mvc;
using client_api.Models.Client;
using client_api.Services;

namespace client_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {

        private readonly ILogger<ClientController> _logger;

        private readonly ClientService _clientService;

        public ClientController(ILogger<ClientController> logger, ClientService clientService)
        {
            _logger = logger;
            _clientService = clientService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<ClientDisplayDTO>>> GetAll(CancellationToken cancellationToken = default)
        {
            try
            {
                var clients = await _clientService.GetAll(cancellationToken);
                return Ok(clients);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<ClientInfoDTO>> Get(long id, CancellationToken cancellationToken = default)
        {
            try
            {
                var client = await _clientService.Get(id, cancellationToken);
                return Ok(client);
            }
            catch (NotFoundException ex)
            {
                _logger.LogError(ex, "NotFoundException occurred.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create(ClientInfoDTO clientInfoDTO, CancellationToken cancellationToken = default)
        {
            try
            {
                await _clientService.Add(clientInfoDTO, cancellationToken);
                return CreatedAtAction(nameof(Get), new { id = clientInfoDTO.Id }, clientInfoDTO);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "ArgumentException occurred.");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> Update(long id, ClientInfoDTO clientInfoDTO, CancellationToken cancellationToken = default)
        {
            if (id != clientInfoDTO.Id)
            {
                return BadRequest("The provided Id does not match the client's Id.");
            }

            try
            {
                await _clientService.Update(clientInfoDTO, cancellationToken);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "ArgumentException occurred.");
                return BadRequest(ex.Message);
            }
            catch (NotFoundException ex)
            {
                _logger.LogError(ex, "NotFoundException occurred.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(long id, CancellationToken cancellationToken = default)
        {
            try
            {
                await _clientService.Delete(id, cancellationToken);
                return NoContent();
            }
            catch (NotFoundException ex)
            {
                _logger.LogError(ex, "NotFoundException occurred.");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }
    }
}