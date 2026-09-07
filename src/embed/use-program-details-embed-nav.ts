import * as React from "react"
import { useSearchParams } from "react-router"

const TAB_ROW_ATTR = "data-embed-tab-row"
const SIDEBAR_HOST_ATTR = "data-embed-tab-sidebar"
const SUBNAV_ATTR = "data-embed-subnav-hidden"

/** Program Details top tabs shown in fuse-sidebar (same as horizontal tab bar). */
export const PROGRAM_DETAILS_SIDEBAR_ITEMS = [
  { id: "program-program-nav-tab-program-setup-link", label: "Setup" },
  { id: "program-program-nav-tab-standards-link", label: "Standards" },
  { id: "program-program-nav-tab-notification-hub-link", label: "Notification Hub" },
  { id: "program-program-nav-tab-user-management-link", label: "User Roles" },
  { id: "program-program-nav-tab-datafeed-dashboard-link", label: "Data Feed" },
  { id: "program-program-nav-tab-programfeed-dashboard-link", label: "Program 360" },
  { id: "program-program-nav-tab-calendar-view-link", label: "Calendar" },
  { id: "program-program-nav-tab-integrations-link", label: "Integrations" },
] as const

function isSidebarEmbedMode(root: ParentNode = document): boolean {
  if (document.documentElement.getAttribute("data-embed-nav") === "sidebar") return true
  return Boolean(
    root.querySelector('.h2d-screen[data-embed="1"][data-embed-nav="sidebar"]'),
  )
}

function findProgramDetailsLayout(root: ParentNode) {
  return root.querySelector(".page-layout.left-sidebar.page-with-header")
}

function resolveTabLinks(root: ParentNode): HTMLAnchorElement[] {
  return PROGRAM_DETAILS_SIDEBAR_ITEMS.map(item => {
    return (root.querySelector(`#${CSS.escape(item.id)}`) ??
      document.getElementById(item.id)) as HTMLAnchorElement | null
  }).filter((link): link is HTMLAnchorElement => link != null)
}

function syncActiveSidebarItem(host: HTMLElement) {
  host.querySelectorAll<HTMLElement>("[data-embed-tab-id]").forEach(button => {
    const tabId = button.getAttribute("data-embed-tab-id")
    const tab = tabId ? document.getElementById(tabId) : null
    const isActive = tab?.classList.contains("mdc-tab--active") ?? false
    button.classList.toggle("active-list-item", isActive)
    button.setAttribute("aria-current", isActive ? "page" : "false")
    const listItem = button.querySelector("mat-list-item")
    listItem?.classList.toggle("active-list-item", isActive)
  })
}

function buildTabSidebar(host: HTMLElement) {
  if (host.getAttribute("data-built") === "1" && host.querySelector("mat-list")) {
    syncActiveSidebarItem(host)
    return
  }

  host.replaceChildren()
  host.setAttribute("data-built", "1")

  const list = document.createElement("mat-list")
  list.className = "mat-mdc-list mat-mdc-list-base mdc-list"
  list.setAttribute(SIDEBAR_HOST_ATTR, "list")

  for (const item of PROGRAM_DETAILS_SIDEBAR_ITEMS) {
    const button = document.createElement("button")
    button.type = "button"
    button.className =
      "mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base ng-star-inserted w-full"
    button.setAttribute("data-embed-tab-id", item.id)

    const listItem = document.createElement("mat-list-item")
    listItem.className =
      "mat-mdc-list-item mdc-list-item p-16 mat-mdc-list-item-single-line mdc-list-item--with-one-line"

    const content = document.createElement("span")
    content.className = "mdc-list-item__content"

    const text = document.createElement("span")
    text.className =
      "mat-mdc-list-item-unscoped-content mdc-list-item__primary-text word-break-all space-pre-wrap text-left"
    text.textContent = item.label

    content.appendChild(text)
    listItem.appendChild(content)
    button.appendChild(listItem)

    button.addEventListener("click", event => {
      event.preventDefault()
      const tab = document.getElementById(item.id) as HTMLAnchorElement | null
      tab?.click()
      window.setTimeout(() => syncActiveSidebarItem(host), 0)
    })

    list.appendChild(button)
  }

  host.appendChild(list)
  syncActiveSidebarItem(host)
}

function hideSetupSubNav(fuseSidebar: HTMLElement) {
  fuseSidebar.querySelectorAll('mat-list:not([data-embed-tab-sidebar="list"])').forEach(list => {
    list.setAttribute(SUBNAV_ATTR, "1")
    ;(list as HTMLElement).style.setProperty("display", "none", "important")
  })
  fuseSidebar.querySelectorAll(":scope > div").forEach(node => {
    if (node.getAttribute(SIDEBAR_HOST_ATTR) === "host") return
    ;(node as HTMLElement).style.setProperty("display", "none", "important")
  })
}

function ensureTabSidebarHost(fuseSidebar: HTMLElement): HTMLElement {
  let host = fuseSidebar.querySelector(
    `[${SIDEBAR_HOST_ATTR}="host"]`,
  ) as HTMLElement | null

  if (!host) {
    host = document.createElement("div")
    host.setAttribute(SIDEBAR_HOST_ATTR, "host")
    host.style.width = "100%"
    fuseSidebar.insertBefore(host, fuseSidebar.firstChild)
  }

  host.style.setProperty("display", "block", "important")
  return host
}

/** Add Program Details tab items to fuse-sidebar; hide the horizontal tab bar. */
export function applyProgramDetailsEmbedNavSidebar(root: ParentNode = document) {
  if (!isSidebarEmbedMode(root)) return false

  const screen =
    root.querySelector('.h2d-screen[data-embed="1"][data-embed-nav="sidebar"]') ?? root

  const pageLayout = findProgramDetailsLayout(screen)
  if (!pageLayout) return false

  const fuseSidebar = pageLayout.querySelector(
    ":scope > .content fuse-sidebar.sidebar, :scope > .content .sidebar.left-positioned",
  ) as HTMLElement | null
  if (!fuseSidebar) return false

  if (resolveTabLinks(screen).length === 0) return false

  hideSetupSubNav(fuseSidebar)
  const host = ensureTabSidebarHost(fuseSidebar)
  buildTabSidebar(host)

  const tabRow = pageLayout.querySelector(
    ":scope > .mb-16:has(nav.mat-mdc-tab-nav-bar)",
  ) as HTMLElement | null
  if (tabRow) {
    tabRow.setAttribute(TAB_ROW_ATTR, "empty")
    tabRow.style.setProperty("display", "none", "important")
  }

  return true
}

/** Program Details: tab items in fuse-sidebar when embedNav=sidebar. */
export function useProgramDetailsEmbedNav() {
  const [searchParams] = useSearchParams()
  const embedNav = searchParams.get("embedNav") === "sidebar" ? "sidebar" : "tabs"

  React.useLayoutEffect(() => {
    if (embedNav !== "sidebar") return

    const run = () => {
      const applied = applyProgramDetailsEmbedNavSidebar(document)
      if (applied) {
        const host = document.querySelector('[data-embed-tab-sidebar="host"]') as HTMLElement | null
        if (host) syncActiveSidebarItem(host)
      }
    }

    run()
    const intervalId = window.setInterval(run, 250)
    const stopIntervalId = window.setTimeout(() => window.clearInterval(intervalId), 6000)

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type !== "PRISM_EMBED_NAV_APPLY") return
      run()
    }
    window.addEventListener("message", onMessage)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(stopIntervalId)
      window.removeEventListener("message", onMessage)
    }
  }, [embedNav])
}
