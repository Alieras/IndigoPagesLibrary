import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "../types/book";
import { getBooks } from "../services/bookService";
import BookCardSkeleton from "../components/BookCardSkeleton";
import BookCard from "../components/BookCard";

import {
    BookOpen,
    Filter,
    Plus,
    Search,
} from "lucide-react";

const mockBooks: Book[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        isbn: "978-0307474728",
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        publisher: "Editorial Sudamericana",
        publicationYear: 1967,
        category: "Novela",
        language: "Español",
        description:
            "Novela que narra la historia de la familia Buendía a través de varias generaciones.",
        totalCopies: 5,
        availableCopies: 4,
        location: "Estante A-01",
        createdAt: "2026-09-01T10:00:00",
        updatedAt: "2026-09-01T10:00:00",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440002",
        isbn: "978-0756404741",
        title: "El nombre del viento",
        author: "Patrick Rothfuss",
        publisher: "DAW Books",
        publicationYear: 2007,
        category: "Fantasía",
        language: "Español",
        description:
            "Primera parte de la historia de Kvothe, un músico y aventurero legendario.",
        totalCopies: 3,
        availableCopies: 2,
        location: "Estante B-02",
        createdAt: "2026-09-01T10:00:00",
        updatedAt: "2026-09-01T10:00:00",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440003",
        isbn: "978-0451524935",
        title: "1984",
        author: "George Orwell",
        publisher: "Secker & Warburg",
        publicationYear: 1949,
        category: "Distopía",
        language: "Español",
        description:
            "Novela distópica sobre una sociedad sometida a vigilancia y control totalitario.",
        totalCopies: 4,
        availableCopies: 0,
        location: "Estante C-01",
        createdAt: "2026-09-01T10:00:00",
        updatedAt: "2026-09-01T10:00:00",
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440004",
        isbn: "978-0141439518",
        title: "Orgullo y prejuicio",
        author: "Jane Austen",
        publisher: "T. Egerton",
        publicationYear: 1813,
        category: "Romance",
        language: "Español",
        description:
            "Novela que sigue las relaciones, conflictos y prejuicios de la familia Bennet.",
        totalCopies: 3,
        availableCopies: 3,
        location: "Estante D-03",
        createdAt: "2026-09-01T10:00:00",
        updatedAt: "2026-09-01T10:00:00",
    },
];

function CatalogPage() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>(mockBooks);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadBooks() {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getBooks();

                setBooks(data);
            } catch (error) {
                console.error("Error al cargar los libros:", error);

                setError(
                    "No fue posible cargar los libros. Intenta nuevamente."
                );
            } finally {
                setIsLoading(false);
            }
        }
        loadBooks();
    }, []);

    const filteredBooks = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return books.filter((book) => {
            const matchesSearch =
                !normalizedSearch ||
                [
                    book.title,
                    book.author,
                    book.isbn,
                    book.category,
                    String(book.publicationYear),
                ].some((value) =>
                    value.toLowerCase().includes(normalizedSearch)
                );

            const matchesCategory =
                selectedCategory === "Todas" ||
                book.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [books, searchTerm, selectedCategory]);

    return (
        <section className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">
                        Catálogo
                    </h2>

                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                        Consulta y administra los libros de la biblioteca.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/catalogo/nuevo")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
                >
                    <Plus size={18} />
                    Nuevo libro
                </button>

            </div>

            {/* Filters */}
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 lg:flex-row">
                {/* Search */}
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                    />

                    <input
                        type="search"
                        placeholder="Buscar por título, autor o ISBN..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-info)] focus:ring-2 focus:ring-[var(--color-info)]/20"
                    />
                </div>

                {/* Category filter */}
                <div className="relative">
                    <Filter
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                    />

                    <select
                        value={selectedCategory}
                        onChange={(event) => setSelectedCategory(event.target.value)}
                        className="appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-10 pr-10 text-sm font-medium text-[var(--color-text)] outline-none transition hover:border-[var(--color-secondary)] focus:border-[var(--color-info)] focus:ring-2 focus:ring-[var(--color-info)]/20"
                    >
                        <option value="Todas">Todas las categorías</option>
                        <option value="Novela">Novela</option>
                        <option value="Fantasía">Fantasía</option>
                        <option value="Distopía">Distopía</option>
                        <option value="Romance">Romance</option>
                    </select>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-[var(--color-text-muted)]">
                    Mostrando{" "}
                    <span className="font-semibold text-[var(--color-text)]">
                        {filteredBooks.length}
                    </span>{" "}
                    libros
                </p>
            </div>

            {/* Books */}
            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {isLoading ? (
                    <>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <BookCardSkeleton key={index} />
                        ))}
                    </>
                ) : error ? (
                    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
                        <BookOpen
                            size={32}
                            className="text-[var(--color-danger)]"
                        />

                        <p className="mt-3 text-sm font-semibold text-[var(--color-text)]">
                            No se pudieron cargar los libros
                        </p>

                        <p className="mt-1 max-w-md text-sm text-[var(--color-text-muted)]">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
                        >
                            Intentar nuevamente
                        </button>
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <BookOpen
                            size={32}
                            className="text-[var(--color-text-muted)]"
                        />

                        <p className="mt-3 text-sm font-medium text-[var(--color-text)]">
                            No se encontraron libros
                        </p>

                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                            Intenta cambiar la búsqueda o el filtro.
                        </p>
                    </div>
                ) : (
                    filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))
                )}
            </div>
        </section>
    );
}
export default CatalogPage;