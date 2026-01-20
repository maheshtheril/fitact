"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createPlan } from "@/lib/actions"

interface Props {
    matrixHeight: number
}

export default function PlanCreateClient({ matrixHeight }: Props) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [referralBonus, setReferralBonus] = useState("")
    const [levelCommissions, setLevelCommissions] = useState<string[]>(Array(matrixHeight).fill(""))

    const handleLevelChange = (index: number, value: string) => {
        const newLevels = [...levelCommissions]
        newLevels[index] = value
        setLevelCommissions(newLevels)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await createPlan({
                name,
                price: parseFloat(price) || 0,
                referralBonus: parseFloat(referralBonus) || 0,
                levelCommissions: levelCommissions.map(l => parseFloat(l) || 0)
            })
            router.push("/admin/plan")
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Plan Create</h1>
                <Link
                    href="/admin/plan"
                    className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e50ee] focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price <span className="text-red-500">*</span></label>
                            <div className="flex items-stretch">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#5e50ee] focus:border-transparent"
                                    required
                                />
                                <span className="flex items-center px-4 bg-gray-100 border border-l-0 border-gray-200 rounded-r-lg text-gray-500 text-sm font-medium">USD</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Referral Bonus <span className="text-red-500">*</span></label>
                            <div className="flex items-stretch">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={referralBonus}
                                    onChange={(e) => setReferralBonus(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#5e50ee] focus:border-transparent"
                                    required
                                />
                                <span className="flex items-center px-4 bg-gray-100 border border-l-0 border-gray-200 rounded-r-lg text-gray-500 text-sm font-medium">USD</span>
                            </div>
                        </div>
                    </div>

                    {/* Level Commissions */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-medium text-gray-700 text-center">Level Commissions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {levelCommissions.map((val, idx) => (
                                <div key={idx}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Level {idx + 1} <span className="text-red-500">*</span></label>
                                    <div className="flex items-stretch">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={val}
                                            onChange={(e) => handleLevelChange(idx, e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#5e50ee] focus:border-transparent"
                                            required
                                        />
                                        <span className="flex items-center px-4 bg-gray-100 border border-l-0 border-gray-200 rounded-r-lg text-gray-500 text-sm font-medium">USD</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#3424ff] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#281bdb] transition-all shadow-lg active:scale-[0.99] disabled:opacity-70"
                    >
                        {loading ? "Creating..." : "Plan Create"}
                    </button>
                </form>
            </div>
        </div>
    )
}
