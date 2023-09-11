using Microsoft.EntityFrameworkCore;
using client_api.Data.Entities;

namespace client_api.Data;

public class ClientDbContext : DbContext
{
    public ClientDbContext(DbContextOptions options)
        : base(options)
    {
    }
    public DbSet<Client> Clients => Set<Client>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>().Property(i => i.Height).HasColumnType("decimal(18, 2)");
        modelBuilder.Entity<Client>().HasData(
            new Client { Id = 1, Name = "Uzumaki Naruto", Age = 32, Height = 1.83m, IsMember = false },
            new Client { Id = 2, Name = "Eren Jaeger", Age = 28, Height = 1.75m, IsMember = true },
            new Client { Id = 3, Name = "San Goku", Age = 45, Height = 1.92m, IsMember = true }
        );
        base.OnModelCreating(modelBuilder);
    }
}