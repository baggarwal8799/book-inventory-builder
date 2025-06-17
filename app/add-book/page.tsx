'use client';

import { useState } from "react";
import { DragDropImage, BookForm } from "@/components/add-book";

export default function AddBookPage() {
  const [bookData, setBookData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden p-0 m-0">
      {/* Left: Image Drop */}
      <div className="w-full md:w-1/2 h-full p-4">
        <DragDropImage onParsedData={setBookData} setLoading={setLoading} />
      </div>

      {/* Right: Loader or Form */}
      <div className="w-full md:w-1/2 h-full p-4 flex items-center justify-center bg-gray-50">
        {loading ? (
          <div className="text-blue-600 text-lg animate-pulse">
            Loading book metadata...
          </div>
        ) : bookData ? (
          <BookForm data={bookData} />
        ) : (
          <p className="text-gray-400 text-center px-4">
            Drop a book cover to begin...
          </p>
        )}
      </div>
    </div>
  );
}
