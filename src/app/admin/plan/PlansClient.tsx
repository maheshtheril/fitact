"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Settings, Edit, Power, X } from "lucide-react"
import { addPlan, updatePlan, togglePlanStatus, updateMatrixSettings } from "@/lib/actions"

interface Plan {
    id: string
    name: string
    price: number
    status: boolean
    createdAt: Date
}

interface Settings {
    matrixHeight: number
    matrixWidth: number
}

export default function PlansClient({ plans, settings }: { plans: Plan[], settings: Settings }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

    // Form states
    const [planName, setPlanName] = useState("")
    const [planPrice, setPlanPrice] = useState("")
    const [matrixHeight, setMatrixHeight] = useState(settings.matrixHeight)
    const [matrixWidth, setMatrixWidth] = useState(settings.matrixWidth)

    const handleAddPlan = async (e: React.FormEvent) => {
        e.preventDefault()
        await addPlan(planName, parseFloat(planPrice))
        setIsAddModalOpen(false)
        setPlanName("")
        setPlanPrice("")
    }

    const handleEditPlan = async (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedPlan) {
            await updatePlan(selectedPlan.id, planName, parseFloat(planPrice))
            setIsEditModalOpen(false)
            setSelectedPlan(null)
        }
    }

    const handleUpdateMatrix = async (e: React.FormEvent) => {
        e.preventDefault()
        await updateMatrixSettings(matrixHeight, matrixWidth)
        setIsMatrixModalOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">All Plan List</h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsMatrixModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors text-sm font-medium"
                    >
                        <Settings className="w-4 h-4" />
                        Matrix Setting
                    </button>
                    <button
                        onClick={() => {
                            setPlanName("")
                            setPlanPrice("")
                            setIsAddModalOpen(true)
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Add Plan
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#5e50ee] text-white text-sm font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {plans.map((plan) => (
                            <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-700">{plan.name}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">${plan.price.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${plan.status ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
                                        }`}>
                                        {plan.status ? 'Enabled' : 'Disabled'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedPlan(plan)
                                            setPlanName(plan.name)
                                            setPlanPrice(plan.price.toString())
                                            setIsEditModalOpen(true)
                                        }}
                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-100"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => togglePlanStatus(plan.id, plan.status)}
                                        className={`p-2 rounded-lg transition-colors border ${plan.status ? 'text-red-500 hover:bg-red-50 border-red-100' : 'text-green-500 hover:bg-green-50 border-green-100'}`}
                                    >
                                        <Power className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals Implementation */}
            <AnimatePresence>
                {/* Matrix Setting Modal */}
                {isMatrixModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-800">Matrix Setting Update</h3>
                                <button onClick={() => setIsMatrixModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleUpdateMatrix} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Matrix Height <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        value={matrixHeight}
                                        onChange={(e) => setMatrixHeight(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Matrix Width <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        value={matrixWidth}
                                        onChange={(e) => setMatrixWidth(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full bg-[#5e50ee] text-white py-2.5 rounded-lg font-medium hover:bg-[#4d42cc] transition-colors mt-2">
                                    Update
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Add/Edit Plan Modal Wrapper */}
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-800">{isAddModalOpen ? 'Add New Plan' : 'Edit Plan'}</h3>
                                <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false) }} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={isAddModalOpen ? handleAddPlan : handleEditPlan} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={planName}
                                        onChange={(e) => setPlanName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                        placeholder="Plan Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={planPrice}
                                            onChange={(e) => setPlanPrice(e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-[#5e50ee] text-white py-2.5 rounded-lg font-medium hover:bg-[#4d42cc] transition-colors mt-2">
                                    {isAddModalOpen ? 'Create Plan' : 'Update Plan'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
