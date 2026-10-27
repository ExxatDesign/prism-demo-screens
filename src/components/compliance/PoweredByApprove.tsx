import approveWordmarkUrl from "@/assets/exxat-approve-wordmark.png";

/**
 * "Powered by Exxat Approve" — on the Compliance and Review Clarifications tabs,
 * the two places a school sees work that Exxat Approve does for them.
 *
 * A white chip, so the wordmark (dark "Exxat", pink "Approve") reads the same on
 * the active tab's indigo fill as on an inactive tab. Wordmark from exxat.com.
 */
export function PoweredByApprove() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        marginLeft: 8,
        padding: "2px 7px",
        borderRadius: 999,
        background: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        lineHeight: 1,
        textTransform: "none",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 10, fontWeight: 400, color: "rgba(0, 0, 0, 0.6)", WebkitTextFillColor: "rgba(0, 0, 0, 0.6)" }}>
        Powered by
      </span>
      <img src={approveWordmarkUrl} alt="Exxat Approve" style={{ height: 11, width: "auto", display: "block" }} />
    </span>
  );
}
