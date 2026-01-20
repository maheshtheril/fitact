import { getPlans, getGlobalSettings } from "@/lib/actions"
import PlansClient from "./PlansClient"

export const dynamic = 'force-dynamic'

export default async function PlansPage() {
    const plans = await getPlans()
    const settings = await getGlobalSettings()

    return <PlansClient plans={plans} settings={settings} />
}
