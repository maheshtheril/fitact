"use client"

import { Search, Monitor, Tablet, Smartphone } from "lucide-react"

// Mock data to match the screenshot
const users = [
    {
        id: 1,
        name: "siya mahesh",
        username: "@maheshtherilt",
        email: "Email is protected for the demo",
        mobile: "Mobile is protected for the demo",
        country: "IN",
        joinedAt: "2026-01-19 06:11 PM",
        joinedAgo: "8 hours ago",
        balance: "$0.00",
    },
    {
        id: 2,
        name: "NEEED NEEED",
        username: "@louisa",
        email: "Email is protected for the demo",
        mobile: "Mobile is protected for the demo",
        country: "IN",
        joinedAt: "2026-01-19 04:30 PM",
        joinedAgo: "9 hours ago",
        balance: "$0.00",
    },
    {
        id: 3,
        name: "aaxir soft",
        username: "@maheshtheril",
        email: "Email is protected for the demo",
        mobile: "Mobile is protected for the demo",
        country: "AF",
        joinedAt: "2026-01-19 10:17 AM",
        joinedAgo: "16 hours ago",
        balance: "$0.00",
    },
    {
        id: 4,
        name: "Style heel",
        username: "@aryanlala",
        email: "Email is protected for the demo",
        mobile: "Mobile is protected for the demo",
        country: "AF",
        joinedAt: "2026-01-13 12:21 PM",
        joinedAgo: "6 days ago",
        balance: "$0.00",
    },
    {
        id: 5,
        name: "Guilherme Augusto",
        username: "@",
        email: "Email is protected for the demo",
        mobile: "Mobile is protected for the demo",
        country: "",
        joinedAt: "2026-01-12 06:48 PM",
        joinedAgo: "1 week ago",
        balance: "$0.00",
    },
    {
        id: 6,
        name: "sw sw-creations001",
        username: "@12345678910111213",
        email: "Email is protected for the demo",
        mobile: "Mobile is protected for the demo",
        country: "AF",
        joinedAt: "2026-01-12 10:16 AM",
        joinedAgo: "1 week ago",
        balance: "$0.00",
    },
    {
        id: 7,
        name: "Jltender Verma ) (Jeet)",
        username: "@eetguitaram",
        email: "Email is protected for the demo",
        mobile: "Mobile is protected for the demo",
        country: "AF",
        joinedAt: "2026-01-07 07:17 PM",
        joinedAgo: "1 week ago",
        balance: "$0.00",
    }
]

export default function ActiveUsersPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-xl font-medium text-gray-700">Active Users</h1>

            <div className="flex justify-end mb-4">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Username / Email"
                        className="border border-r-0 border-gray-300 rounded-l-sm px-4 py-2 text-sm focus:outline-none w-64"
                    />
                    <button className="bg-[#4634ff] text-white px-4 py-2 rounded-r-sm hover:bg-indigo-700">
                        <Search className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#4634ff] text-white text-left">
                            <th className="px-6 py-3 text-sm font-semibold">User</th>
                            <th className="px-6 py-3 text-sm font-semibold">Email-Mobile</th>
                            <th className="px-6 py-3 text-sm font-semibold">Country</th>
                            <th className="px-6 py-3 text-sm font-semibold">Joined At</th>
                            <th className="px-6 py-3 text-sm font-semibold">Balance</th>
                            <th className="px-6 py-3 text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                        <p className="text-indigo-500 text-xs">{user.username}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-gray-500 text-xs italic">{user.email}</p>
                                        <p className="text-gray-500 text-xs italic">{user.mobile}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-gray-700">{user.country || '--'}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-gray-600 text-xs font-medium">{user.joinedAt}</p>
                                        <p className="text-gray-400 text-xs">{user.joinedAgo}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-gray-700 text-sm">{user.balance}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="flex items-center gap-1 text-indigo-500 border border-indigo-500 px-3 py-1 rounded text-xs hover:bg-indigo-50 transition-colors">
                                        <Monitor className="w-3 h-3" />
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-end mt-4">
                <div className="flex gap-1 text-sm">
                    {/* Simple pagination UI if needed */}
                </div>
            </div>
        </div>
    )
}
