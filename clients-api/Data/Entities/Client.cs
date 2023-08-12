namespace client_api.Data.Entities;

public class Client
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; } = 0;
    public decimal Height { get; set; } = 0;
    public bool IsMember { get; set; }
}