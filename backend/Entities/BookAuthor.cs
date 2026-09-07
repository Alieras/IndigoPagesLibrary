namespace backend.Entities;

public class BookAuthor
{
    public Guid BookId { get; set; }

    public Guid AuthorId { get; set; }

    public short AuthorOrder { get; set; }

    public Book Book { get; set; } = null!;

    public Author Author { get; set; } = null!;
}