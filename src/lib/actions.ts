"use server"
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function getDashboardStats() {
    const [
        totalUsers,
        activeUsers,
        emailUnverified,
        mobileUnverified,
        totalDeposited,
        pendingDeposits,
        rejectedDeposits,
        depositedCharge,
        totalWithdrawn,
        pendingWithdrawals,
        rejectedWithdrawals,
        withdrawalCharge,
        totalPlans,
        totalPins,
        totalCommissions
    ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { status: true } }),
        prisma.user.count({ where: { emailVerified: false } }),
        prisma.user.count({ where: { mobileVerified: false } }),

        // Deposits
        prisma.deposit.aggregate({
            _sum: { amount: true },
            where: { status: 'approved' }
        }),
        prisma.deposit.count({ where: { status: 'pending' } }),
        prisma.deposit.count({ where: { status: 'rejected' } }),
        prisma.deposit.aggregate({
            _sum: { charge: true },
            where: { status: 'approved' }
        }),

        // Withdrawals
        prisma.withdrawal.aggregate({
            _sum: { amount: true },
            where: { status: 'approved' }
        }),
        prisma.withdrawal.count({ where: { status: 'pending' } }),
        prisma.withdrawal.count({ where: { status: 'rejected' } }),
        prisma.withdrawal.aggregate({
            _sum: { charge: true },
            where: { status: 'approved' }
        }),

        // Others
        prisma.plan.count(),
        prisma.pin.count(),
        prisma.commission.aggregate({
            _sum: { amount: true }
        })
    ])

    return {
        totalUsers,
        activeUsers,
        emailUnverified,
        mobileUnverified,
        totalDeposited: totalDeposited._sum.amount ? totalDeposited._sum.amount.toNumber() : 0,
        pendingDeposits,
        rejectedDeposits,
        depositedCharge: depositedCharge._sum.charge ? depositedCharge._sum.charge.toNumber() : 0,
        totalWithdrawn: totalWithdrawn._sum.amount ? totalWithdrawn._sum.amount.toNumber() : 0,
        pendingWithdrawals,
        rejectedWithdrawals,
        withdrawalCharge: withdrawalCharge._sum.charge ? withdrawalCharge._sum.charge.toNumber() : 0,
        totalPlans,
        totalPins,
        totalCommissions: totalCommissions._sum.amount ? totalCommissions._sum.amount.toNumber() : 0
    }
}

export async function getPlans() {
    const plans = await prisma.plan.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return plans.map(p => ({
        ...p,
        price: p.price.toNumber()
    }))
}

export async function getGlobalSettings() {
    let settings = await prisma.globalSetting.findFirst()
    if (!settings) {
        settings = await prisma.globalSetting.create({
            data: { id: '1' }
        })
    }
    return settings
}

export async function updateMatrixSettings(height: number, width: number) {
    await prisma.globalSetting.update({
        where: { id: '1' },
        data: {
            matrixHeight: height,
            matrixWidth: width
        }
    })
    revalidatePath('/admin/plan')
}

export async function addPlan(name: string, price: number) {
    await prisma.plan.create({
        data: {
            name,
            price: price
        }
    })
    revalidatePath('/admin/plan')
}

export async function updatePlan(id: string, name: string, price: number) {
    await prisma.plan.update({
        where: { id },
        data: {
            name,
            price: price
        }
    })
    revalidatePath('/admin/plan')
}

export async function togglePlanStatus(id: string, currentStatus: boolean) {
    await prisma.plan.update({
        where: { id },
        data: {
            status: !currentStatus
        }
    })
    revalidatePath('/admin/plan')
}
