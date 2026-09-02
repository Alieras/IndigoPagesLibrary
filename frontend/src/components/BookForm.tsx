import { useState } from "react";
import type { ChangeEvent } from "react";
import type { BookFormData } from "../types/bookForm";
import { isValidIsbn } from "../utils/isbn";
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  ImagePlus,
  Upload,
  X,
} from "lucide-react";

type BookFormErrors = {
  isbn?: string;
  title?: string;
  author?: string;
  publisher?: string;
  publicationYear?: string;
  category?: string;
  language?: string;
  description?: string;
  totalCopies?: string;
  coverImage?: string;
};

function BookForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookFormData>({
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    publicationYear: "",
    category: "",
    language: "",
    description: "",
    totalCopies: "",
    location: "",
    coverImage: null,
  });

  const [errors, setErrors] = useState<BookFormErrors>({});

  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

const handleImageChange = (
  event: ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  if (!allowedTypes.includes(file.type)) {
    setErrors((previous) => ({
      ...previous,
      coverImage:
        "La portada debe ser una imagen JPG, PNG o WebP.",
    }));

    event.target.value = "";
    return;
  }

  if (file.size > maxFileSize) {
    setErrors((previous) => ({
      ...previous,
      coverImage:
        "La portada no puede superar los 5 MB.",
    }));

    event.target.value = "";
    return;
  }

  setFormData((previous) => ({
    ...previous,
    coverImage: file,
  }));

  const imageUrl = URL.createObjectURL(file);

  setCoverPreview((previous) => {
    if (previous) {
      URL.revokeObjectURL(previous);
    }

    return imageUrl;
  });

  setErrors((previous) => ({
    ...previous,
    coverImage: undefined,
  }));
};

