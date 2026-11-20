"use client";
import { createContext, type MouseEvent } from "react";
import type { GuestProperties } from "@sharadox/showcase-web-library/guest/type";

/**
 * The classes that give an element the guest site's look on the host site, or null on the guest site itself. What a
 * component draws outside its place in the page (a full-screen viewer, through `Portal`) wears them, so it looks the
 * same there as at home.
 */
export const GuestContext = createContext<string | null>(null);

/** Links lead nowhere in a demo: they would leave for this site's pages, or jump around the host's page. */
function stayPut(event: MouseEvent) {
  if (!(event.target as Element).closest?.("a[href]")) return;
  event.preventDefault();
  event.stopPropagation();
}

/**
 * The wrapper of one site's components shown on another: marked `data-guest` (the host's global rules leave it alone,
 * and pointer-web-library's Cursor steps aside), wearing `className` and `style`, and passing `look` (the classes for
 * the guest's look) to what its components draw elsewhere. It's a demo: its links do nothing when clicked, while
 * everything else (buttons, filters, a viewer, dragging) works.
 *
 * @example
 * <Guest className={look} look={look}><Work locale="en" /></Guest>
 */
export function Guest({ className, style, look, children }: GuestProperties) {
  return (
    <div className={className} style={style} data-guest onClickCapture={stayPut}>
      <GuestContext value={look}>{children}</GuestContext>
    </div>
  );
}
