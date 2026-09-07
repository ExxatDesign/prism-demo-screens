import * as React from "react"
import { useSearchParams } from "react-router"

import {
  PRISM_EMBED_SCOPE_MESSAGE,
  prismEmbedScopeFromSearchParams,
  type PrismEmbedScope,
} from "@/embed/embed-scope-types"

export function useEmbedScope(): PrismEmbedScope {
  const [searchParams] = useSearchParams()
  const [scope, setScope] = React.useState<PrismEmbedScope>(() =>
    prismEmbedScopeFromSearchParams(searchParams),
  )

  React.useEffect(() => {
    setScope(prismEmbedScopeFromSearchParams(searchParams))
  }, [searchParams])

  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type !== PRISM_EMBED_SCOPE_MESSAGE) return
      setScope({
        programName: event.data.programName ?? "",
        schoolName: event.data.schoolName ?? "",
        schoolLogo: event.data.schoolLogo ?? "",
        description: event.data.description ?? "",
        programType: event.data.programType ?? "",
        degreeOffered: event.data.degreeOffered ?? "",
        addressLines: Array.isArray(event.data.addressLines)
          ? event.data.addressLines
          : [],
      })
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return scope
}
