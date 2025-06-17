"use client";

import { Book } from "@/appTypes";

interface BookTableProps {
  books: Book[];
  loading: boolean;
}

const BookTable = ({ books, loading }: BookTableProps) => {
  if (loading) {
    return (
      <div className="w-full py-40 text-center text-gray-400 text-xl border border-dashed border-gray-300 rounded-md">
        Loading books...
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="w-full py-40 text-center text-gray-500 text-2xl border border-dashed border-gray-300 rounded-md">
        No content available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            {["Title", "Author", "Grade", "Subject", "Series"].map((header) => (
              <th
                key={header}
                className="text-left p-3 border-b text-sm font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-3 border-b text-sm">{book.title}</td>
              <td className="p-3 border-b text-sm">{book.author}</td>
              <td className="p-3 border-b text-sm">{book.grade || "-"}</td>
              <td className="p-3 border-b text-sm">{book.subject || "-"}</td>
              <td className="p-3 border-b text-sm">{book.series || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
