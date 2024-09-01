import React from "react";

const teams = ["Team A", "Team B", "Team C", "Team D"];
const timeSlots = ["Morning", "Noon", "Evening", "After Noon"];
const randomMeetings = [
  { team: "Team A", time: "Morning", title: "Project Kickoff" },
  { team: "Team B", time: "Noon", title: "Client Call" },
  { team: "Team C", time: "Evening", title: "Team Sync" },
  { team: "Team D", time: "After Noon", title: "Review Meeting" },
  { team: "Team A", time: "Noon", title: "Design Discussion" },
  { team: "Team B", time: "Morning", title: "Planning Meeting" },
  { team: "Team C", time: "After Noon", title: "Sprint Review" },
  { team: "Team D", time: "Evening", title: "Retrospective" },
];

const getMeetingForTeamAndSlot = (team, slot) => {
  const meeting = randomMeetings.find(
    (meeting) => meeting.team === team && meeting.time === slot
  );
  return meeting ? (
    <div className="w-full border border-gray-200 rounded-md h-12 flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-semibold">{meeting.title}</p>
      </div>
    </div>
  ) : (
    <div className="w-full border border-orange-200 rounded-md h-12 flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-semibold text-orange-400">No Meeting</p>
      </div>
    </div>
  );
};

const TodaysMeetings: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl">
          TODAY'S MEETINGS 
        </h2>
        <a href="#" className="text-blue-500 text-sm">
          View all &gt;
        </a>
      </div>
      <div className="grid grid-cols-5 gap-2">
        <div></div> {/* Empty cell for top-left corner */}
        {timeSlots.map((slot, index) => (
          <div key={index} className="text-center font-semibold">
            {slot}
          </div>
        ))}
        {teams.map((team, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="text- font-semibold">{team}</div>
            {timeSlots.map((slot, colIndex) => (
              <div key={colIndex}>{getMeetingForTeamAndSlot(team, slot)}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">
        ADD MEETINGS
      </button>
    </div>
  );
};

export default TodaysMeetings;
