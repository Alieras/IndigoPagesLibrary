using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Books;

public class CreateBookDto
{
    [Required]
    [StringLength(17, MinimumLength = 10)]
    public string ISBN { get; set; } = string.Empty;

    [Required]
    [StringLength(250, MinimumLength = 1)]
    public string Title { get; set; } = string.Empty;

    [StringLength(5000)]
    public string? Description { get; set; }

    [Range(1, 10000)]
    public int PageCount { get; set; }

    [Range(1000, 2100)]
    public short PublicationYear { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string Language { get; set; } = string.Empty;

    [Required]
    public Guid PublisherId { get; set; }

    [Required]
    public Guid FormatId { get; set; }

    [Required]
    [MinLength(1)]
    public List<Guid> CategoryIds { get; set; } = [];

    [Required]
    [MinLength(1)]
    public List<Guid> AuthorIds { get; set; } = [];

    public string? CoverImageUrl { get; set; }
}