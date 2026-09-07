/** Mirrors Exxat Home `lib/prism-embed-scope.ts` for iframe scope sync. */
export type PrismEmbedScope = {
  programName: string
  schoolName: string
  schoolLogo: string
  description: string
  programType: string
  degreeOffered: string
  addressLines: string[]
}

export const PRISM_EMBED_SCOPE_MESSAGE = "exxat-embed-scope" as const

function decodeAddressLines(raw: string | null): string[] {
  if (!raw) return []
  return raw.split("|").filter(Boolean)
}

export function prismEmbedScopeFromSearchParams(
  params: URLSearchParams,
): PrismEmbedScope {
  return {
    programName: params.get("programName") ?? "",
    schoolName: params.get("schoolName") ?? "",
    schoolLogo: params.get("schoolLogo") ?? "",
    description: params.get("description") ?? "",
    programType: params.get("programType") ?? "",
    degreeOffered: params.get("degreeOffered") ?? "",
    addressLines: decodeAddressLines(params.get("addressLines")),
  }
}

export function emptyEmbedScope(): PrismEmbedScope {
  return {
    programName: "",
    schoolName: "",
    schoolLogo: "",
    description: "",
    programType: "",
    degreeOffered: "",
    addressLines: [],
  }
}
