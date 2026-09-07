using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Members;

public class CreateMemberDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(254)]
    public string Email { get; set; } = string.Empty;

    [StringLength(30)]
    public string? Phone { get; set; }

    [StringLength(250)]
    public string? Address { get; set; }

    [Required]
    public DateTime MembershipDate { get; set; }
}