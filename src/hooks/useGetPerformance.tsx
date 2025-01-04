import { useSelector } from 'react-redux';
import { useGetCREPerformanceDataByIdQuery } from '../features/dashboard/dashboardAPI';

// Define the structure of the barChartData item
interface BarChartDataItem {
	label: string;
	value: number;
}

// Define the structure of the userData object
interface UserData {
	barChartData: BarChartDataItem[];
}

// Define the structure of the auth state
interface AuthState {
	user: {
		_id: string;
		// Add other user properties if needed
	};
}

// Define the return type of the usegetPerformance hook
interface PerformanceResult {
	overallPerformancePercentage: number;
}

// Custom hook to get performance data
const useGetPerformance = (): PerformanceResult => {
	// Use useSelector with TypeScript types to get the authenticated user
	const { user } = useSelector((state: { auth: AuthState }) => state.auth);

	// Use the query hook to fetch CRE performance data
	const { data: userData } = useGetCREPerformanceDataByIdQuery(user._id, {
		skip: !user._id, // Skip the query if user._id is not available
	});

	// Calculate the overall performance percentage
	const overallPerformancePercentage = Math.round(
		userData?.barChartData.find(item => item.label === 'Complete Performance')
			?.value || 0
	);

	// Return the overall performance percentage
	return { overallPerformancePercentage };
};
export default useGetPerformance;
