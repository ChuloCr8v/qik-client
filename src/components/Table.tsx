import { Empty, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Key, ReactNode, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAutoTableScrollY } from "../hooks/useAutoTableScrollY";
import { useIsMobile } from "../hooks/useIsMobile";

type Props<T> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  className?: string;
  loading?: boolean;
  onRow?: (record: T) => void;
  isRowSelection?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  showHeader?: boolean;
  scrollX?: number | string;
  scrollY?: number;
  autoScrollY?: boolean;
  bottomOffset?: number;
  minScrollY?: number;
  pagination?: false | TablePaginationConfig;
  footer?: (currentPageData: T[]) => ReactNode;
  header?: ReactNode;
  showSerialNumber?: boolean;
  noScroll?: boolean;
  bordered?: boolean;
};

const TableComponent = <T extends { id: Key }>({
  columns,
  dataSource,
  className,
  loading,
  pagination,
  onRow,
  header,
  isRowSelection = false,
  onSelectionChange,
  showHeader = true,
  scrollX,
  scrollY,
  showSerialNumber = true,
  autoScrollY = true,
  bottomOffset = 24,
  minScrollY = 240,
  footer,
  noScroll = false,
  bordered = false,
}: Props<T>) => {
  const isMobile = useIsMobile();
  const data = dataSource?.map((item: T) => ({ ...item, key: item.id }));

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const calculatedScrollY = useAutoTableScrollY(tableWrapperRef, {
    enabled: autoScrollY,
    bottomOffset,
    minScrollY,
    deps: [dataSource?.length, loading, pagination, header],
  });

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedRows =
      data?.filter(item => newSelectedRowKeys.includes(item.key)) || [];

    onSelectionChange?.(selectedRows);
  };

  const rowSelection = isRowSelection
    ? {
      selectedRowKeys,
      onChange: onSelectChange,
    }
    : undefined;

  const tableScrollY = autoScrollY ? calculatedScrollY : scrollY;

  const finalPagination =
    pagination === false
      ? false
      : {
        current: currentPage,
        pageSize,
        total: dataSource?.length,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        onChange: (page: number, size: number) => {
          setCurrentPage(page);
          setPageSize(size);
        },
        showTotal: (total: number, range: number[]) =>
          `${range[0]}-${range[1]} of ${total} items`,
        ...pagination,
      };

  const finalColumns: ColumnsType<T> = [
    ...(showSerialNumber && !isMobile
      ? [
        {
          title: "S/N",
          width: 50,
          align: "center" as const,
          render: (_: unknown, __: T, index: number) => (
            <span className="font-semibold">
              {(currentPage - 1) * pageSize + index + 1}
            </span>
          ),
        },
      ]
      : []),
    ...columns,
  ];

  return (
    <>
      {header}
      <div ref={tableWrapperRef}>
        <Table
          pagination={finalPagination}
          loading={loading}
          footer={footer ? () => footer(data ?? []) : undefined}
          columns={finalColumns.map(column => {
            const isAction =
              typeof column.title === "string" &&
              column.title.toLowerCase().includes("action");
            return isAction ? { ...column, fixed: "right" as const } : column;
          })}
          dataSource={data}
          bordered={bordered}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No record here"
              />
            ),
          }}
          onRow={record => ({
            onClick: () => onRow?.(record),
          })}
          showHeader={showHeader}
          scroll={
            !noScroll
              ? { x: scrollX ?? "max-content", y: tableScrollY }
              : undefined
          }
          size="small"
          className={twMerge(
            className,
            " w-full",
            bordered && "border-none",
          )}
          rowSelection={rowSelection}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "bg-transparent" : "bg-gray-50/50"
          }
        />
      </div>
    </>
  );
};

export default TableComponent;
