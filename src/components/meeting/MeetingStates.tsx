import React from 'react'

function MeetingStates() {
  return (
    <div>
         <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-400 text-white rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Follow up</h3>
          <p className="text-2xl">4</p>
          <p className="text-lg">৳1,366,390</p>
        </div>
        <div className="bg-orange-300 text-white rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Prospect</h3>
          <p className="text-2xl">1</p>
          <p className="text-lg">৳1,979,750</p>
        </div>
        <div className="bg-red-400 text-white rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Lost</h3>
          <p className="text-2xl">10</p>
          <p className="text-lg">৳5,230,982</p>
        </div>
        <div className="bg-green-400 text-white rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Sold</h3>
          <p className="text-2xl">3</p>
          <p className="text-lg">৳914,500</p>
        </div>
      </div>
    </div>
  )
}

export default MeetingStates