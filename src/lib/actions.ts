import { PrismaClient } from '@prisma/client'

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
        totalDeposited: totalDeposited._sum.amount || 0,
        pendingDeposits,
        rejectedDeposits,
        depositedCharge: depositedCharge._sum.charge || 0,
        totalWithdrawn: totalWithdrawn._sum.amount || 0,
        pendingWithdrawals,
        rejectedWithdrawals,
        withdrawalCharge: withdrawalCharge._sum.charge || 0,
        totalPlans,
        totalPins,
        totalCommissions: totalCommissions._sum.amount || 0
    }
}
