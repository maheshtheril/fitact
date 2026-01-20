import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@matrixlab.com',
            password: 'password', // Plain text for demo as requested (implied simple access)
            isAdmin: true,
            emailVerified: true,
            mobileVerified: true,
            status: true,
            referralCode: 'ADMIN123'
        },
    })
    console.log({ admin })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
