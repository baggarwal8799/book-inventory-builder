"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleChange}
        className="text-base"
      />
    </div>
  );
};

export default SearchBar;
