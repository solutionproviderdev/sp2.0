import React from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const EarningThisMonth: React.FC = () => {
  const data = [
    {
      date: "May 31, 2024",
      clientName: "Humayra Himu",
      soldAmount: "100,000/-",
      incentivesEarned: "300/-",
      status: "Payment Pending",
      statusIcon: "❌",
      statusColor: "text-red-600",
    },
    {
      date: "May 20, 2024",
      clientName: "Shimu",
      soldAmount: "90,000/-",
      incentivesEarned: "300/-",
      status: "Work Ongoing",
      statusIcon: "⚠️",
      statusColor: "text-yellow-600",
    },
    {
      date: "May 20, 2024",
      clientName: "Rafiul",
      soldAmount: "80,000/-",
      incentivesEarned: "300/-",
      status: "Transferred",
      statusIcon: "✅",
      statusColor: "text-green-600",
    },
  ];

  return (
    <div className="p-4 w-full flex bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex flex-col w-1/3 items-center justify-center rounded-sm border border-gray-200 dark:border-gray-700 p-4">
        <FaMoneyBillTrendUp className="text-5xl text-blue-500 mb-4" />
        <h2 className="text-xl">Earning This Month</h2>
      </div>
      <div className="flex flex-col flex-1 items-center justify-center rounded-sm border border-gray-200 dark:border-gray-700 p-4">
        {/* Table */}
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left">Date</th>
              <th className="px-4 py-2 border text-left">Client Name</th>
              <th className="px-4 py-2 border text-left">Sold Amount</th>
              <th className="px-4 py-2 border text-left">Incentives Earned</th>
              <th className="px-4 py-2 border text-left">
                Availability Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{row.date}</td>
                <td className="px-4 py-2 border">{row.clientName}</td>
                <td className="px-4 py-2 border">{row.soldAmount}</td>
                <td className="px-4 py-2 border">{row.incentivesEarned}</td>
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

export default EarningThisMonth;
