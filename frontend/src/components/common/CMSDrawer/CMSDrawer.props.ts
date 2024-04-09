import { DrawerProps } from "antd";

export interface ICMSDrawer {
  children: React.ReactNode;
  onClose: () => void;
  zIndex?: number;
  visible: boolean;
  title?: string;
  width?: number | string;
  placement?: "left" | "right";
  size?: "large" | "default";
  expandDefault?: boolean;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  config?: Partial<DrawerProps>;
}
