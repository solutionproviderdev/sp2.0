import { useGetUserByIdQuery } from '../../../../../features/auth/authAPI';

const BookedMeetingCard = ({ creId }: { creId: string }) => {
	const { data: userData } = useGetUserByIdQuery(creId || '', {
		skip: !creId,
	});

	const creName = userData?.nickname || userData?.nameAsPerNID;

	return (
		<div
			className={`h-full bg-blue-300 p-2 rounded flex items-center justify-center cursor-grab`}
		>
			<h1 className="font-bold">{`Booked By ${creName}`}</h1>
		</div>
	);
};

export default BookedMeetingCard;
