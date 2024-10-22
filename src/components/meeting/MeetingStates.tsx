
import React from 'react';

const states = [
  { title: 'Follow up', count: 4, amount: '৳1,366,390', color: 'bg-blue-400' },
  { title: 'Prospect', count: 1, amount: '৳1,979,750', color: 'bg-orange-300' },
  { title: 'Lost', count: 10, amount: '৳5,230,982', color: 'bg-red-400' },
  { title: 'Sold', count: 3, amount: '৳914,500', color: 'bg-green-400' },
];

function MeetingStates() {
  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      {states.map(({ title, count, amount, color }) => (
        <div key={title} className={`${color} text-white rounded p-2 text-center`}>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-lg">{count}</p>
          <p className="text-sm">{amount}</p>
        </div>
      ))}
    </div>
  );
}

export default MeetingStates;
