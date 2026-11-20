import type { ReactNode } from "react";

export interface AssetOriginProperties {
  /** Where the site's own files (`/photo/…`, `/brand/…`) are served from, such as "https://luispiresdecor.com". */
  origin: string;
  children?: ReactNode;
}
