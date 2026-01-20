"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
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
    ChevronDown,
    ChevronRight,
    Circle,
    Send
} from "lucide-react"

type MenuItem = {
    href?: string
    label: string
    icon: any
    badge?: string
    subItems?: { label: string; href: string; icon?: any; badge?: string }[]
}

const sidebarItems: MenuItem[] = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
        label: "Manage Users",
        icon: Users,
        badge: "!",
        subItems: [
            { label: "Active Users", href: "/admin/users/active", icon: Circle },
            { label: "Banned Users", href: "/admin/users/banned", icon: Circle },
            { label: "Email Unverified", href: "/admin/users/email-unverified", icon: Circle, badge: "1080" },
            { label: "Mobile Unverified", href: "/admin/users/mobile-unverified", icon: Circle },
            { label: "KYC Unverified", href: "/admin/users/kyc-unverified", icon: Circle },
            { label: "KYC Pending", href: "/admin/users/kyc-pending", icon: Circle },
            { label: "With Balance", href: "/admin/users/with-balance", icon: Circle },
            { label: "All Users", href: "/admin/users/all", icon: Circle },
            { label: "Send Notification", href: "/admin/users/send-notification", icon: Send },
        ]
    },
    { href: "/admin/plans", label: "Plans", icon: Layers },
    { href: "/admin/pins", label: "Manage Pins", icon: Key }, // Simplified for now
    { href: "/admin/deposits", label: "Deposits", icon: Wallet, badge: "!" },
    { href: "/admin/withdrawals", label: "Withdrawals", icon: ArrowRightLeft, badge: "!" },
    { href: "/admin/tickets", label: "Support Ticket", icon: Ticket, badge: "!" },
    { href: "/admin/reports", label: "Report", icon: FileText },
    { href: "/admin/subscribers", label: "Subscribers", icon: UserPlus },
    { href: "/admin/settings", label: "System Setting", icon: Settings },
    { href: "/admin/extra", label: "Extra", icon: Grid },
    { href: "/admin/report-request", label: "Report & Request", icon: FileQuestion },
]

export function Sidebar() {
    const pathname = usePathname()
    const [openMenus, setOpenMenus] = useState<string[]>(["Manage Users"]) // Default open for demo

    const toggleMenu = (label: string) => {
        setOpenMenus(prev =>
            prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label]
        )
    }

    return (
        <div className="w-64 bg-[#000029] text-white flex flex-col h-screen fixed left-0 top-0 z-50 overflow-y-auto no-scrollbar">
            {/* Logo */}
            <div className="p-6 flex items-center gap-2 border-b border-gray-800">
                <div className="w-8 h-8 relative">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-orange-500">
                        <path d="M12 2L2 22H22L12 2Z" fill="currentColor" />
                        <path d="M12 6L5 20H19L12 6Z" fill="#000029" />
                    </svg>
                </div>
                <span className="text-2xl font-bold tracking-tight">Matrix<span className="text-orange-500">Lab</span></span>
            </div>

            <div className="p-4 space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = item.href ? pathname === item.href : false
                    const isOpen = openMenus.includes(item.label)

                    if (item.subItems) {
                        return (
                            <div key={item.label}>
                                <button
                                    onClick={() => toggleMenu(item.label)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-3 rounded-lg mb-1 transition-colors relative group",
                                        isOpen ? "bg-transparent text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {item.badge && (
                                            <span className="bg-[#ff9f43] text-black text-[10px] font-bold px-1.5 rounded-sm">
                                                {item.badge}
                                            </span>
                                        )}
                                        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="pl-4 space-y-1 mt-1 bg-[#0a0a3c] rounded-lg py-2">
                                        {item.subItems.map((sub) => {
                                            const isSubActive = pathname === sub.href
                                            return (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    className={cn(
                                                        "flex items-center justify-between px-4 py-2 rounded-md transition-colors text-sm",
                                                        isSubActive
                                                            ? "bg-[#4634ff] text-white ml-2 shadow-md"
                                                            : "text-gray-400 hover:text-white hover:pl-6 transition-all duration-3000 ease-in-out"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {sub.icon === Circle ? <Circle className="w-2 h-2" /> : <sub.icon className="w-4 h-4" />}
                                                        <span>{sub.label}</span>
                                                    </div>
                                                    {sub.badge && (
                                                        <span className="bg-blue-500 text-white text-[10px] px-1.5 rounded-sm">{sub.badge}</span>
                                                    )}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href || '#'}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-lg mb-1 transition-colors relative group",
                                isActive
                                    ? "bg-[#4634ff] text-white shadow-lg shadow-indigo-500/20"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium text-sm">{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="bg-[#ff9f43] text-black text-[10px] font-bold px-1.5 rounded-sm">
                                    {item.badge}
                                </span>
                            )}
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
