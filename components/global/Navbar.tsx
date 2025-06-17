'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center h-16">
      <Link href="/books" className="text-lg font-semibold">
        📚 Book Inventory
      </Link>
      <span className="text-sm text-gray-600">AI-powered Inventory Builder</span>
    </nav>
  );
}
