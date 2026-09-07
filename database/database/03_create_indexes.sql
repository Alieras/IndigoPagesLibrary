-- ============================================================
-- IndigoPages - Database
-- 03_create_indexes.sql
-- Performance indexes and business-rule indexes
-- ============================================================

-- USER ROLES

CREATE INDEX idx_userroles_role_user
ON userroles (roleid, userid);


-- MEMBERS

CREATE INDEX idx_members_name
ON members (lastname, firstname);


-- BOOKS

CREATE INDEX idx_books_publisher
ON books (publisherid);

CREATE INDEX idx_books_category
ON books (categoryid);

CREATE INDEX idx_books_title
ON books (title);


-- AUTHORS

CREATE INDEX idx_authors_name
ON authors (lastname, firstname);


-- BOOK AUTHORS

CREATE INDEX idx_bookauthors_author_book
ON bookauthors (authorid, bookid);


-- COPIES

CREATE INDEX idx_copies_book
ON copies (bookid);

CREATE INDEX idx_copies_book_status
ON copies (bookid, status);


-- LOANS

CREATE INDEX idx_loans_member
ON loans (memberid);

CREATE INDEX idx_loans_copy
ON loans (copyid);

CREATE INDEX idx_loans_status
ON loans (status);

CREATE INDEX idx_loans_due_date
ON loans (duedate);


-- A physical copy can only have one active loan.
CREATE UNIQUE INDEX ux_loans_active_copy
ON loans (copyid)
WHERE status = 'Active';


-- RESERVATIONS

CREATE INDEX idx_reservations_member
ON reservations (memberid);

CREATE INDEX idx_reservations_book
ON reservations (bookid);

CREATE INDEX idx_reservations_status
ON reservations (status);


-- A member cannot have multiple active reservations
-- for the same book.
CREATE UNIQUE INDEX ux_reservations_active_member_book
ON reservations (memberid, bookid)
WHERE status IN ('Pending', 'Ready');


-- AUDIT LOGS

CREATE INDEX idx_auditlogs_user
ON auditlogs (userid);

CREATE INDEX idx_auditlogs_created_at
ON auditlogs (createdat);

CREATE INDEX idx_auditlogs_entity
ON auditlogs (entitytype, entityid);