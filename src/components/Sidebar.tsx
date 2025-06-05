'use client'

import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="bg-gray-100 w-full sm:w-64 p-4 space-y-2">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block px-2 py-1 rounded hover:bg-gray-200">
              Home
            </Link>
          </li>
          <li>
            <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">
              Quiz History
            </a>
          </li>
          <li>
            <Link href="/profile" className="block px-2 py-1 rounded hover:bg-gray-200">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
