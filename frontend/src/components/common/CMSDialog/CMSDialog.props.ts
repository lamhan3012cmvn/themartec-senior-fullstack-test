import { ReactNode } from "react";

export interface ICMSDialog {
  children: ReactNode;
  title?: string;
  description?: string;
  onOk?: () => void;
}
