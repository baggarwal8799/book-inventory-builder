"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/books/SearchBar";
import BookTable from "@/components/books/BookTable";
import { Book } from "@/appTypes";
import { useRouter } from "next/navigation";
import { showErrorToast } from "@/utils";

export default function BooksPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getBooks`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setBooks(data.data);
      setFilteredBooks(data.data);
    } catch (err) {
      err instanceof Error
        ? showErrorToast(err.message)
        : showErrorToast("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    const filtered = books.filter((b) =>
      Object.values(b).join(" ").toLowerCase().includes(q)
    );
    setFilteredBooks(filtered);
  }, [query, books]);

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-row gap-4 items-center">
        <div className="flex-1">
          <SearchBar onSearch={setQuery} />
        </div>
        <button
          onClick={() => router.push("/add-book")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add New Book
        </button>
      </div>
      <BookTable books={filteredBooks} loading={loading} />
    </div>
  );
}
