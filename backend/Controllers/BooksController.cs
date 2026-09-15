using backend.Data;
using backend.DTOs.Books;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly LibraryDbContext _context;

    public BooksController(LibraryDbContext context)
    {
        _context = context;
    }

    // ============================================================
    // GET: api/books
    // ============================================================

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookResponseDto>>> GetBooks()
    {
        var books = await _context.Books
            .AsNoTracking()
            .OrderBy(book => book.Title)
            .Select(book => new BookResponseDto
            {
                Id = book.Id,
                ISBN = book.ISBN,
                Title = book.Title,
                Description = book.Description,
                PageCount = book.PageCount,
                PublicationYear = book.PublicationYear,
                Language = book.Language,

                PublisherId = book.PublisherId,

                PublisherName = _context.Publishers
                    .Where(publisher => publisher.Id == book.PublisherId)
                    .Select(publisher => publisher.Name)
                    .FirstOrDefault() ?? string.Empty,

                FormatId = book.FormatId,

                FormatName = _context.Formats
                    .Where(format => format.Id == book.FormatId)
                    .Select(format => format.Name)
                    .FirstOrDefault() ?? string.Empty,

                CoverImageUrl = book.CoverImageUrl,

                Categories = _context.BookCategories
                    .Where(bookCategory => bookCategory.BookId == book.Id)
                    .OrderBy(bookCategory => bookCategory.Category.Name)
                    .Select(bookCategory => new BookCategoryResponseDto
                    {
                        Id = bookCategory.CategoryId,
                        Name = bookCategory.Category.Name
                    })
                    .ToList(),

                Authors = _context.BookAuthors
                    .Where(bookAuthor => bookAuthor.BookId == book.Id)
                    .OrderBy(bookAuthor => bookAuthor.AuthorOrder)
                    .Select(bookAuthor => new BookAuthorResponseDto
                    {
                        Id = bookAuthor.AuthorId,
                        FirstName = bookAuthor.Author.FirstName,
                        LastName = bookAuthor.Author.LastName,
                        AuthorOrder = bookAuthor.AuthorOrder
                    })
                    .ToList()
            })
            .ToListAsync();

        return Ok(books);
    }


    // ============================================================
    // GET: api/books/{id}
    // ============================================================

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<BookResponseDto>> GetBook(Guid id)
    {
        var book = await _context.Books
            .AsNoTracking()
            .Where(book => book.Id == id)
            .Select(book => new BookResponseDto
            {
                Id = book.Id,
                ISBN = book.ISBN,
                Title = book.Title,
                Description = book.Description,
                PageCount = book.PageCount,
                PublicationYear = book.PublicationYear,
                Language = book.Language,

                PublisherId = book.PublisherId,

                PublisherName = _context.Publishers
                    .Where(publisher => publisher.Id == book.PublisherId)
                    .Select(publisher => publisher.Name)
                    .FirstOrDefault() ?? string.Empty,

                FormatId = book.FormatId,

                FormatName = _context.Formats
                    .Where(format => format.Id == book.FormatId)
                    .Select(format => format.Name)
                    .FirstOrDefault() ?? string.Empty,

                CoverImageUrl = book.CoverImageUrl,

                Categories = _context.BookCategories
                    .Where(bookCategory => bookCategory.BookId == book.Id)
                    .OrderBy(bookCategory => bookCategory.Category.Name)
                    .Select(bookCategory => new BookCategoryResponseDto
                    {
                        Id = bookCategory.CategoryId,
                        Name = bookCategory.Category.Name
                    })
                    .ToList(),

                Authors = _context.BookAuthors
                    .Where(bookAuthor => bookAuthor.BookId == book.Id)
                    .OrderBy(bookAuthor => bookAuthor.AuthorOrder)
                    .Select(bookAuthor => new BookAuthorResponseDto
                    {
                        Id = bookAuthor.AuthorId,
                        FirstName = bookAuthor.Author.FirstName,
                        LastName = bookAuthor.Author.LastName,
                        AuthorOrder = bookAuthor.AuthorOrder
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();

        if (book is null)
        {
            return NotFound(new
            {
                message = "No se encontró el libro solicitado."
            });
        }

        return Ok(book);
    }


    // ============================================================
    // POST: api/books
    // ============================================================

    [HttpPost]
    public async Task<ActionResult<BookResponseDto>> CreateBook(
        CreateBookDto dto)
    {
        var isbn = dto.ISBN.Trim();

        // --------------------------------------------------------
        // Validar ISBN
        // --------------------------------------------------------

        if (!IsValidIsbn(isbn))
        {
            return BadRequest(new
            {
                message = "El ISBN proporcionado no es válido."
            });
        }


        // --------------------------------------------------------
        // Comprobar ISBN duplicado
        // --------------------------------------------------------

        var isbnExists = await _context.Books
            .AnyAsync(book => book.ISBN == isbn);

        if (isbnExists)
        {
            return Conflict(new
            {
                message = "Ya existe un libro registrado con ese ISBN."
            });
        }


        // --------------------------------------------------------
        // Comprobar editorial
        // --------------------------------------------------------

        var publisherExists = await _context.Publishers
            .AnyAsync(publisher =>
                publisher.Id == dto.PublisherId &&
                publisher.IsActive);

        if (!publisherExists)
        {
            return BadRequest(new
            {
                message = "La editorial seleccionada no existe o está inactiva."
            });
        }


        // --------------------------------------------------------
        // Comprobar formato
        // --------------------------------------------------------

        var formatExists = await _context.Formats
            .AnyAsync(format =>
                format.Id == dto.FormatId &&
                format.IsActive);

        if (!formatExists)
        {
            return BadRequest(new
            {
                message = "El formato seleccionado no existe o está inactivo."
            });
        }


        // --------------------------------------------------------
        // Validar categorías
        // --------------------------------------------------------

        var categoryIds = dto.CategoryIds
            .Distinct()
            .ToList();

        if (categoryIds.Count == 0)
        {
            return BadRequest(new
            {
                message = "El libro debe tener al menos una categoría."
            });
        }


        // --------------------------------------------------------
        // Comprobar que todas las categorías existen y están activas
        // --------------------------------------------------------

        var activeCategoryIds = await _context.Categories
            .Where(category =>
                category.IsActive &&
                categoryIds.Contains(category.Id))
            .Select(category => category.Id)
            .ToListAsync();

        if (activeCategoryIds.Count != categoryIds.Count)
        {
            return BadRequest(new
            {
                message = "Una o más categorías no existen o están inactivas."
            });
        }


        // --------------------------------------------------------
        // Validar autores
        // --------------------------------------------------------

        var authorIds = dto.AuthorIds
            .Distinct()
            .ToList();

        if (authorIds.Count == 0)
        {
            return BadRequest(new
            {
                message = "El libro debe tener al menos un autor."
            });
        }


        // --------------------------------------------------------
        // Comprobar autores
        // --------------------------------------------------------

        var activeAuthorIds = await _context.Authors
            .Where(author =>
                author.IsActive &&
                authorIds.Contains(author.Id))
            .Select(author => author.Id)
            .ToListAsync();

        if (activeAuthorIds.Count != authorIds.Count)
        {
            return BadRequest(new
            {
                message = "Uno o más autores no existen o están inactivos."
            });
        }


        // --------------------------------------------------------
        // Transacción
        // --------------------------------------------------------

        await using var transaction =
            await _context.Database.BeginTransactionAsync();

        try
        {
            var now = DateTimeOffset.UtcNow;

            var book = new Book
            {
                Id = Guid.NewGuid(),

                ISBN = isbn,

                Title = dto.Title.Trim(),

                Description = string.IsNullOrWhiteSpace(dto.Description)
                    ? null
                    : dto.Description.Trim(),

                PageCount = dto.PageCount,

                PublicationYear = dto.PublicationYear,

                Language = dto.Language.Trim(),

                PublisherId = dto.PublisherId,

                FormatId = dto.FormatId,

                CoverImageUrl = string.IsNullOrWhiteSpace(dto.CoverImageUrl)
                    ? null
                    : dto.CoverImageUrl.Trim(),

                CreatedAt = now,

                UpdatedAt = now
            };

            _context.Books.Add(book);


            // ----------------------------------------------------
            // Agregar categorías
            // ----------------------------------------------------

            foreach (var categoryId in categoryIds)
            {
                _context.BookCategories.Add(new BookCategory
                {
                    BookId = book.Id,
                    CategoryId = categoryId
                });
            }


            // ----------------------------------------------------
            // Agregar autores
            // ----------------------------------------------------

            for (short i = 0; i < authorIds.Count; i++)
            {
                _context.BookAuthors.Add(new BookAuthor
                {
                    BookId = book.Id,
                    AuthorId = authorIds[i],
                    AuthorOrder = (short)(i + 1)
                });
            }


            await _context.SaveChangesAsync();

            await transaction.CommitAsync();


            // ----------------------------------------------------
            // Obtener respuesta
            // ----------------------------------------------------

            var response = await _context.Books
                .AsNoTracking()
                .Where(currentBook => currentBook.Id == book.Id)
                .Select(currentBook => new BookResponseDto
                {
                    Id = currentBook.Id,

                    ISBN = currentBook.ISBN,

                    Title = currentBook.Title,

                    Description = currentBook.Description,

                    PageCount = currentBook.PageCount,

                    PublicationYear = currentBook.PublicationYear,

                    Language = currentBook.Language,

                    PublisherId = currentBook.PublisherId,

                    PublisherName = _context.Publishers
                        .Where(publisher =>
                            publisher.Id == currentBook.PublisherId)
                        .Select(publisher => publisher.Name)
                        .FirstOrDefault() ?? string.Empty,

                    FormatId = currentBook.FormatId,

                    FormatName = _context.Formats
                        .Where(format =>
                            format.Id == currentBook.FormatId)
                        .Select(format => format.Name)
                        .FirstOrDefault() ?? string.Empty,

                    CoverImageUrl = currentBook.CoverImageUrl,

                    Categories = _context.BookCategories
                        .Where(bookCategory =>
                            bookCategory.BookId == currentBook.Id)
                        .OrderBy(bookCategory => bookCategory.Category.Name)
                        .Select(bookCategory => new BookCategoryResponseDto
                        {
                            Id = bookCategory.CategoryId,
                            Name = bookCategory.Category.Name
                        })
                        .ToList(),

                    Authors = _context.BookAuthors
                        .Where(bookAuthor =>
                            bookAuthor.BookId == currentBook.Id)
                        .OrderBy(bookAuthor => bookAuthor.AuthorOrder)
                        .Select(bookAuthor => new BookAuthorResponseDto
                        {
                            Id = bookAuthor.AuthorId,
                            FirstName = bookAuthor.Author.FirstName,
                            LastName = bookAuthor.Author.LastName,
                            AuthorOrder = bookAuthor.AuthorOrder
                        })
                        .ToList()
                })
                .FirstAsync();


            return CreatedAtAction(
                nameof(GetBook),
                new { id = book.Id },
                response);
        }
        catch
        {
            await transaction.RollbackAsync();

            return StatusCode(500, new
            {
                message = "No fue posible registrar el libro."
            });
        }
    }


    // ============================================================
    // ISBN VALIDATION
    // ============================================================

    private static bool IsValidIsbn(string isbn)
    {
        var normalized = isbn
            .Replace("-", "")
            .Replace(" ", "");

        if (normalized.Length == 10)
        {
            return IsValidIsbn10(normalized);
        }

        if (normalized.Length == 13)
        {
            return IsValidIsbn13(normalized);
        }

        return false;
    }


    private static bool IsValidIsbn10(string isbn)
    {
        if (isbn.Length != 10)
        {
            return false;
        }

        int sum = 0;

        for (int i = 0; i < 9; i++)
        {
            if (!char.IsDigit(isbn[i]))
            {
                return false;
            }

            sum += (isbn[i] - '0') * (10 - i);
        }

        char last = isbn[9];

        int checkDigit;

        if (last == 'X' || last == 'x')
        {
            checkDigit = 10;
        }
        else if (char.IsDigit(last))
        {
            checkDigit = last - '0';
        }
        else
        {
            return false;
        }

        sum += checkDigit;

        return sum % 11 == 0;
    }


    private static bool IsValidIsbn13(string isbn)
    {
        if (isbn.Length != 13 || !isbn.All(char.IsDigit))
        {
            return false;
        }

        int sum = 0;

        for (int i = 0; i < 12; i++)
        {
            int digit = isbn[i] - '0';

            sum += i % 2 == 0
                ? digit
                : digit * 3;
        }

        int checkDigit = (10 - (sum % 10)) % 10;

        return checkDigit == isbn[12] - '0';
    }
}