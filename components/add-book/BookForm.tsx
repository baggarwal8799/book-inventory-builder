"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils"; // optional toast helpers
import { useRouter } from "next/navigation";

interface Props {
  data: any;
}

const BookForm = ({ data }: Props) => {
  const fields = ["title", "author", "grade", "subject", "series"];
  const [formData, setFormData] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const router = useRouter();
  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/add-book`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Failed to save book");
      }

      showSuccessToast?.(json.message);
      router.push("/books");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred";
      showErrorToast?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-h-full overflow-y-auto p-4 space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">📘 Book Details</h3>
      {fields.map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 capitalize">
            {field}
          </label>
          <Input
            type="text"
            defaultValue={formData?.[field] || ""}
            placeholder={`Enter ${field}`}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </div>
      ))}
      <Button className="w-full mt-4" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Book"}
      </Button>
    </div>
  );
};

export default BookForm;
