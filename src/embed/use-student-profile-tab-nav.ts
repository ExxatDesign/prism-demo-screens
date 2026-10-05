import * as React from "react";
import type { SetURLSearchParams } from "react-router";
import { tabFromLinkId } from "@/profile/student-profile-tabs";

/** Capture clicks on student profile header tabs and sync ?tab= in the URL. */
export function useStudentProfileTabNavCapture(
  setSearchParams: SetURLSearchParams,
): React.MouseEventHandler {
  return React.useCallback(
    event => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>(
        'a.mat-mdc-tab-link[id^="profile-studentheader-"]',
      );
      if (!link) return;

      const tab = tabFromLinkId(link.id);
      if (!tab) return;

      event.preventDefault();
      event.stopPropagation();
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          next.set("tab", tab);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );
}
