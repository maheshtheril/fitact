import { Sidebar } from "@/components/Sidebar"
import { Bell, Search, Globe, User, Settings, Power } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#f6f6f9]">
            <Sidebar />

            <div className="ml-64">
                {/* Top Navbar */}
                <header className="bg-[#000029] text-white h-16 flex items-center justify-between px-6 sticky top-0 z-40 shadow-md">
                    <div className="w-1/3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="w-full bg-[#10103a] border border-[#2d2d58] rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors relative">
                            <Globe className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">8+</span>
                        </button>
                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-700">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium">admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
