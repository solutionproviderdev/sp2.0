

import { useState } from "react";
import { DateRangePicker } from "mui-daterange-picker";

const RangeDatePick = ({ onChange }) => {
  const [open, setOpen] = useState(true);
 
  const toggle = () => setOpen(!open);

  return (
    <DateRangePicker
      open={open}
      toggle={toggle}
      onChange={(range) => {
         onChange(range);  
      }}
    />
  );
};

export default RangeDatePick;
