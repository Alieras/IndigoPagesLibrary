namespace backend.DTOs.Books;

public class BookResponseDto
{
    public Guid Id { get; set; }

    public string ISBN { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int PageCount { get; set; }

    public short PublicationYear { get; set; }

    public string Language { get; set; } = string.Empty;

    public Guid PublisherId { get; set; }

    public string PublisherName { get; set; } = string.Empty;

    public Guid FormatId { get; set; }

    public string FormatName { get; set; } = string.Empty;

    public string? CoverImageUrl { get; set; }

    public List<BookCategoryResponseDto> Categories { get; set; } = [];

    public List<BookAuthorResponseDto> Authors { get; set; } = [];
}