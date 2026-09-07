namespace backend.DTOs.Books;

public class BookAuthorResponseDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public short AuthorOrder { get; set; }
}