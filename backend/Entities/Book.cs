namespace backend.Entities;

public class Book
{
    public Guid Id { get; set; }

    public string ISBN { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int PageCount { get; set; }

    public short PublicationYear { get; set; }

    public string Language { get; set; } = string.Empty;

    public Guid PublisherId { get; set; }

    public Guid FormatId { get; set; }

    public string? CoverImageUrl { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }
}