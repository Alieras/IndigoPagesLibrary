namespace backend.Entities;

public class BookCategory
{
    public Guid BookId { get; set; }

    public Guid CategoryId { get; set; }

    public Book Book { get; set; } = null!;

    public Category Category { get; set; } = null!;
}