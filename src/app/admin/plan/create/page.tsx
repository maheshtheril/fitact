import { getGlobalSettings } from "@/lib/actions"
import PlanCreateClient from "./PlanCreateClient"

export default async function PlanCreatePage() {
    const settings = await getGlobalSettings()
    return <PlanCreateClient matrixHeight={settings.matrixHeight} />
}
