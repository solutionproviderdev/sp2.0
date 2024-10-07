import apiSlice from '../api/apiSlice';

interface Comment {
	comment: string;
	images: string[];
	date: string;
}

interface Reminder {
	_id: string;
	time: string;
	status: string;
	commentId?: string;
	comment?: Comment | null;
}

interface Address {
	division: string;
	district: string;
	area: string;
	address: string;
}

interface ProjectStatus {
	status: string;
	subStatus: string;
}

interface PageInfo {
	pageId: string;
	pageName: string;
	pageProfilePicture: string;
	fbSenderID: string;
}

export interface Lead {
	_id: string;
	name: string;
	status: string;
	creName: string | null;
	salesExqName: string | null;
	reminder: Reminder[];
	projectStatus: ProjectStatus;
	pageInfo: PageInfo;
	lastMsg: string;
	source: string;
	phone: string[];
	requirements: string[];
	createdAt: string;
	updatedAt: string;
	address: Address;
	projectLocation: string;
}

interface GetAllLeadsWithRemindersResponse {
	total: number;
	totalPages: number;
	page: number;
	limit: number;
	leads: Lead[];
	filterOptions: {
		creNames: string[];
		salesNames: string[];
		statuses: string[];
		sources: string[];
	};
}

// Extend the apiSlice with specific endpoints for leads with reminders
const leadApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// Fetch all leads with reminders
		getAllLeadsWithReminders: builder.query<
			GetAllLeadsWithRemindersResponse,
			{
				page: number;
				limit: number;
				status?: string;
				source?: string;
				startDate?: string;
				endDate?: string;
				assignedCre?: string;
				salesExecutive?: string;
			}
		>({
			query: ({
				page,
				limit,
				status,
				source,
				startDate,
				endDate,
				assignedCre,
				salesExecutive,
			}) => {
				// Construct query params
				let params = `?page=${page}&limit=${limit}`;
				if (status) params += `&status=${status}`;
				if (source) params += `&source=${source}`;
				if (startDate) params += `&startDate=${startDate}`;
				if (endDate) params += `&endDate=${endDate}`;
				if (assignedCre) params += `&assignedCre=${assignedCre}`;
				if (salesExecutive) params += `&salesExecutive=${salesExecutive}`;

				return {
					url: `/lead/reminders${params}`, // Assuming `/lead/reminders` is the endpoint
				};
			},
			providesTags: result =>
				result
					? [
							...result.leads.map(
								({ _id }) => ({ type: 'Lead', id: _id } as const)
							),
							{ type: 'Lead', id: 'LIST' },
					  ]
					: [{ type: 'Lead', id: 'LIST' }],
		}),
	}),
	overrideExisting: false, // Prevents overriding existing endpoints
});

// Export the auto-generated hooks for usage in functional components
export const { useGetAllLeadsWithRemindersQuery } = leadApi;

export default leadApi;
