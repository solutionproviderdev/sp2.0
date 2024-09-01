import React from "react";

const BarChart = ({ data, title }: { data: any[]; title: string }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4">
      <h2 className="text-xl text-center mb-2">{title}</h2>
      <div className="flex justify-between items-end h-40">
        {data.map((item, index) => {
          const barValue = (item.value / maxValue) * 100;
          const barHeight = barValue === 0 ? 10 : barValue;

          return (
            <div
              key={index}
              className="flex flex-col h-full items-center justify-end"
            >
              <div
                className={`w-8 ${
                  barValue <= 0 ? "bg-red-500" : "bg-blue-500 dark:bg-blue-400"
                }`}
                style={{ height: barHeight + "%" }}
              >
                <span
                  className={`block text-center text-xs text-white`}
                >
                  {item.value}
                </span>
              </div>
              <span className="mt-2 text-xs">{item.day}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default BarChart;
