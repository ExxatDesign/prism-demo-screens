import * as React from "react";
import { useNavigate } from "react-router";

const ROUTES = {
  "SetUpmanage-licenses": "/profile/setup/manage-licenses",
  "SetUpinvite-student": "/profile/setup",
} as const;

/** Setup sidebar: Manage Licenses ↔ Invite Student. */
export function useProfileSetupSidebarNavCapture(): React.MouseEventHandler {
  const navigate = useNavigate();

  return React.useCallback(
    (event: React.MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const button =
        target.closest<HTMLButtonElement>("button[id^='SetUp']") ??
        target
          .closest("mat-list-item")
          ?.closest<HTMLButtonElement>("button[id^='SetUp']");
      if (!button?.id || !(button.id in ROUTES)) return;

      const path = ROUTES[button.id as keyof typeof ROUTES];
      if (window.location.pathname === path) return;

      event.preventDefault();
      event.stopPropagation();
      navigate(path);
    },
    [navigate],
  );
}
