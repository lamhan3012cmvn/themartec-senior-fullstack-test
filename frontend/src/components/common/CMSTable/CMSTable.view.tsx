import { Button } from "~/components/ui/button";
import { ICMSTable } from "./CMSTable.props";
import { Table, TableProps } from "antd";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import CMSDialog from "../CMSDialog/CMSDialog.view";

const CMSTable = (props: ICMSTable) => {
  let {
    dataTableColumns,
    dataSource,
    limit = 10,
    currentPage = 1,
    total,
    handleChangePage = () => {
      return;
    },
    isLoading,
    noPagination = false,
    // getExcelData,
    config = {},
  } = props;

  // if (!noTooltips)
  //   dataTableColumns = [
  //     ...dataTableColumns,
  //     {
  //       title: "Actions",
  //       fixed: "right",
  //       width: 100,
  //       render: (row: any) => (
  //         <span onClick={(e) => e.stopPropagation()}>
  //           <TableDropdown
  //             row={row}
  //             onShow={onShow}
  //             onEdit={onEdit}
  //             onDelete={onDelete}
  //             moreActions={moreActions}
  //           />
  //         </span>
  //       ),
  //     },
  //   ];

  const onChangeTable: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log({
      pagination,
      filters,
      sorter,
      extra
    })
  };

  if (props.onShow || props.onEdit || props.onDelete) {
    dataTableColumns = [
      ...dataTableColumns,
      {
        title: "Actions",
        className: "text-center",
        fixed: "right",
        width: "30px",
        render: (row: any) => (
          <span className="flex justify-center space-x-2">
            {props.onShow && (
              <Button
                variant={"outline"}
                onClick={() => props.onShow!(row)}
                size={"actionButton"}
              >
                <MdRemoveRedEye size={16} />
              </Button>
            )}

            {props.onEdit && (
              <Button
                variant={"outline"}
                onClick={() => props.onEdit!(row)}
                size={"actionButton"}
              >
                <MdEdit size={16} />
              </Button>
            )}

            {props.onDelete && (
              <CMSDialog
                title="Delete"
                description="Do you want to delete this row?"
                onOk={() => props.onDelete!(row)}
              >
                <Button variant={"outline"} size={"actionButton"}>
                  <FaTrash size={16} />
                </Button>
              </CMSDialog>
            )}
            {/* <TableDropdown
              row={row}
              onShow={onShow}
              onEdit={onEdit}
              onDelete={onDelete}
              moreActions={moreActions}
            /> */}
          </span>
        ),
      },
    ];
  }

  return (
    <div className="w-full">
      <Table
        tableLayout="fixed"
        columns={dataTableColumns}
        rowKey={(item: any) => item?.key ?? item.id ?? item}
        dataSource={dataSource}
        onChange={onChangeTable}
        size="small"
        scroll={{ x: 1500 }}
        pagination={
          !noPagination && {
            //   showSizeChanger,
            current: currentPage || 1,
            position: ["bottomCenter"],
            pageSize: limit,
            onChange: handleChangePage,
            total,
          }
        }
        loading={isLoading}
        className="w-full"
        {...config}
        sticky
      />
    </div>
  );
};

export default CMSTable;
