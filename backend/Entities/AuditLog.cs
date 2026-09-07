namespace backend.Entities;

public class AuditLog
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public string Action { get; set; } = string.Empty;

    public string EntityType { get; set; } = string.Empty;

    public Guid? EntityId { get; set; }

    public string? Details { get; set; }

    public System.Net.IPAddress? IpAddress { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public User? User { get; set; }
}