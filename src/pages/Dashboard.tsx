import React, { useState } from 'react';
import PerformanceCard from '../components/dashboard/PerformanceCard';
import { useSelector } from 'react-redux';
import { useGetDepartmentByIdQuery } from '../features/auth/department/departmentAPI';
import WeeklyMeetingCard from '../components/dashboard/WeeklyMeetingCard';
import NotificationCard from '../components/dashboard/NotificationCard';
import EarningsThisMonth from '../components/dashboard/EarningsThisMonth';
import {
	useGetCREPerformanceDataByIdQuery,
	useGetMeetingsDataQuery,
	useGetNotificationsQuery,
} from '../features/dashboard/dashboardAPI';

const Dashboard: React.FC = () => {
	const { user } = useSelector(state => state.auth);
	const [filter, setFilter] = useState({
		timeLength: 'week',
		mode: 'own',
	});

	const { data: notificationsData } = useGetNotificationsQuery();
	// Fetch user data
	const { data: userData } = useGetCREPerformanceDataByIdQuery(user._id);
	const { data: department } = useGetDepartmentByIdQuery(user.departmentId);

	// Fetch meetings data based on filter
	const { data: meetingsData } = useGetMeetingsDataQuery(filter);

	// Get the role name from the department
	const role = department?.roles.find(role => role._id === user.roleId);

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
				<div className=""></div>
			</div>

			<div className="flex justify-center items-center">
				<WeeklyMeetingCard
					filter={filter}
					setFilter={setFilter}
					meetingsData={meetingsData?.meetings}
				/>
				{/* <EarningsThisMonth />
				<NotificationCard notifications={notificationsData?.notifications} /> */}
			</div>
		</div>
	);
};

export default Dashboard;
