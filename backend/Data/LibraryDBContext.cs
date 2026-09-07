using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class LibraryDbContext : DbContext
{
    public LibraryDbContext(DbContextOptions<LibraryDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<Member> Members => Set<Member>();
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Author> Authors => Set<Author>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Publisher> Publishers => Set<Publisher>();
    public DbSet<BookAuthor> BookAuthors => Set<BookAuthor>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            entity.HasKey(user => user.Id);

            entity.Property(user => user.Id)
                .HasColumnName("id");

            entity.Property(user => user.FirstName)
                .HasColumnName("firstname")
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(user => user.LastName)
                .HasColumnName("lastname")
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(user => user.Email)
                .HasColumnName("email")
                .HasMaxLength(254)
                .IsRequired();

            entity.HasIndex(user => user.Email)
                .IsUnique();

            entity.Property(user => user.PasswordHash)
                .HasColumnName("passwordhash")
                .IsRequired();

            entity.Property(user => user.IsActive)
                .HasColumnName("isactive")
                .IsRequired();

            entity.Property(user => user.CreatedAt)
                .HasColumnName("createdat")
                .HasColumnType("timestamp with time zone")
                .IsRequired();

            entity.Property(user => user.UpdatedAt)
                .HasColumnName("updatedat")
                .HasColumnType("timestamp with time zone")
                .IsRequired();
        });

        // Role
        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("roles");

            entity.HasKey(role => role.Id);

            entity.Property(role => role.Id)
                .HasColumnName("id");

            entity.Property(role => role.Name)
                .HasColumnName("name")
                .HasMaxLength(50)
                .IsRequired();

            entity.HasIndex(role => role.Name)
                .IsUnique();

            entity.Property(role => role.Description)
                .HasColumnName("description")
                .HasMaxLength(250);

            entity.Property(role => role.IsActive)
                .HasColumnName("isactive")
                .IsRequired();

            entity.Property(role => role.CreatedAt)
                .HasColumnName("createdat")
                .HasColumnType("timestamp with time zone")
                .IsRequired();
        });

        // UserRole
        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.ToTable("userroles");

            entity.HasKey(userRole => new
            {
                userRole.UserId,
                userRole.RoleId
            });

            entity.Property(userRole => userRole.UserId)
                .HasColumnName("userid");

            entity.Property(userRole => userRole.RoleId)
                .HasColumnName("roleid");

            entity.HasOne(userRole => userRole.User)
                .WithMany()
                .HasForeignKey(userRole => userRole.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(userRole => userRole.Role)
                .WithMany()
                .HasForeignKey(userRole => userRole.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // AuditLog
modelBuilder.Entity<AuditLog>(entity =>
{
    entity.ToTable("auditlogs");

    entity.HasKey(auditLog => auditLog.Id);

    entity.Property(auditLog => auditLog.Id)
        .HasColumnName("id");

    entity.Property(auditLog => auditLog.UserId)
        .HasColumnName("userid");

    entity.Property(auditLog => auditLog.Action)
        .HasColumnName("action")
        .HasMaxLength(100)
        .IsRequired();

    entity.Property(auditLog => auditLog.EntityType)
        .HasColumnName("entitytype")
        .HasMaxLength(100)
        .IsRequired();

    entity.Property(auditLog => auditLog.EntityId)
        .HasColumnName("entityid");

    entity.Property(auditLog => auditLog.Details)
        .HasColumnName("details")
        .HasColumnType("jsonb");

    entity.Property(auditLog => auditLog.IpAddress)
        .HasColumnName("ipaddress")
        .HasColumnType("inet");

    entity.Property(auditLog => auditLog.CreatedAt)
        .HasColumnName("createdat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();

    entity.HasOne(auditLog => auditLog.User)
        .WithMany()
        .HasForeignKey(auditLog => auditLog.UserId)
        .OnDelete(DeleteBehavior.SetNull);
});


// Member
modelBuilder.Entity<Member>(entity =>
{
    entity.ToTable("members");

    entity.HasKey(member => member.Id);

    entity.Property(member => member.Id)
        .HasColumnName("id");

    entity.Property(member => member.FirstName)
        .HasColumnName("firstname")
        .HasMaxLength(100)
        .IsRequired();

    entity.Property(member => member.LastName)
        .HasColumnName("lastname")
        .HasMaxLength(100)
        .IsRequired();

    entity.Property(member => member.Email)
        .HasColumnName("email")
        .HasMaxLength(254)
        .IsRequired();

    entity.HasIndex(member => member.Email)
        .IsUnique();

    entity.Property(member => member.Phone)
        .HasColumnName("phone")
        .HasMaxLength(30);

    entity.Property(member => member.Address)
        .HasColumnName("address")
        .HasMaxLength(250);

    entity.Property(member => member.MembershipDate)
        .HasColumnName("membershipdate")
        .HasColumnType("date")
        .IsRequired();

    entity.Property(member => member.IsActive)
        .HasColumnName("isactive")
        .IsRequired();

    entity.Property(member => member.CreatedAt)
        .HasColumnName("createdat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();

    entity.Property(member => member.UpdatedAt)
        .HasColumnName("updatedat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();
});


// Book
modelBuilder.Entity<Book>(entity =>
{
    entity.ToTable("books");

    entity.HasKey(book => book.Id);

    entity.Property(book => book.Id)
        .HasColumnName("id");

    entity.Property(book => book.ISBN)
        .HasColumnName("isbn")
        .HasMaxLength(17)
        .IsRequired();

    entity.HasIndex(book => book.ISBN)
        .IsUnique();

    entity.Property(book => book.Title)
        .HasColumnName("title")
        .HasMaxLength(250)
        .IsRequired();

    entity.Property(book => book.Description)
        .HasColumnName("description");

    entity.Property(book => book.PageCount)
        .HasColumnName("pagecount")
        .IsRequired();

    entity.Property(book => book.PublicationYear)
        .HasColumnName("publicationyear")
        .IsRequired();

    entity.Property(book => book.Language)
        .HasColumnName("language")
        .HasMaxLength(50)
        .IsRequired();

    entity.Property(book => book.PublisherId)
        .HasColumnName("publisherid")
        .IsRequired();

    entity.Property(book => book.CategoryId)
        .HasColumnName("categoryid")
        .IsRequired();

    entity.Property(book => book.CoverImageUrl)
        .HasColumnName("coverimageurl");

    entity.Property(book => book.CreatedAt)
        .HasColumnName("createdat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();

    entity.Property(book => book.UpdatedAt)
        .HasColumnName("updatedat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();
});

// Author
modelBuilder.Entity<Author>(entity =>
{
    entity.ToTable("authors");

    entity.HasKey(author => author.Id);

    entity.Property(author => author.Id)
        .HasColumnName("id");

    entity.Property(author => author.FirstName)
        .HasColumnName("firstname")
        .HasMaxLength(100)
        .IsRequired();

    entity.Property(author => author.LastName)
        .HasColumnName("lastname")
        .HasMaxLength(100)
        .IsRequired();

    entity.Property(author => author.Biography)
        .HasColumnName("biography");

    entity.Property(author => author.BirthDate)
        .HasColumnName("birthdate")
        .HasColumnType("date");

    entity.Property(author => author.IsActive)
        .HasColumnName("isactive")
        .IsRequired();

    entity.Property(author => author.CreatedAt)
        .HasColumnName("createdat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();

    entity.Property(author => author.UpdatedAt)
        .HasColumnName("updatedat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();
});

// Category
modelBuilder.Entity<Category>(entity =>
{
    entity.ToTable("categories");

    entity.HasKey(category => category.Id);

    entity.Property(category => category.Id)
        .HasColumnName("id");

    entity.Property(category => category.Name)
        .HasColumnName("name")
        .HasMaxLength(100)
        .IsRequired();

    entity.HasIndex(category => category.Name)
        .IsUnique();

    entity.Property(category => category.Description)
        .HasColumnName("description")
        .HasMaxLength(250);

    entity.Property(category => category.IsActive)
        .HasColumnName("isactive")
        .IsRequired();

    entity.Property(category => category.CreatedAt)
        .HasColumnName("createdat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();

    entity.Property(category => category.UpdatedAt)
        .HasColumnName("updatedat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();
});

// Publisher
modelBuilder.Entity<Publisher>(entity =>
{
    entity.ToTable("publishers");

    entity.HasKey(publisher => publisher.Id);

    entity.Property(publisher => publisher.Id)
        .HasColumnName("id");

    entity.Property(publisher => publisher.Name)
        .HasColumnName("name")
        .HasMaxLength(150)
        .IsRequired();

    entity.HasIndex(publisher => publisher.Name)
        .IsUnique();

    entity.Property(publisher => publisher.Email)
        .HasColumnName("email")
        .HasMaxLength(254);

    entity.Property(publisher => publisher.Phone)
        .HasColumnName("phone")
        .HasMaxLength(30);

    entity.Property(publisher => publisher.Website)
        .HasColumnName("website")
        .HasMaxLength(500);

    entity.Property(publisher => publisher.IsActive)
        .HasColumnName("isactive")
        .IsRequired();

    entity.Property(publisher => publisher.CreatedAt)
        .HasColumnName("createdat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();

    entity.Property(publisher => publisher.UpdatedAt)
        .HasColumnName("updatedat")
        .HasColumnType("timestamp with time zone")
        .IsRequired();
});

// BookAuthor
modelBuilder.Entity<BookAuthor>(entity =>
{
    entity.ToTable("bookauthors");

    entity.HasKey(bookAuthor => new
    {
        bookAuthor.BookId,
        bookAuthor.AuthorId
    });

    entity.Property(bookAuthor => bookAuthor.BookId)
        .HasColumnName("bookid");

    entity.Property(bookAuthor => bookAuthor.AuthorId)
        .HasColumnName("authorid");

    entity.Property(bookAuthor => bookAuthor.AuthorOrder)
        .HasColumnName("authororder")
        .IsRequired();

    entity.HasOne(bookAuthor => bookAuthor.Book)
        .WithMany()
        .HasForeignKey(bookAuthor => bookAuthor.BookId)
        .OnDelete(DeleteBehavior.Cascade);

    entity.HasOne(bookAuthor => bookAuthor.Author)
        .WithMany()
        .HasForeignKey(bookAuthor => bookAuthor.AuthorId)
        .OnDelete(DeleteBehavior.Cascade);
});


    }
}