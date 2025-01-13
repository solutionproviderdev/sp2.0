import React, { useState } from 'react';
import PerformanceCard from '../components/dashboard/PerformanceCard';
import { useSelector } from 'react-redux';
import WeeklyMeetingCard from '../components/dashboard/WeeklyMeetingCard';
import NotificationCard from '../components/dashboard/NotificationCard';
import DateWiseLeadDataCard from '../components/dashboard/DateWiseLeadDataCard';
import {
	useGetAllCREsPerformanceDataQuery,
	useGetCREPerformanceDataByIdQuery,
	useGetMeetingsDataQuery,
	useGetNotificationsQuery,
} from '../features/dashboard/dashboardAPI';
import AllCREPerformanceCard from '../components/dashboard/AllCREPerformanceCard';

const Dashboard: React.FC = () => {
	const { user } = useSelector(state => state.auth);
	const [filter, setFilter] = useState({
		timeLength: 'month',
		mode: 'team',
	});

	const { data: notificationsData } = useGetNotificationsQuery();

	// Fetch user data
	const { data: userData } = useGetCREPerformanceDataByIdQuery(user._id);

	const { data: allCREsData } = useGetAllCREsPerformanceDataQuery();

	// Fetch meetings data based on filter
	const { data: meetingsData } = useGetMeetingsDataQuery(filter);

	return (
		<div className="max-h-[90dvh] h-full gap-4 bg-background-light dark:bg-background-dark text-textPrimary-light dark:text-textPrimary-dark p-4">
			<div className="flex items-start justify-normal">
				{userData && (
					<PerformanceCard
						userData={{
							...userData,
							profilePictureUrl: userData.profilePictureUrl || undefined,
						}}
					/>
				)}
				{user.type === 'Admin' && allCREsData && (
					<AllCREPerformanceCard allCREsData={allCREsData} />
				)}
			</div>

			<div className="flex justify-center items-center">
				{user.type === 'Admin' ? (
					<DateWiseLeadDataCard />
				) : (
					<WeeklyMeetingCard
						filter={filter}
						setFilter={setFilter}
						meetingsData={meetingsData?.meetings}
					/>
				)}

				{user.type !== 'Admin' && (
					<NotificationCard notifications={notificationsData?.notifications} />
				)}
			</div>

			<div className="flex mt-4"></div>
		</div>
	);
};

export default Dashboard;
