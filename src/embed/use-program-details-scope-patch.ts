import * as React from "react"

import type { PrismEmbedScope } from "@/embed/embed-scope-types"

const MAX_CAMPUSES = 3

const CAMPUSES_BY_SCHOOL: Record<string, readonly string[]> = {
  "Johns Hopkins University": ["East Baltimore", "Homewood", "Washington DC"],
  "Mayo Clinic Alix School of Medicine": ["Rochester", "Jacksonville", "Phoenix"],
}

const DEFAULT_CAMPUSES = ["Main Campus", "North Campus", "South Campus"]

function campusesForSchool(schoolName: string): string[] {
  return [...(CAMPUSES_BY_SCHOOL[schoolName] ?? DEFAULT_CAMPUSES)].slice(0, MAX_CAMPUSES)
}

function setTextContent(el: Element | null | undefined, value: string) {
  if (!el || !value) return
  const span = el.querySelector("span") ?? el
  span.textContent = value
}

function patchInfoField(root: ParentNode, title: string, value: string) {
  if (!value) return

  for (const titleEl of root.querySelectorAll(".exxat-info .title span")) {
    if (titleEl.textContent?.trim() !== title) continue
    const info = titleEl.closest(".exxat-info")
    if (!info) continue

    if (title === "Program Name") {
      setTextContent(info.querySelector("#programName"), value)
      return
    }

    if (title === "Description") {
      const description = info.querySelector("#description_id")
      if (description) {
        description.replaceChildren()
        const span = document.createElement("span")
        span.textContent = value
        description.appendChild(span)
      }
      return
    }

    const description = info.querySelector(".description")
    setTextContent(description, value.trim())
    return
  }
}

function patchAddress(root: ParentNode, lines: string[]) {
  if (lines.length === 0) return

  for (const titleEl of root.querySelectorAll(".exxat-info .title span")) {
    if (titleEl.textContent?.trim() !== "Address") continue
    const info = titleEl.closest(".exxat-info")
    const description = info?.querySelector(".description")
    if (!description) return

    description.replaceChildren()
    for (const line of lines) {
      const row = document.createElement("div")
      const span = document.createElement("span")
      span.textContent = line
      row.appendChild(span)
      description.appendChild(row)
    }
    return
  }
}

function patchProgramDetailsScope(scope: PrismEmbedScope) {
  const root = document.querySelector("program-details")
  if (!root) return

  if (scope.programName) {
    const heading = root.querySelector("h2.primary-heading")
    const label = heading?.querySelector("span span") ?? heading?.querySelector("span")
    if (label) label.textContent = scope.programName
  }

  const avatar = root.querySelector("img.avatar.avatar-lg") as HTMLImageElement | null
  if (avatar) {
    if (scope.schoolLogo) {
      avatar.src = scope.schoolLogo
      avatar.alt = scope.schoolName || scope.programName || "School logo"
    }
    avatar.style.objectFit = "contain"
    avatar.style.backgroundColor = "#ffffff"
    avatar.style.borderRadius = "4px"
    avatar.style.border = "1px solid rgba(0, 0, 0, 0.12)"
  }

  patchInfoField(root, "Program Name", scope.programName)
  patchInfoField(root, "Description", scope.description)
  patchInfoField(root, "Type", scope.programType)
  patchInfoField(root, "Degree offered", scope.degreeOffered)
  patchAddress(root, scope.addressLines)
}

function patchProgramCampuses(schoolName: string) {
  const campusRoot = document.querySelector("program-campus")
  if (!campusRoot) return

  const list = campusRoot.querySelector("ul")
  if (!list) return

  const names = campusesForSchool(schoolName)
  const items = [...list.querySelectorAll(":scope > li")]

  items.forEach((item, index) => {
    if (index >= names.length) {
      item.remove()
      return
    }

    const title = item.querySelector(".text-overflow-1.font-weight-600")
    if (title) {
      title.replaceChildren()
      const span = document.createElement("span")
      span.textContent = names[index]
      title.appendChild(span)
    }

    const cardBody = item.querySelector(".campus-card-height > div > div:nth-child(2)")
    cardBody?.replaceChildren()
  })
}

function patchProgramSetupScope(scope: PrismEmbedScope) {
  patchProgramDetailsScope(scope)
  if (scope.schoolName) patchProgramCampuses(scope.schoolName)
}

/** Keep program header and Details card in sync with Exxat scope. */
export function useProgramDetailsScopePatch(scope: PrismEmbedScope) {
  React.useEffect(() => {
    patchProgramSetupScope(scope)

    const root =
      document.querySelector("program-setup") ??
      document.querySelector("program-details") ??
      document.querySelector("program-campus")
    if (!root) return

    const observer = new MutationObserver(() => patchProgramSetupScope(scope))
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [
    scope.programName,
    scope.schoolName,
    scope.schoolLogo,
    scope.description,
    scope.programType,
    scope.degreeOffered,
    scope.addressLines.join("|"),
  ])
}
