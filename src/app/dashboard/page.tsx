'use client'

import Sidebar from '../../components/Sidebar'
import TopNav from '../../components/TopNav'

export default function DashboardPage() {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopNav />
        <main className="flex-1 p-4">
          <p>✅ You are logged in. Welcome to your dashboard.</p>
        </main>
      </div>
    </div>
  )
}
