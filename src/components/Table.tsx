import React from "react";
import { Table as AntTable, type TableColumnsType } from "antd";
import { cn } from "../lib/utils";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

interface RowRecord {
  key: React.Key;
  onClick?: () => void;
  className?: string;
  cells: CellRecord[];
}

interface CellRecord {
  content: React.ReactNode;
  className?: string;
  colSpan?: number;
}

export default function Table({ headers, children, className }: TableProps) {
  const rows = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((row, rowIndex) => {
      const rowElement = row as React.ReactElement<TableRowProps>;
      const cells = React.Children.toArray(rowElement.props.children)
        .filter(React.isValidElement)
        .map(cell => {
          const cellElement = cell as React.ReactElement<TableCellProps>;
          return {
            content: cellElement.props.children,
            className: cellElement.props.className,
            colSpan: cellElement.props.colSpan,
          };
        });

      return {
        key: rowElement.key ?? rowIndex,
        onClick: rowElement.props.onClick,
        className: rowElement.props.className,
        cells,
      };
    });

  const columns: TableColumnsType<RowRecord> = headers.map((header, index) => ({
    title: header,
    key: `column-${index}`,
    dataIndex: `column-${index}`,
    render: (_value, record) => record.cells[index]?.content ?? null,
    onCell: record => {
      const cell = record.cells[index];
      const firstCellSpan = record.cells[0]?.colSpan;
      return {
        className: cn("whitespace-nowrap", cell?.className),
        colSpan: cell?.colSpan ?? (firstCellSpan && index > 0 ? 0 : undefined),
      };
    },
  }));

  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-white shadow-xs", className)}>
      <AntTable<RowRecord>
        columns={columns}
        dataSource={rows}
        pagination={false}
        scroll={{ x: "calc(100vw - 200px)" }}
        rowClassName={(record, index) => cn(record.onClick && "cursor-pointer", record.className, index % 2 === 0 ? "bg-white" : "bg-gray-50")}
        onRow={record => ({
          onClick: record.onClick,
        })}
        className="qa-ant-table"
      />
    </div>
  );
}

interface TableRowProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  key?: string | number;
}

export const TableRow: React.FC<TableRowProps> = ({ children }) => <>{children}</>;

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}

export const TableCell: React.FC<TableCellProps> = ({ children }) => <>{children}</>;
