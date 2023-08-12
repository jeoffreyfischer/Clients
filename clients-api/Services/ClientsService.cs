using Microsoft.EntityFrameworkCore;
using client_api.Data.Entities;
using client_api.Models.Client;
using clientApi.Context;

namespace client_api.Services
{
    public class ClientsService
    {
        private readonly ClientDbContext _context;

        public ClientsService(ClientDbContext context)
        {
            _context = context;
        }

        private void ValidateClient(ClientInfoDTO clientInfoDTO)
        {
            if (clientInfoDTO == null)
            {
                throw new ArgumentNullException(nameof(clientInfoDTO), "Client cannot be null.");
            }
            if (string.IsNullOrWhiteSpace(clientInfoDTO.Name))
            {
                throw new ArgumentException("Client name cannot be empty or whitespace.");
            }

            if (clientInfoDTO.Age<18)
            {
                throw new ArgumentException("Client cannot be under 18.");
            }

            if (clientInfoDTO.Height<0)
            {
                throw new ArgumentException("Client height cannot be negative.");
            }
        }

        public async Task<List<ClientDisplayDTO>> GetAll(CancellationToken cancellationToken)
        {
            var ClientDisplayDTO = await _context.Clients.Select(i => new ClientDisplayDTO
            {
                Id = i.Id,
                Name = i.Name,
                Age = i.Age,
                IsMember = i.IsMember
            }).ToListAsync(cancellationToken);

            return ClientDisplayDTO;

        }

        public async Task<ClientInfoDTO> Get(long id, CancellationToken cancellationToken)
        {
            var client = await _context.Clients.FindAsync(id, cancellationToken);
            if (client == null)
            {
                throw new NotFoundException($"Client with Id {id} not found.");
            }

            var ClientInfoDTO = new ClientInfoDTO
            {
                Id = client.Id,
                Name = client.Name,
                Age = client.Age,
                Height = client.Height,
                IsMember = client.IsMember
            };

            return ClientInfoDTO;
        }

        public async Task Add(ClientInfoDTO clientInfoDTO, CancellationToken cancellationToken)
        {
            ValidateClient(clientInfoDTO);

            var client = new Client
            {
                Name = clientInfoDTO.Name.Trim(),
                Age = clientInfoDTO.Age,
                Height = clientInfoDTO.Height,
                IsMember = clientInfoDTO.IsMember
            };

            await _context.Clients.AddAsync(client, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task Update(ClientInfoDTO clientInfoDTO, CancellationToken cancellationToken)
        {
            ValidateClient(clientInfoDTO);

            var client =  await _context.Clients.FindAsync(clientInfoDTO.Id, cancellationToken);
            if (client == null)
            {
                throw new NotFoundException($"Ingredient with Id {clientInfoDTO.Id} not found.");
            }
            client.Name = clientInfoDTO.Name.Trim();
            client.Age = clientInfoDTO.Age;
            client.Height = clientInfoDTO.Height;
            client.IsMember = clientInfoDTO.IsMember;

            await _context.SaveChangesAsync(cancellationToken);

        }

        public async Task Delete(long id, CancellationToken cancellationToken)
        {
            var client = await _context.Clients.FindAsync(id, cancellationToken);
            if (client == null)
            {
                throw new NotFoundException($"Ingredient with Id {id} not found.");
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
        }
    }
}