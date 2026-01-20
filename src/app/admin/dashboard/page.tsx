import { getDashboardStats } from "@/lib/actions"
import DashboardClient from "./DashboardClient"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const data = await getDashboardStats()
    return <DashboardClient data={data} />
}
