"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Users,
    Layers,
    Key,
    Wallet,
    ArrowRightLeft,
    Ticket,
    FileText,
    UserPlus,
    Settings,
    Grid,
    FileQuestion,
    LogOut,
    Globe
} from "lucide-react"

const sidebarItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Manage Users", icon: Users },
    { href: "/admin/plans", label: "Plans", icon: Layers },
    { href: "/admin/pins", label: "Manage Pins", icon: Key },
    { href: "/admin/deposits", label: "Deposits", icon: Wallet },
    { href: "/admin/withdrawals", label: "Withdrawals", icon: ArrowRightLeft },
    { href: "/admin/tickets", label: "Support Ticket", icon: Ticket },
    { href: "/admin/reports", label: "Report", icon: FileText },
    { href: "/admin/subscribers", label: "Subscribers", icon: UserPlus },
    { href: "/admin/settings", label: "System Setting", icon: Settings },
    { href: "/admin/extra", label: "Extra", icon: Grid },
    { href: "/admin/report-request", label: "Report & Request", icon: FileQuestion },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 bg-[#000029] text-white flex flex-col h-screen fixed left-0 top-0 z-50 overflow-y-auto">
            {/* Logo */}
            <div className="p-6 flex items-center gap-2 border-b border-gray-800">
                <div className="w-8 h-8 relative">
                    {/* Placeholder for M Logo */}
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-orange-500">
                        <path d="M12 2L2 22H22L12 2Z" fill="currentColor" />
                        <path d="M12 6L5 20H19L12 6Z" fill="#000029" />
                    </svg>
                </div>
                <span className="text-2xl font-bold tracking-tight">Matrix<span className="text-orange-500">Lab</span></span>
            </div>

            <div className="p-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors relative group",
                                isActive
                                    ? "bg-[#4634ff] text-white shadow-lg shadow-indigo-500/20"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{item.label}</span>
                            {/* Optional: Add chevrons for dropdowns if needed */}
                        </Link>
                    )
                })}
            </div>

            <div className="mt-auto p-4 border-t border-gray-800 text-xs text-center text-gray-500">
                MATRIXLAB V3.0.1
            </div>
        </div>
    )
}
