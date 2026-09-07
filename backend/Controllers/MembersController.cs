using backend.Data;
using backend.DTOs.Members;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MembersController : ControllerBase
{
    private readonly LibraryDbContext _context;

    public MembersController(LibraryDbContext context)
    {
        _context = context;
    }

    [HttpGet]
public async Task<ActionResult<IEnumerable<MemberResponseDto>>> GetMembers()
{
    var members = await _context.Members
        .AsNoTracking()
        .Where(member => member.IsActive)
        .OrderBy(member => member.LastName)
        .ThenBy(member => member.FirstName)
        .Select(member => new MemberResponseDto
        {
            Id = member.Id,
            FirstName = member.FirstName,
            LastName = member.LastName,
            Email = member.Email,
            Phone = member.Phone,
            Address = member.Address,
            MembershipDate = member.MembershipDate,
            IsActive = member.IsActive
        })
        .ToListAsync();

    return Ok(members);
}

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<MemberResponseDto>> GetMember(Guid id)
    {
        var member = await _context.Members
            .AsNoTracking()
            .Where(member => member.Id == id)
            .Select(member => new MemberResponseDto
            {
                Id = member.Id,
                FirstName = member.FirstName,
                LastName = member.LastName,
                Email = member.Email,
                Phone = member.Phone,
                Address = member.Address,
                MembershipDate = member.MembershipDate,
                IsActive = member.IsActive
            })
            .FirstOrDefaultAsync();

        if (member is null)
        {
            return NotFound(new
            {
                message = "No se encontró el miembro solicitado."
            });
        }

        return Ok(member);
    }


    [HttpPost]
    public async Task<ActionResult<MemberResponseDto>> CreateMember(
        CreateMemberDto dto)
    {
        var email = dto.Email.Trim().ToLowerInvariant();

        var emailExists = await _context.Members
            .AnyAsync(member => member.Email.ToLower() == email);

        if (emailExists)
        {
            return Conflict(new
            {
                message = "Ya existe un miembro registrado con ese correo electrónico."
            });
        }

        var member = new Member
        {
            Id = Guid.NewGuid(),
            FirstName = dto.FirstName.Trim(),
            LastName = dto.LastName.Trim(),
            Email = email,
            Phone = string.IsNullOrWhiteSpace(dto.Phone)
                ? null
                : dto.Phone.Trim(),
            Address = string.IsNullOrWhiteSpace(dto.Address)
                ? null
                : dto.Address.Trim(),
            MembershipDate = dto.MembershipDate,
            IsActive = true,
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = DateTimeOffset.UtcNow
        };

        _context.Members.Add(member);

        await _context.SaveChangesAsync();

        var response = new MemberResponseDto
        {
            Id = member.Id,
            FirstName = member.FirstName,
            LastName = member.LastName,
            Email = member.Email,
            Phone = member.Phone,
            Address = member.Address,
            MembershipDate = member.MembershipDate,
            IsActive = member.IsActive
        };

        return CreatedAtAction(
            nameof(GetMembers),
            new { id = member.Id },
            response);
        }

        [HttpPut("{id:guid}")]

public async Task<ActionResult<MemberResponseDto>> UpdateMember(
    Guid id,
    UpdateMemberDto dto)
{
    var member = await _context.Members
        .FirstOrDefaultAsync(member => member.Id == id);

    if (member is null)
    {
        return NotFound(new
        {
            message = "No se encontró el miembro solicitado."
        });
    }

    var email = dto.Email.Trim().ToLowerInvariant();

    var emailExists = await _context.Members
        .AnyAsync(member =>
            member.Id != id &&
            member.Email.ToLower() == email);

    if (emailExists)
    {
        return Conflict(new
        {
            message = "Ya existe otro miembro registrado con ese correo electrónico."
        });
    }

    member.FirstName = dto.FirstName.Trim();
    member.LastName = dto.LastName.Trim();
    member.Email = email;
    member.Phone = string.IsNullOrWhiteSpace(dto.Phone)
        ? null
        : dto.Phone.Trim();
    member.Address = string.IsNullOrWhiteSpace(dto.Address)
        ? null
        : dto.Address.Trim();
    member.MembershipDate = dto.MembershipDate;
    member.IsActive = dto.IsActive;
    member.UpdatedAt = DateTimeOffset.UtcNow;

    await _context.SaveChangesAsync();

    var response = new MemberResponseDto
    {
        Id = member.Id,
        FirstName = member.FirstName,
        LastName = member.LastName,
        Email = member.Email,
        Phone = member.Phone,
        Address = member.Address,
        MembershipDate = member.MembershipDate,
        IsActive = member.IsActive
    };

    return Ok(response);
}

[HttpDelete("{id:guid}")]
public async Task<IActionResult> DeactivateMember(Guid id)
{
    var member = await _context.Members
        .FirstOrDefaultAsync(member => member.Id == id);

    if (member is null)
    {
        return NotFound(new
        {
            message = "No se encontró el miembro solicitado."
        });
    }

    if (!member.IsActive)
    {
        return Conflict(new
        {
            message = "El miembro ya está desactivado."
        });
    }

    member.IsActive = false;
    member.UpdatedAt = DateTimeOffset.UtcNow;

    await _context.SaveChangesAsync();

    return NoContent();
    }
}