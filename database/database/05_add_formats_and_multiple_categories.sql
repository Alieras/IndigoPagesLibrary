-- ============================================================
-- IndigoPages Library Management System
-- Database: indigoPages_lib
-- Script: 05_add_formats_and_multiple_categories.sql
-- Description:
--      Agregar formatos y permitir múltiples categorías
--      por libro.
-- ============================================================

BEGIN;


-- ============================================================
-- 1. CREATE FORMATS TABLE
-- ============================================================

CREATE TABLE formats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(250),

    isactive BOOLEAN NOT NULL DEFAULT TRUE,

    createdat TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 2. INSERT DEFAULT FORMATS
-- ============================================================

INSERT INTO formats (name, description)
VALUES
    ('Pasta dura', 'Edición con cubierta rígida.'),
    ('Pasta suave', 'Edición con cubierta flexible.'),
    ('Bolsillo', 'Edición compacta de bolsillo.'),
    ('Digital', 'Libro en formato digital.'),
    ('Audiolibro', 'Libro disponible en formato de audio.');


-- ============================================================
-- 3. ADD FORMAT TO BOOKS
-- ============================================================

ALTER TABLE books
ADD COLUMN formatid UUID;


-- ============================================================
-- 4. ASSIGN DEFAULT FORMAT TO EXISTING BOOKS
-- ============================================================

UPDATE books
SET formatid = (
    SELECT id
    FROM formats
    WHERE name = 'Pasta suave'
)
WHERE formatid IS NULL;


-- ============================================================
-- 5. MAKE FORMAT REQUIRED
-- ============================================================

ALTER TABLE books
ALTER COLUMN formatid SET NOT NULL;


-- ============================================================
-- 6. CREATE FORMAT FOREIGN KEY
-- ============================================================

ALTER TABLE books
ADD CONSTRAINT fk_books_formats
    FOREIGN KEY (formatid)
    REFERENCES formats(id)
    ON DELETE RESTRICT;


-- ============================================================
-- 7. CREATE BOOK CATEGORIES
-- ============================================================

CREATE TABLE bookcategories (
    bookid UUID NOT NULL,
    categoryid UUID NOT NULL,

    PRIMARY KEY (bookid, categoryid),

    CONSTRAINT fk_bookcategories_books
        FOREIGN KEY (bookid)
        REFERENCES books(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_bookcategories_categories
        FOREIGN KEY (categoryid)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);


-- ============================================================
-- 8. MIGRATE CURRENT BOOK CATEGORIES
-- ============================================================

INSERT INTO bookcategories (bookid, categoryid)
SELECT id, categoryid
FROM books;


-- ============================================================
-- 9. REMOVE OLD CATEGORY FOREIGN KEY
-- ============================================================

ALTER TABLE books
DROP CONSTRAINT fk_books_categories;


-- ============================================================
-- 10. REMOVE OLD CATEGORY COLUMN
-- ============================================================

ALTER TABLE books
DROP COLUMN categoryid;


-- ============================================================
-- 11. VALIDATION
-- ============================================================

DO $$
DECLARE
    books_without_categories INTEGER;
    books_without_format INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO books_without_categories
    FROM books b
    WHERE NOT EXISTS (
        SELECT 1
        FROM bookcategories bc
        WHERE bc.bookid = b.id
    );

    SELECT COUNT(*)
    INTO books_without_format
    FROM books
    WHERE formatid IS NULL;

    IF books_without_categories > 0 THEN
        RAISE EXCEPTION
            'La migración falló: existen % libros sin categoría.',
            books_without_categories;
    END IF;

    IF books_without_format > 0 THEN
        RAISE EXCEPTION
            'La migración falló: existen % libros sin formato.',
            books_without_format;
    END IF;

END $$;


-- ============================================================
-- 12. COMMIT
-- ============================================================

COMMIT;