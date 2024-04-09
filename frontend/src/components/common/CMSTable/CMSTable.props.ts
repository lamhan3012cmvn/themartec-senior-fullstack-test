import { TableProps } from "antd";
import React from "react";

export interface ICMSTable {
  dataTableColumns: Array<any>;
  dataSource: Array<any>;
  onChangeTable?: TableProps<any>["onChange"] | undefined;

  entity?: string;
  limit?: number;
  total?: number;
  currentPage?: number;
  handleChangePage?: (page: number, pageSize: number) => void;
  isLoading?: boolean;
  noPagination?: boolean;
  noTooltips?: boolean;
  config?: Partial<TableProps<any>>;
  onShow?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  moreActions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: (row: any) => void;
  }>;
}