const removeImage = () => {
  setCoverPreview((previous) => {
    if (previous) {
      URL.revokeObjectURL(previous);
    }

    return null;
  });

  setFormData((previous) => ({
    ...previous,
    coverImage: null,
  }));
};

  const validateForm = (): boolean => {
  const newErrors: BookFormErrors = {};

  const currentYear = new Date().getFullYear();

  // ISBN
  if (!formData.isbn.trim()) {
    newErrors.isbn = "El ISBN es obligatorio.";
  } else if (!isValidIsbn(formData.isbn)) {
    newErrors.isbn = "Ingresa un ISBN-10 o ISBN-13 válido.";
  }

  // Title
  if (!formData.title.trim()) {
    newErrors.title = "El título es obligatorio.";
  }

  // Author
  if (!formData.author.trim()) {
    newErrors.author = "El autor es obligatorio.";
  }

  // Publisher
  if (!formData.publisher.trim()) {
    newErrors.publisher = "La editorial es obligatoria.";
  }

  // Publication year
  if (!formData.publicationYear) {
    newErrors.publicationYear =
      "El año de publicación es obligatorio.";
  } else {
    const year = Number(formData.publicationYear);

    if (!Number.isInteger(year)) {
      newErrors.publicationYear =
        "El año debe ser un número entero.";
    } else if (year < 1000 || year > currentYear) {
      newErrors.publicationYear =
        `Ingresa un año entre 1000 y ${currentYear}.`;
    }
  }

  // Category
  if (!formData.category) {
    newErrors.category = "Selecciona una categoría.";
  }

  // Language
  if (!formData.language) {
    newErrors.language = "Selecciona un idioma.";
  }

  // Description
  if (!formData.description.trim()) {
    newErrors.description =
      "La descripción es obligatoria.";
  }

  // Total copies
  if (!formData.totalCopies) {
    newErrors.totalCopies =
      "La cantidad de copias es obligatoria.";
  } else {
    const totalCopies = Number(formData.totalCopies);

    if (!Number.isInteger(totalCopies)) {
      newErrors.totalCopies =
        "La cantidad de copias debe ser un número entero.";
    } else if (totalCopies < 1) {
      newErrors.totalCopies =
        "Debe existir al menos una copia.";
    }
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  return (
    <section className="p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">
            Nuevo libro
          </h1>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Agrega un nuevo libro al catálogo de la biblioteca.
          </p>
        </div>

        <form
            onSubmit={(event) => {
                event.preventDefault();

                if (!validateForm()) {
                return;
                }

                console.log("Formulario válido:", {
                ...formData,
                totalCopies: Number(formData.totalCopies),
                availableCopies: Number(formData.totalCopies),
                });
            }}
            className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]"
            >

          {/* Book information */}
          <div className="border-b border-[var(--color-border)] p-6 lg:p-8">

            {/* Section title */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                <BookOpen size={20} />
              </div>

              <div>
                <h2 className="text-base font-semibold text-[var(--color-text)]">
                  Información del libro
                </h2>

                <p className="text-sm text-[var(--color-text-muted)]">
                  Información bibliográfica y portada.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">

              {/* Cover */}
              <div>
                <label className="text-sm font-medium text-[var(--color-text)]">
                  Portada
                </label>

                <div className="mt-2">

                  {coverPreview ? (
                    <div className="relative">

                      <img
                        src={coverPreview}
                        alt="Vista previa de la portada"
                        className="h-64 w-44 rounded-xl border border-[var(--color-border)] object-cover shadow-sm"
                      />

                      <button
                        type="button"
                        onClick={removeImage}
                        aria-label="Eliminar portada"
                        className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] shadow-sm transition hover:text-[var(--color-danger)]"
                      >
                        <X size={16} />
                      </button>

                    </div>
                  ) : (
                    <label className="flex h-64 w-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-background)] text-center transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm">
                        <ImagePlus size={21} />
                      </div>

                      <span className="mt-3 text-sm font-medium text-[var(--color-text)]">
                        Subir portada
                      </span>

                      <span className="mt-1 px-4 text-xs text-[var(--color-text-muted)]">
                        JPG, PNG o WebP
                      </span>

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                    </label>
                  )}

                  {errors.coverImage && (
                    <p className="mt-2 text-xs text-[var(--color-danger)]">
                      {errors.coverImage}
                    </p>
                  )}
                </div>
              </div>

              {/* Fields */}
              <div className="grid gap-5 md:grid-cols-2">

                {/* ISBN */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="isbn"
                    className="text-sm font-medium text-[var(--color-text)]"
                  >
                    ISBN{" "}
                    <span className="text-[var(--color-danger)]">*</span>
                  </label>

                  <input
                    id="isbn"
                    name="isbn"
                    type="text"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="Ej. 978-0307474728"
                    className={`mt-2 w-full rounded-xl border bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-info)]/20 ${
                      errors.isbn
                        ? "border-[var(--color-danger)]"
                        : "border-[var(--color-border)] focus:border-[var(--color-info)]"
                    }`}
                  />

                  {errors.isbn && (
                    <p className="mt-1.5 text-xs text-[var(--color-danger)]">
                      {errors.isbn}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-[var(--color-text)]"
                  >
                    Título{" "}
                    <span className="text-[var(--color-danger)]">*</span>
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Título del libro"
                    className={`mt-2 w-full rounded-xl border bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-info)]/20 ${
                      errors.title
                        ? "border-[var(--color-danger)]"
                        : "border-[var(--color-border)] focus:border-[var(--color-info)]"
                    }`}
                  />

                  {errors.title && (
                    <p className="mt-1.5 text-xs text-[var(--color-danger)]">
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Author */}
                <div>
                  <label
                    htmlFor="author"
                    className="text-sm font-medium text-[var(--color-text)]"
                  >
                    Autor{" "}
                    <span className="text-[var(--color-danger)]">*</span>
                  </label>

                  <input
                    id="author"
                    name="author"
                    type="text"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Nombre del autor"
                    className={`mt-2 w-full rounded-xl border bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-info)]/20 ${
                      errors.author
                        ? "border-[var(--color-danger)]"
                        : "border-[var(--color-border)] focus:border-[var(--color-info)]"
                    }`}
                  />

                  {errors.author && (
                    <p className="mt-1.5 text-xs text-[var(--color-danger)]">
                      {errors.author}
                    </p>
                  )}
                </div>

                {/* Publisher */}
                <div>
                  <label
                    htmlFor="publisher"
                    className="text-sm font-medium text-[var(--color-text)]"
                  >
                    Editorial{" "}
                    <span className="text-[var(--color-danger)]">*</span>
                  </label>

                  <input
                    id="publisher"
                    name="publisher"
                    type="text"
                    value={formData.publisher}
                    onChange={handleChange}
                    placeholder="Editorial"
                    className={`mt-2 w-full rounded-xl border bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-info)]/20 ${
                      errors.publisher
                        ? "border-[var(--color-danger)]"
                        : "border-[var(--color-border)] focus:border-[var(--color-info)]"
                    }`}
                  />

                  {errors.publisher && (
                    <p className="mt-1.5 text-xs text-[var(--color-danger)]">
                      {errors.publisher}
                    </p>
                  )}
                </div>

                {/* Publication year */}
                <div>
                  <label
                    htmlFor="publicationYear"
                    className="text-sm font-medium text-[var(--color-text)]"
                  >
                    Año de publicación{" "}
                    <span className="text-[var(--color-danger)]">*</span>
                  </label>

                  <input
                    id="publicationYear"
                    name="publicationYear"
                    type="number"
                    value={formData.publicationYear}
                    onChange={handleChange}
                    placeholder="Ej. 2020"
                    className={`mt-2 w-full rounded-xl border bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-info)]/20 ${
                      errors.publicationYear
                        ? "border-[var(--color-danger)]"
                        : "border-[var(--color-border)] focus:border-[var(--color-info)]"
                    }`}
                  />

                  {errors.publicationYear && (
                    <p className="mt-1.5 text-xs text-[var(--color-danger)]">
                      {errors.publicationYear}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-[var(--color-text)]"
                  >
                    Categoría{" "}
                    <span className="text-[var(--color-danger)]">*</span>
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-xl border bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition focus:ring-2 focus:ring-[var(--color-info)]/20 ${
                      errors.category
                        ? "border-[var(--color-danger)]"
                        : "border-[var(--color-border)] focus:border-[var(--color-info)]"
                    }`}
                  >
                    <option value="" disabled>
                      Seleccionar categoría
                    </option>

                    <option value="Novela">Novela</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Distopía">Distopía</option>
                    <option value="Romance">Romance</option>
                  </select>

                  {errors.category && (
                    <p className="mt-1.5 text-xs text-[var(--color-danger)]">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Language */}
                <div>
                  <label
                    htmlFor="language"
                    className="text-sm font-medium text-[var(--color-text)]"
                  >
                    Idioma{" "}
                    <span className="text-[var(--color-danger)]">*</span>
                  </label>

                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-xl border bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition focus:ring-2 focus:ring-[var(--color-info)]/20 ${
                      errors.language
                        ? "border-[var(--color-danger)]"
                        : "border-[var(--color-border)]"
                    }`}
                  >
                    <option value="" disabled>
                      Seleccionar idioma
                    </option>

                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Francés">Francés</option>
                    <option value="Alemán">Alemán</option>
                    <option value="Italiano">Italiano</option>
                    <option value="Portugués">Portugués</option>
                  </select>

                  {errors.language && (
                    <p className="mt-1.5 text-xs text-[var(--color-danger)]">
                      {errors.language}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-[var(--color-text)]"
                  >
                    Descripción{" "}
                    <span className="text-[var(--color-danger)]">*</span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe brevemente el contenido del libro..."
                    className={`mt-2 w-full resize-none rounded-xl border bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-info)]/20 ${
                      errors.description
                        ? "border-[var(--color-danger)]"
                        : "border-[var(--color-border)] focus:border-[var(--color-info)]"
                    }`}
                  />

                  {errors.description && (
                    <p className="mt-1.5 text-xs text-[var(--color-danger)]">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="p-6 lg:p-8">

            <div>
              <h2 className="text-base font-semibold text-[var(--color-text)]">
                Inventario
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Información utilizada para controlar las existencias.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* Total copies */}
              <div>
                <label
                  htmlFor="totalCopies"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Copias totales{" "}
                  <span className="text-[var(--color-danger)]">*</span>
                </label>

                <input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min="1"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  placeholder="Ej. 5"
                  className={`mt-2 w-full rounded-xl border bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-info)]/20 ${
                    errors.totalCopies
                      ? "border-[var(--color-danger)]"
                      : "border-[var(--color-border)] focus:border-[var(--color-info)]"
                  }`}
                />

                {errors.totalCopies ? (
                  <p className="mt-1.5 text-xs text-[var(--color-danger)]">
                    {errors.totalCopies}
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                    Las copias disponibles se establecerán automáticamente.
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Ubicación{" "}
                  <span className="text-xs font-normal text-[var(--color-text-muted)]">
                    (opcional)
                  </span>
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ej. Estante A-01"
                  className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-info)] focus:ring-2 focus:ring-[var(--color-info)]/20"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] bg-[var(--color-background)] px-6 py-5 sm:flex-row sm:justify-end lg:px-8">

            <button
              type="button"
              onClick={() => navigate("/catalogo")}
              className="inline-flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-elevated)]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
            >
              <Upload size={17} />
              Guardar libro
            </button>

          </div>
        </form>
      </div>
    </section>
  );
}

export default BookForm;