using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorsController : ControllerBase
{
    private readonly LibraryDbContext _context;

    public AuthorsController(LibraryDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAuthors()
    {
        var authors = await _context.Authors
            .AsNoTracking()
            .Where(a => a.IsActive)
            .OrderBy(a => a.LastName)
            .ThenBy(a => a.FirstName)
            .Select(a => new
            {
                a.Id,
                a.FirstName,
                a.LastName,
                a.Biography,
                a.BirthDate
            })
            .ToListAsync();

        return Ok(authors);
    }
}