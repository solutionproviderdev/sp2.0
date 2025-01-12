import React, { useState } from 'react';
import PerformanceCard from '../components/dashboard/PerformanceCard';
import { useSelector } from 'react-redux';
import WeeklyMeetingCard from '../components/dashboard/WeeklyMeetingCard';
import NotificationCard from '../components/dashboard/NotificationCard';
import EarningsThisMonth from '../components/dashboard/EarningsThisMonth';
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

	console.log(allCREsData);
	// [
	// 	{
	// 		id: '67155bd66e4cfe7268430022',
	// 		name: 'Joynob Islam',
	// 		role: {
	// 			roleName: 'CRE',
	// 			departmentName: 'CRE',
	// 		},
	// 		profilePictureUrl: 'http://localhost:5000/images/image_1729451457799.jpg',
	// 		performanceMetrics: {
	// 			assigned: 3463,
	// 			numberCollected: 778,
	// 			meetingsSet: 2,
	// 			meetingsCompleted: 0,
	// 			totalSales: 0,
	// 			target: 150,
	// 		},
	// 		barChartData: [
	// 			{
	// 				label: 'Lead Assign Rate',
	// 				value: 50.30505520046484,
	// 			},
	// 			{
	// 				label: 'Number Collection Rate',
	// 				value: 22.466069881605545,
	// 			},
	// 			{
	// 				label: 'Meeting Set Rate',
	// 				value: 0.2570694087403599,
	// 			},
	// 			{
	// 				label: 'Meeting Complete Rate',
	// 				value: 0,
	// 			},
	// 			{
	// 				label: 'Target Achieved',
	// 				value: 0,
	// 			},
	// 			{
	// 				label: 'Complete Performance',
	// 				value: 14.60563889816215,
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: '67797ca8c568a7b328dd4c88',
	// 		name: 'Ritu Islam',
	// 		role: {
	// 			roleName: 'CRE',
	// 			departmentName: 'CRE',
	// 		},
	// 		profilePictureUrl: 'http://localhost:5000/images/image_1736014913843.png',
	// 		performanceMetrics: {
	// 			assigned: 3421,
	// 			numberCollected: 779,
	// 			meetingsSet: 4,
	// 			meetingsCompleted: 0,
	// 			totalSales: 0,
	// 			target: 150,
	// 		},
	// 		barChartData: [
	// 			{
	// 				label: 'Lead Assign Rate',
	// 				value: 49.69494479953516,
	// 			},
	// 			{
	// 				label: 'Number Collection Rate',
	// 				value: 22.771119555685473,
	// 			},
	// 			{
	// 				label: 'Meeting Set Rate',
	// 				value: 0.5134788189987163,
	// 			},
	// 			{
	// 				label: 'Meeting Complete Rate',
	// 				value: 0,
	// 			},
	// 			{
	// 				label: 'Target Achieved',
	// 				value: 0,
	// 			},
	// 			{
	// 				label: 'Complete Performance',
	// 				value: 14.59590863484387,
	// 			},
	// 		],
	// 	},
	// ];

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
				<WeeklyMeetingCard
					filter={filter}
					setFilter={setFilter}
					meetingsData={meetingsData?.meetings}
				/>
				{/* <EarningsThisMonth /> */}
				<NotificationCard notifications={notificationsData?.notifications} />
			</div>
		</div>
	);
};

export default Dashboard;
