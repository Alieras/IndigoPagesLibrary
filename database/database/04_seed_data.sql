-- ============================================================
-- IndigoPages - Database
-- 04_seed_data.sql
-- Initial system data
-- ============================================================


-- ============================================================
-- ROLES
-- ============================================================

INSERT INTO roles (
    name,
    description,
    isactive,
    createdat
)
VALUES
(
    'Administrador',
    'Acceso completo al sistema.',
    TRUE,
    CURRENT_TIMESTAMP
),
(
    'Bibliotecario',
    'Gestión del catálogo, miembros y circulación.',
    TRUE,
    CURRENT_TIMESTAMP
);


-- ============================================================
-- CATEGORIES
-- ============================================================

INSERT INTO categories (
    name,
    description,
    isactive,
    createdat
)
VALUES
(
    'Literatura',
    'Obras literarias y narrativa.',
    TRUE,
    CURRENT_TIMESTAMP
),
(
    'Fantasía',
    'Novelas y obras del género fantástico.',
    TRUE,
    CURRENT_TIMESTAMP
),
(
    'Ciencia ficción',
    'Obras relacionadas con ciencia y futuros imaginarios.',
    TRUE,
    CURRENT_TIMESTAMP
),
(
    'Historia',
    'Libros sobre acontecimientos y períodos históricos.',
    TRUE,
    CURRENT_TIMESTAMP
),
(
    'Programación',
    'Programación, desarrollo de software y tecnología.',
    TRUE,
    CURRENT_TIMESTAMP
),
(
    'Romance',
    'Obras centradas en relaciones y romance.',
    TRUE,
    CURRENT_TIMESTAMP
),
(
    'Misterio',
    'Novelas de misterio, investigación y suspenso.',
    TRUE,
    CURRENT_TIMESTAMP
),
(
    'Infantil',
    'Libros dirigidos al público infantil.',
    TRUE,
    CURRENT_TIMESTAMP
);