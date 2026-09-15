using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FormatsController : ControllerBase
{
    private readonly LibraryDbContext _context;

    public FormatsController(LibraryDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetFormats()
    {
        var formats = await _context.Formats
            .AsNoTracking()
            .Where(format => format.IsActive)
            .OrderBy(format => format.Name)
            .Select(format => new
            {
                format.Id,
                format.Name,
                format.Description
            })
            .ToListAsync();

        return Ok(formats);
    }
}