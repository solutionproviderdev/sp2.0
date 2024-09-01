import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

interface Reminder {
  time: string;
  description: string;
  icon: React.ReactNode;
  priority: "HIGH" | "LOW";
}

const reminders: Reminder[] = [
  {
    time: "10:30 AM",
    description: "Call Mr. Azhar for Meeting Confirmation",
    icon: <FaPhoneAlt />,
    priority: "HIGH",
  },
  {
    time: "10:30 AM",
    description: "Call Mr. Monjur for Meeting Confirmation",
    icon: <FaPhoneAlt />,
    priority: "HIGH",
  },
  {
    time: "10:30 AM",
    description: "MSG to Mr. ARIF for Setting Meeting",
    icon: <FaEnvelope />,
    priority: "LOW",
  },
];

const Reminders: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl">REMINDERS</h2>
        <a href="#" className="text-blue-500">Manage</a>
      </div>
      <div className="bg-gray-200 rounded-lg">
        {reminders.map((reminder, index) => (
          <div
            key={index}
            className="flex items-center p-4 border-b last:border-0 bg-blue-100 dark:bg-blue-900"
          >
            <div className="flex flex-col items-center justify-center mr-4">
              <span className="text-lg font-bold">{reminder.time}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm">{reminder.description}</p>
            </div>
            <div className="flex items-center">
              {reminder.icon}
              <span
                className={`ml-2 text-sm ${
                  reminder.priority === "HIGH" ? "text-red-500" : "text-blue-500"
                }`}
              >
                {reminder.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
        ADD REMINDER
      </button>
    </div>
  );
};

export default Reminders;
