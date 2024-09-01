import React from "react";
import { FaEnvelope } from "react-icons/fa6";

const UnreadMessages: React.FC = () => {
  const data = [
    {
      slNo: "797",
      name: "Sharmin Aktar",
      lastMessage: "Last message content",
      status: "Unread",
      statusIcon: "📩",
      statusColor: "text-blue-600",
    },
    {
      slNo: "716",
      name: "Nanik Saha",
      lastMessage: "Last message content",
      status: "Unread",
      statusIcon: "📩",
      statusColor: "text-blue-600",
    },
    {
      slNo: "795",
      name: "Mohammad Rabiul Islam",
      lastMessage: "Last message content",
      status: "Unread",
      statusIcon: "📩",
      statusColor: "text-blue-600",
    },
  ];

  return (
    <div className="p-4 w-full flex bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex flex-col w-1/3 items-center justify-center rounded-sm border border-gray-200 dark:border-gray-700 p-4">
        <FaEnvelope className="text-5xl text-blue-500 mb-4" />
        <h2 className="text-xl">Unread Messages</h2>
      </div>
      <div className="flex flex-col flex-1 items-center justify-center rounded-sm border border-gray-200 dark:border-gray-700 p-4">
        {/* Table */}
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left">SL. No.</th>
              <th className="px-4 py-2 border text-left">Name</th>
              <th className="px-4 py-2 border text-left">Last Message</th>
              <th className="px-4 py-2 border text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{row.slNo}</td>
                <td className="px-4 py-2 border">{row.name}</td>
                <td className="px-4 py-2 border">{row.lastMessage}</td>
                <td className="px-4 py-2 border flex items-center">
                  <span className={`mr-2 ${row.statusColor}`}>
                    {row.statusIcon}
                  </span>
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnreadMessages;
