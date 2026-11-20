"use client";
import { use, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { GuestContext } from "@sharadox/showcase-web-library/guest";
import type { PortalProperties } from "@sharadox/showcase-web-library/portal/type";

/** Nothing to subscribe to: the answer below only differs between the server and the browser. */
const subscribe = () => () => {};

/**
 * Draws its children at the end of the page's body, above everything, in the browser only (nothing on the server).
 * Shown on another site (inside a Showcase), they are wrapped in the site's own look and marked `data-guest`, so they
 * look as they do here and the host's global rules leave them alone.
 *
 * @example
 * <Portal><div className={styles.viewer}>…</div></Portal>
 */
export function Portal({ children }: PortalProperties) {
  const guest = use(GuestContext);
  const browser = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  if (!browser) return null;
  return createPortal(
    guest ? (
      <div className={guest} data-guest style={{ display: "contents" }}>
        {children}
      </div>
    ) : (
      children
    ),
    document.body,
  );
}
