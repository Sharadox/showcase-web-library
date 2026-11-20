"use client";
import { createContext, useContext } from "react";
import type { AssetOriginProperties } from "@sharadox/showcase-web-library/asset-origin/type";

const ORIGIN = createContext("");

/**
 * Serves the site's own files from another address, for its components shown on another site (a showcase): photos
 * and logos inside keep their paths, and load from `origin`. On the site itself there's nothing to wrap.
 *
 * @example
 * <AssetOrigin origin="https://luispiresdecor.com"><Work locale="en" /></AssetOrigin>
 */
export function AssetOrigin({ origin, children }: AssetOriginProperties) {
  return <ORIGIN.Provider value={origin}>{children}</ORIGIN.Provider>;
}

/** A site file's address: unchanged on the site, or on the origin an `AssetOrigin` around it names. */
export function useAsset(path: string) {
  return `${useContext(ORIGIN)}${path}`;
}

/** The same, for several files at once (a list of logos). */
export function useAssets() {
  const origin = useContext(ORIGIN);
  return (path: string) => `${origin}${path}`;
}
