import Image from "next/image";
import Link from "next/link";
import { Home, MessageSquare, Clock, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col items-center py-8 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="flex flex-col items-center gap-3 mb-12">
          <Image 
            src="/Nayepankh Connect Logo.png" 
            alt="Logo" 
            width={60} 
            height={60} 
            className="rounded-full shadow-md border-2 border-white"
          />
          <h2 className="font-bold text-lg text-primary tracking-tight">Nayepankh</h2>
        </div>

        <nav className="flex flex-col w-full px-4 gap-2 flex-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-green-50 text-primary font-semibold transition-colors">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link href="/dashboard/chat" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
            <MessageSquare size={20} />
            <span>Chat</span>
          </Link>
          <Link href="/dashboard/log-hours" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
            <Clock size={20} />
            <span>Log Hours</span>
          </Link>
        </nav>

        <div className="w-full px-4 mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-gray-400 hover:bg-red-50 hover:text-red-600 font-medium transition-colors">
            <LogOut size={20} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
