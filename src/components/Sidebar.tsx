'use client'

export default function Sidebar() {
  return (
    <aside className="bg-gray-100 w-full sm:w-64 p-4 space-y-2">
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">
              Quiz History
            </a>
          </li>
          <li>
            <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
