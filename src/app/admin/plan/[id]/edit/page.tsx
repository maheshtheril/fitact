import { getPlan, getGlobalSettings } from "@/lib/actions"
import PlanEditClient from "./PlanEditClient"
import { notFound } from "next/navigation"

export default async function PlanEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const plan = await getPlan(id)
    const settings = await getGlobalSettings()

    if (!plan) notFound()

    return <PlanEditClient plan={plan as any} matrixHeight={settings.matrixHeight} />
}
