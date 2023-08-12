namespace client_api.Models.Client;

public class ClientDisplayDTO
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; } = 0;
    public bool IsMember { get; set; }
}