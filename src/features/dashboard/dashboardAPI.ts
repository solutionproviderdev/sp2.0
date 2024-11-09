import apiSlice from '../api/apiSlice';

// Define the interfaces for the response
interface MeetingData {
	day: string;
	value: number;
}

interface MeetingsResponse {
	timePeriod: string;
	mode: string;
	meetings: MeetingData[];
}

interface CREPerformanceData {
	id: string;
	name: string;
	role: {
		roleName: string;
		departmentName: string;
	};
	profilePictureUrl: string | null;
	performanceMetrics: {
		assigned: number;
		numberCollected: number;
		meetingsSet: number;
		meetingsCompleted: number;
		totalSales: number;
		target: number;
		performancePercentage: number;
	};
}

interface Notification {
	label: string;
	count: number;
}

interface NotificationsResponse {
	notifications: Notification[];
}

// Extend the apiSlice with dashboard endpoints
const dashboardApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// Endpoint to get all CREs' performance data
		getAllCREsPerformanceData: builder.query<CREPerformanceData[], void>({
			query: () => ({
				url: '/dashboard/cre-performance',
				method: 'GET',
			}),
		}),

		// Endpoint to get performance data of a specific CRE by ID
		getCREPerformanceDataById: builder.query<CREPerformanceData, string>({
			query: creId => ({
				url: `/dashboard/cre-performance/${creId}`,
				method: 'GET',
			}),
		}),

		// Endpoint to get weekly/monthly meetings data
		getMeetingsData: builder.query<
			MeetingsResponse,
			{ timeLength: string; mode: string }
		>({
			query: ({ timeLength, mode }) => ({
				url: `/dashboard/meetings`,
				method: 'GET',
				params: { timeLength, mode },
			}),
		}),
		getNotifications: builder.query<NotificationsResponse, void>({
			query: () => ({
				url: '/dashboard/notifications',
				method: 'GET',
			}),
		}),
	}),
	overrideExisting: false,
});

// Export hooks for the queries
export const {
	useGetAllCREsPerformanceDataQuery,
	useGetCREPerformanceDataByIdQuery,
	useGetMeetingsDataQuery,
	useGetNotificationsQuery,
} = dashboardApi;

export default dashboardApi;
