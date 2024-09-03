import { Button } from '@mui/material';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdNotificationImportant } from 'react-icons/md';

const ActionButtons = () => {
  return (
<div className="flex justify-center gap-2">
							<Button
								variant="text" // Use variant="text" to remove default background
								size="small"
								startIcon={<FaPhoneAlt />}
								className="!bg-orange-400 hover:!bg-orange-500 !text-white h-7 text-xs !px-3 py-0 whitespace-nowrap"
							>
								Have to Call
							</Button>
							<Button
								variant="text"
								size="small"
								startIcon={<MdNotificationImportant />}
								className="!bg-red-400 hover:!bg-red-500 !text-white h-7 text-xs !px-2 py-0"
							>
								Important
							</Button>
							<Button
								variant="text"
								size="small"
								className="!bg-purple-400 hover:!bg-purple-500 !text-white h-7 text-xs "
							>
								New
							</Button>
						</div>  )
}

export default ActionButtons