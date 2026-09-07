namespace backend.DTOs.Members;

public class MemberResponseDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public DateTime MembershipDate { get; set; }
    public bool IsActive { get; set; }
}