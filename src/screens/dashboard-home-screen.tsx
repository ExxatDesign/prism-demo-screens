import { useEffect } from "react"

import DashboardImport from "@/imports/StepsExxatComDashboard1440WDefault"

export const PRISM_DASHBOARD_NAV_MESSAGE = "prism-dashboard-nav" as const

/** STEPS dashboard rows that open another Exxat product surface. */
export const DASHBOARD_EXTERNAL_LINK_IDS = [
  "dashboard-navigationitem-navigate-link-program.information",
  "dashboard-navigationitem-navigate-link-admin.profile",
  "dashboard-navigationitem-navigate-link-faculty.information",
  "dashboard-navigationitem-navigate-link-admin.course",
  "dashboard-navigationitem-navigate-link-competency.management",
] as const

function wireDashboardNavigation(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(".dashboard_nav_item").forEach(row => {
    if (row.dataset.prismNavWired === "1") return
    const link = row.querySelector<HTMLAnchorElement>(
      "a[id^='dashboard-navigationitem-navigate-link-']",
    )
    if (!link?.id) return

    row.dataset.prismNavWired = "1"
    row.addEventListener("click", event => {
      event.preventDefault()
      window.parent.postMessage(
        { type: PRISM_DASHBOARD_NAV_MESSAGE, linkId: link.id },
        "*",
      )
    })
  })
}

export default function DashboardHomeScreen() {
  useEffect(() => {
    wireDashboardNavigation(document)
  }, [])

  return <DashboardImport />
}
