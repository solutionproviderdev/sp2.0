import React from "react";
import { IconType } from "react-icons";

interface DataRow {
  slNo?: string;
  date?: string;
  clientName?: string;
  name?: string;
  lastMessage?: string;
  soldAmount?: string;
  incentivesEarned?: string;
  status: string;
  statusIcon: string;
  statusColor: string;
}

interface DataTableProps {
  title: string;
  Icon: IconType;
  data: DataRow[];
  headers: string[];
  keyPrefix: string;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  Icon,
  data,
  headers,
  keyPrefix,
}) => {
  return (
    <div className="w-full flex bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex flex-col w-1/3 items-center justify-center rounded-sm border border-gray-200 dark:border-gray-700 p-4">
        <Icon className="text-xl text-center text-blue-500 mb-4" />
        <h2 className="text-sm text-center">{title}</h2>
      </div>
      <div className="flex flex-col flex-1 items-center justify-center rounded-sm border border-gray-200 dark:border-gray-700 p-4 overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={`${keyPrefix}-header-${index}`}
                  className="px-2 py-1 border text-[10px] text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`${keyPrefix}-row-${index}`}>
                {Object.keys(row).map((key, i) => {
                  if (key !== "statusIcon" && key !== "statusColor") {
                    return (
                      <td
                        key={`${keyPrefix}-cell-${index}-${i}`}
                        className=" text-[10px] border"
                      >
                        {key !== "statusIcon" &&
                          key !== "statusColor" &&
                          key !== "status" &&
                          row[key as keyof DataRow]}
                        {key === "status" && (
                          <div className="flex items-center">
                            <span className={`mr-2  ${row.statusColor}`}>
                              {row.statusIcon}
                            </span>
                            {row.status}
                          </div>
                        )}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
