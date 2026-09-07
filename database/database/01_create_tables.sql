-- ============================================================
-- IndigoPages Library Management System
-- Database: indigoPages_lib
-- Script: 01_create_tables.sql
-- Description: Crear las tablas de toda la aplicación
-- ============================================================


-- ============================================================
-- UUID SUPPORT

CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- 1. USERS

CREATE TABLE Users (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,

    Email VARCHAR(254) NOT NULL UNIQUE,
    PasswordHash TEXT NOT NULL,

    IsActive BOOLEAN NOT NULL DEFAULT TRUE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);



-- 2. ROLES

CREATE TABLE Roles (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    Name VARCHAR(50) NOT NULL UNIQUE,
    Description VARCHAR(250),

    IsActive BOOLEAN NOT NULL DEFAULT TRUE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 3. MEMBERS

CREATE TABLE Members (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,

    Email VARCHAR(254) NOT NULL UNIQUE,
    Phone VARCHAR(30),
    Address VARCHAR(250),

    MembershipDate DATE NOT NULL,

    IsActive BOOLEAN NOT NULL DEFAULT TRUE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 4. AUTHORS

CREATE TABLE Authors (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,

    Biography TEXT,
    BirthDate DATE,

    IsActive BOOLEAN NOT NULL DEFAULT TRUE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 5. CATEGORIES

CREATE TABLE Categories (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    Name VARCHAR(100) NOT NULL UNIQUE,
    Description VARCHAR(250),

    IsActive BOOLEAN NOT NULL DEFAULT TRUE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 6. PUBLISHERS

CREATE TABLE Publishers (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    Name VARCHAR(150) NOT NULL UNIQUE,

    Email VARCHAR(254),
    Phone VARCHAR(30),
    Website VARCHAR(500),

    IsActive BOOLEAN NOT NULL DEFAULT TRUE,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 7. USER ROLES

CREATE TABLE UserRoles (
    UserId UUID NOT NULL,
    RoleId UUID NOT NULL,

    PRIMARY KEY (UserId, RoleId),

    CONSTRAINT FK_UserRoles_Users
        FOREIGN KEY (UserId)
        REFERENCES Users(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_UserRoles_Roles
        FOREIGN KEY (RoleId)
        REFERENCES Roles(Id)
        ON DELETE CASCADE
);

-- 8. BOOKS

CREATE TABLE Books (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    ISBN VARCHAR(17) NOT NULL UNIQUE,
    Title VARCHAR(250) NOT NULL,
    Description TEXT,

    PageCount INTEGER NOT NULL,
    PublicationYear SMALLINT NOT NULL,

    Language VARCHAR(50) NOT NULL,

    PublisherId UUID NOT NULL,
    CategoryId UUID NOT NULL,

    CoverImageUrl TEXT,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Books_Publishers
        FOREIGN KEY (PublisherId)
        REFERENCES Publishers(Id)
        ON DELETE RESTRICT,

    CONSTRAINT FK_Books_Categories
        FOREIGN KEY (CategoryId)
        REFERENCES Categories(Id)
        ON DELETE RESTRICT,

    CONSTRAINT CK_Books_PageCount
        CHECK (PageCount > 0),

    CONSTRAINT CK_Books_PublicationYear
        CHECK (PublicationYear >= 1000)
);

-- 9. AUDIT LOGS

CREATE TABLE AuditLogs (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    UserId UUID,

    Action VARCHAR(100) NOT NULL,
    EntityType VARCHAR(100) NOT NULL,
    EntityId UUID,

    Details JSONB,

    IpAddress INET,

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_AuditLogs_Users
        FOREIGN KEY (UserId)
        REFERENCES Users(Id)
        ON DELETE SET NULL
);


-- 10. BOOK AUTHORS

CREATE TABLE BookAuthors (
    BookId UUID NOT NULL,
    AuthorId UUID NOT NULL,

    AuthorOrder SMALLINT NOT NULL,

    PRIMARY KEY (BookId, AuthorId),

    CONSTRAINT FK_BookAuthors_Books
        FOREIGN KEY (BookId)
        REFERENCES Books(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_BookAuthors_Authors
        FOREIGN KEY (AuthorId)
        REFERENCES Authors(Id)
        ON DELETE CASCADE,

    CONSTRAINT CK_BookAuthors_AuthorOrder
        CHECK (AuthorOrder > 0)
);


-- 11. COPIES

CREATE TABLE Copies (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    BookId UUID NOT NULL,

    InventoryCode VARCHAR(50) NOT NULL UNIQUE,

    Status VARCHAR(30) NOT NULL,

    AcquisitionDate DATE NOT NULL,

    Location VARCHAR(150),

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Copies_Books
        FOREIGN KEY (BookId)
        REFERENCES Books(Id)
        ON DELETE RESTRICT,

    CONSTRAINT CK_Copies_Status
        CHECK (
            Status IN (
                'Available',
                'Borrowed',
                'Reserved',
                'Maintenance',
                'Lost',
                'Damaged'
            )
        )
);


-- 12. LOANS

CREATE TABLE Loans (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    MemberId UUID NOT NULL,
    CopyId UUID NOT NULL,

    LoanDate TIMESTAMPTZ NOT NULL,
    DueDate TIMESTAMPTZ NOT NULL,
    ReturnDate TIMESTAMPTZ,

    Status VARCHAR(30) NOT NULL,

    Notes VARCHAR(500),

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Loans_Members
        FOREIGN KEY (MemberId)
        REFERENCES Members(Id)
        ON DELETE RESTRICT,

    CONSTRAINT FK_Loans_Copies
        FOREIGN KEY (CopyId)
        REFERENCES Copies(Id)
        ON DELETE RESTRICT,

    CONSTRAINT CK_Loans_Status
        CHECK (
            Status IN (
                'Active',
                'Returned',
                'Overdue',
                'Lost',
                'Cancelled'
            )
        ),

    CONSTRAINT CK_Loans_DueDate
        CHECK (DueDate >= LoanDate),

    CONSTRAINT CK_Loans_ReturnDate
        CHECK (
            ReturnDate IS NULL
            OR ReturnDate >= LoanDate
        )
);


-- 13. RESERVATIONS

CREATE TABLE Reservations (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    MemberId UUID NOT NULL,
    BookId UUID NOT NULL,

    ReservationDate TIMESTAMPTZ NOT NULL,
    ExpirationDate TIMESTAMPTZ,

    Status VARCHAR(30) NOT NULL,

    Notes VARCHAR(500),

    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_Reservations_Members
        FOREIGN KEY (MemberId)
        REFERENCES Members(Id)
        ON DELETE RESTRICT,

    CONSTRAINT FK_Reservations_Books
        FOREIGN KEY (BookId)
        REFERENCES Books(Id)
        ON DELETE RESTRICT,

    CONSTRAINT CK_Reservations_Status
        CHECK (
            Status IN (
                'Pending',
                'Ready',
                'Completed',
                'Cancelled',
                'Expired'
            )
        ),

    CONSTRAINT CK_Reservations_ExpirationDate
        CHECK (
            ExpirationDate IS NULL
            OR ExpirationDate >= ReservationDate
        )
);