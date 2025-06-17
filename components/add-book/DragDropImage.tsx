"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { showErrorToast } from "@/utils"; // optional if you have it

interface Props {
  onParsedData: (data: any) => void;
  setLoading: (value: boolean) => void;
}

const DragDropImage = ({ onParsedData, setLoading }: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setImage(base64);
        setError(null);

        try {
          setLoading(true);

          const res = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL}/api/gemini`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          });

          const json = await res.json();

          if (!res.ok) {
            throw new Error(json?.error || "Failed to fetch metadata");
          }

          if (!json.parsed || Object.keys(json.parsed).length === 0) {
            throw new Error("Book data could not be extracted.");
          }

          onParsedData(json.parsed);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Unexpected error occurred";
          setError(message);
          showErrorToast?.(message);
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(file);
    },
    [onParsedData, setLoading]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg h-full flex items-center justify-center cursor-pointer overflow-hidden ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {image ? (
        <img
          src={image}
          alt="Preview"
          className="object-contain max-h-full max-w-full"
        />
      ) : (
        <p className="text-gray-500 text-center px-4">
          {isDragActive
            ? "Drop the book cover here..."
            : "Drag and drop a book cover image here or click to select"}
        </p>
      )}
      {error && <p className="text-red-600 mt-2 absolute bottom-4">{error}</p>}
    </div>
  );
};

export default DragDropImage;
