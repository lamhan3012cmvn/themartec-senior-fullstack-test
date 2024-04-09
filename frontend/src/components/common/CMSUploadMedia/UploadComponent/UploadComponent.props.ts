import { RcFile } from "antd/es/upload";

export interface IUploadComponent {
  accept?: "image" | "document";
  multiple?: boolean;
  onChangeFile?: (files: RcFile | RcFile[]) => void;
  onRemoveFile?: () => void;
}
