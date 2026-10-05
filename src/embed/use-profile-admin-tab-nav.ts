import * as React from "react";
import { useNavigate } from "react-router";
import {
  PROFILE_ADMIN_TAB_ROUTES,
  profileAdminTabFromLabel,
} from "@/profile/profile-admin-tabs";

/** Setup / Students / Reports tabs on Compliance Student list screens. */
export function useProfileAdminTabNavCapture(): React.MouseEventHandler {
  const navigate = useNavigate();

  return React.useCallback(
    (event: React.MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>(
        "profile-admin a.mat-mdc-tab-link, .profile-admin-screen a.mat-mdc-tab-link",
      );
      if (!link) return;

      const tab = profileAdminTabFromLabel(link.textContent ?? "");
      if (!tab || tab === "reports") return;

      const path = PROFILE_ADMIN_TAB_ROUTES[tab];
      if (!path || window.location.pathname === path) return;

      event.preventDefault();
      event.stopPropagation();
      navigate(path);
    },
    [navigate],
  );
}
