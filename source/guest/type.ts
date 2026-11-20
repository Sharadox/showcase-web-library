import type { CSSProperties, ReactNode } from "react";

export interface GuestProperties {
  /** Classes of the wrapper itself (the guest's look, plus any placement). */
  className?: string;
  style?: CSSProperties;
  /** The classes that give an element the guest's look, for what its components draw elsewhere (`Portal`). */
  look: string;
  children: ReactNode;
}
