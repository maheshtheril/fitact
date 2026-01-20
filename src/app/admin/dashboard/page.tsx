import { Users, UserCheck, Mail, Smartphone, RefreshCw, Key, Lock, CreditCard } from "lucide-react"
import { getDashboardStats } from "@/lib/actions"
import { motion } from "framer-motion"
import * as React from 'react'

// Custom Icons placeholders - Client components wrapping Lucide icons
// We need to define these as simple functional components that can be rendered
const WalletCard = ({ className }: { className?: string }) => <div className={className}><CreditCard className="w-6 h-6" /></div>
const BanCircle = ({ className }: { className?: string }) => <div className={className}><Lock className="w-6 h-6" /></div>
const PercentCircle = ({ className }: { className?: string }) => <div className={className}><Users className="w-6 h-6" /></div>


export default async function DashboardPage() {
    const data = await getDashboardStats()

    const stats = [
        { label: "Total Users", value: data.totalUsers, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
        { label: "Active Users", value: data.activeUsers, icon: UserCheck, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
        { label: "Email Unverified", value: data.emailUnverified, sub: "Users", icon: Mail, color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
        { label: "Mobile Unverified", value: data.mobileUnverified, sub: "Users", icon: Smartphone, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
    ]

    const depositStats = [
        { label: "Total Deposited", value: `$${data.totalDeposited}`, icon: WalletCard, color: "text-green-600", bg: "bg-green-50" },
        { label: "Pending Deposits", value: data.pendingDeposits, icon: RefreshCw, color: "text-orange-400", bg: "bg-orange-50" },
        { label: "Rejected Deposits", value: data.rejectedDeposits, icon: BanCircle, color: "text-red-500", bg: "bg-red-50" },
        { label: "Deposited Charge", value: `$${data.depositedCharge}`, icon: PercentCircle, color: "text-indigo-500", bg: "bg-indigo-50" },
    ]

    const withdrawalStats = [
        { label: "Total Withdrawn", value: `$${data.totalWithdrawn}`, icon: WalletCard, color: "text-green-600", bg: "bg-green-50" },
        { label: "Pending Withdrawals", value: data.pendingWithdrawals, icon: RefreshCw, color: "text-orange-400", bg: "bg-orange-50" },
        { label: "Rejected Withdrawals", value: data.rejectedWithdrawals, icon: BanCircle, color: "text-red-500", bg: "bg-red-50" },
        { label: "Withdrawal Charge", value: `$${data.withdrawalCharge}`, icon: PercentCircle, color: "text-indigo-500", bg: "bg-indigo-50" },
    ]

    // Note: Framer Motion cannot be used directly in Server Components for the animation props.
    // We will render simple divs for the layout, preserving the style.

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`bg-white p-6 rounded-xl shadow-sm border ${stat.border} flex items-center justify-between hover:translate-y-[-5px] transition-transform duration-300 cursor-pointer`}
                    >
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            {stat.sub && <p className="text-xs text-gray-400">{stat.sub}</p>}
                            <h3 className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</h3>
                        </div>
                        <div className={`p-4 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Deposits Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-medium text-gray-700">Deposits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {depositStats.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 hover:scale-[1.02] transition-transform"
                            >
                                <div className={`p-3 rounded-full ${item.bg} ${item.color}`}>
                                    <item.icon />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg">{item.value}</h4>
                                    <p className="text-xs text-gray-500">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Withdrawals Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-medium text-gray-700">Withdrawals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {withdrawalStats.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 hover:scale-[1.02] transition-transform"
                            >
                                <div className={`p-3 rounded-full ${item.bg} ${item.color}`}>
                                    <item.icon />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg">{item.value}</h4>
                                    <p className="text-xs text-gray-500">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-100 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-indigo-600 font-medium">Total Plans</p>
                        <h3 className="text-3xl font-bold text-indigo-900 mt-1">{data.totalPlans}</h3>
                    </div>
                    <div className="text-indigo-400">
                        <Key className="w-8 h-8" />
                    </div>
                </div>
                <div className="bg-orange-100 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-orange-600 font-medium">All Pins</p>
                        <h3 className="text-3xl font-bold text-orange-900 mt-1">{data.totalPins}</h3>
                    </div>
                    <div className="text-orange-400">
                        <Lock className="w-8 h-8" />
                    </div>
                </div>
                <div className="bg-blue-100 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-blue-600 font-medium">Total Commissions</p>
                        <h3 className="text-3xl font-bold text-blue-900 mt-1">${data.totalCommissions}</h3>
                    </div>
                    <div className="text-blue-400">
                        <Lock className="w-8 h-8" />
                    </div>
                </div>
            </div>

        </div>
    )
}
