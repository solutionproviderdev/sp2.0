
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


const FollowUp = () => {
    const [age1, setAge1] = useState('');
    const [status, setStatus] = useState('');
    const [leadType, setLeadType] = useState('');
    const [source, setSource] = useState('');
    const [priority, setPriority] = useState('');
    const [assignedTo, setAssignedTo] = useState('');


    return (
        <div className="grid grid-cols-2 max-h-full overflow-y-auto h-[92]">
            <div className="border-2 border-gray-300 rounded-lg p-6 w-full h-auto shadow-lg">
                <h1 className='text-3xl font-bold mb-6 text-center text-blue-700'>Filter Options</h1>
                <div className='grid grid-cols-2 gap-6'>
                    {/* Left Column Inputs */}
                    <div className='flex flex-col gap-6'>
                        <FormControl className='w-full'>
                            <InputLabel id="age-select-1-label">Age Range</InputLabel>
                            <Select
                                labelId="age-select-1-label"
                                id="age-select-1"
                                value={age1}
                                label="Age"
                                onChange={(e) => setAge1(e.target.value)}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className='w-full'>
                            <InputLabel id="status-select-label">Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="new">New</MenuItem>
                                <MenuItem value="follow-up">Follow Up</MenuItem>
                                <MenuItem value="closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className='w-full'>
                            <InputLabel id="lead-type-label">Lead Type</InputLabel>
                            <Select
                                labelId="lead-type-label"
                                id="lead-type"
                                value={leadType}
                                label="Lead Type"
                                onChange={(e) => setLeadType(e.target.value)}
                            >
                                <MenuItem value="hot">Hot</MenuItem>
                                <MenuItem value="cold">Cold</MenuItem>
                                <MenuItem value="warm">Warm</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {/* Right Column Inputs */}
                    <div className='flex flex-col gap-6'>
                        <FormControl className='w-full'>
                            <InputLabel id="source-select-label">Source</InputLabel>
                            <Select
                                labelId="source-select-label"
                                id="source-select"
                                value={source}
                                label="Source"
                                onChange={(e) => setSource(e.target.value)}
                            >
                                <MenuItem value="facebook">Facebook</MenuItem>
                                <MenuItem value="linkedin">LinkedIn</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className='w-full'>
                            <InputLabel id="priority-select-label">Priority</InputLabel>
                            <Select
                                labelId="priority-select-label"
                                id="priority-select"
                                value={priority}
                                label="Priority"
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <MenuItem value="high">High</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className='w-full'>
                            <InputLabel id="assigned-to-select-label">Assigned To</InputLabel>
                            <Select
                                labelId="assigned-to-select-label"
                                id="assigned-to-select"
                                value={assignedTo}
                                label="Assigned To"
                                onChange={(e) => setAssignedTo(e.target.value)}
                            >
                                <MenuItem value="john">John Doe</MenuItem>
                                <MenuItem value="jane">Jane Smith</MenuItem>
                                <MenuItem value="mark">Mark Taylor</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>



            <div className="border-2 border-red-600 w-full h-96">
            <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
            </div>

            <div className="border-2 border-red-600 w-full h-96">part 3</div>
            <div className="border-2 border-red-600 w-full h-96">part 4</div>
        </div>
    );
};

export default FollowUp;