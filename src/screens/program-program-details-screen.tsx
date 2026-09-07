import ProgramProgramDetails from "@/imports/StepsExxatComAdminProgramProgramdetails1440WDefault"
import { useEmbedScope } from "@/embed/use-embed-scope"
import { useProgramDetailsEmbedNav } from "@/embed/use-program-details-embed-nav"
import { useProgramDetailsScopePatch } from "@/embed/use-program-details-scope-patch"

export default function ProgramProgramDetailsScreen() {
  const scope = useEmbedScope()
  useProgramDetailsScopePatch(scope)
  useProgramDetailsEmbedNav()

  return <ProgramProgramDetails />
}
