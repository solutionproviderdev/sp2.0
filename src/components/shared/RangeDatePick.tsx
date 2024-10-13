

import { useState } from "react";
import { DateRangePicker } from "mui-daterange-picker";
import { Box } from "@mui/material";

const RangeDatePick = ({ arise, onChange }) => {
  const [open, setOpen] = useState(true);

  const toggle = () => setOpen(!open);

  return (

    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 4,
        borderRadius: 2,
      }}
    >
      <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={(range) => {
          onChange(range);
        }}
      />
    </Box>

  );
};

export default RangeDatePick;
