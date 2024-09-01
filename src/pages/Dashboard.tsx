import React from "react";
import { FaMoneyBillTrendUp, FaEnvelope } from "react-icons/fa6";
import DataTable from "../components/dashboard/DataTable";
import { FaPhoneAlt } from "react-icons/fa";
import BarChart from "../components/dashboard/BarChart";
import Reminders from "../components/dashboard/Reminders";
import TodaysMeetings from "../components/dashboard/TodaysMeetings";

const Dashboard: React.FC = () => {
  const earningData = [
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

  const unreadMessagesData = [
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

  const haveToCallData = [
    {
      slNo: "797",
      name: "Sharmin Aktar",
      lastMessage: "Call needed",
      status: "Number Collected",
      statusIcon: "📞",
      statusColor: "text-green-600",
    },
    {
      slNo: "716",
      name: "Nanik Saha",
      lastMessage: "Call needed",
      status: "Number Collected",
      statusIcon: "📞",
      statusColor: "text-green-600",
    },
    {
      slNo: "795",
      name: "Mohammad Rabiul Islam",
      lastMessage: "Call needed",
      status: "Number Collected",
      statusIcon: "📞",
      statusColor: "text-green-600",
    },
  ];

  const activityData = [
    { day: "Thu", value: 6 },
    { day: "Fri", value: 60 },
    { day: "Sat", value: 17 },
    { day: "Sun", value: 37 },
    { day: "Mon", value: 78 },
    { day: "Tue", value: 20 },
    { day: "Wed", value: 0 },
  ];

  const meetingData = [
    { day: "Thu", value: 1 },
    { day: "Fri", value: 2 },
    { day: "Sat", value: 3 },
    { day: "Sun", value: 7 },
    { day: "Mon", value: 4 },
    { day: "Tue", value: 6 },
    { day: "Wed", value: 8 },
  ];

  return (
    <div className="max-h-[90dvh] h-full flex gap-4 bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark p-4">
      <div className="w-1/3 h-full overflow-hidden">
        <DataTable
          title="Earning This Month"
          Icon={FaMoneyBillTrendUp}
          data={earningData}
          headers={[
            "Date",
            "Client Name",
            "Sold Amount",
            "Incentives Earned",
            "Availability Status",
          ]}
          keyPrefix="earning"
        />
        <DataTable
          title="Unread Messages"
          Icon={FaEnvelope}
          data={unreadMessagesData}
          headers={["SL. No.", "Name", "Last Message", "Status"]}
          keyPrefix="unread"
        />
        <DataTable
          title="Have to Call (Number Collected)"
          Icon={FaPhoneAlt}
          data={haveToCallData}
          headers={["SL. No.", "Name", "Last Message", "Status"]}
          keyPrefix="call"
        />
      </div>
      <div className="w-1/3 h-full">
        <BarChart data={activityData} title="Average Activity Done" />
        <BarChart data={meetingData} title="Average Meeting Done" />
        <Reminders />
      </div>
      <div className="w-1/3 h-full">
        <TodaysMeetings />
      </div>
    </div>
  );
};

export default Dashboard;
