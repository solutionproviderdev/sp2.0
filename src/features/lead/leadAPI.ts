import { getSocket } from '../../hooks/getSocket';
import apiSlice from '../api/apiSlice';
import { Comment } from '../conversation/conversationApi';

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
	comment: Comment[];
}

interface User {
	_id: string;
	name: string;
	profilePicture: string;
}

interface GetAllLeadsWithRemindersResponse {
	total: number;
	totalPages: number;
	page: number;
	limit: number;
	leads: Lead[];
	filterOptions: {
		creNames: User[];
		salesNames: User[];
		statuses: string[];
		sources: string[];
	};
}

const socket = getSocket();

// Extend the apiSlice with specific endpoints for leads with reminders
const leadApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// Fetch all leads with reminders
		getAllLeadsWithReminders: builder.query<
			GetAllLeadsWithRemindersResponse,
			{
				status?: string;
				source?: string;
				startDate?: string;
				endDate?: string;
				assignedCre?: string;
				salesExecutive?: string;
			}
		>({
			query: ({
				status,
				source,
				startDate,
				endDate,
				assignedCre,
				salesExecutive,
			}) => {
				// Construct query params
				let params = '';
				if (status) params += `&status=${status}`;
				if (source) params += `&source=${source}`;
				if (startDate) params += `&startDate=${startDate}`;
				if (endDate) params += `&endDate=${endDate}`;
				if (assignedCre) params += `&assignedCre=${assignedCre}`;
				if (salesExecutive) params += `&salesExecutive=${salesExecutive}`;

				// Remove the leading '&' and add '?' if params exist
				if (params) params = `?${params.slice(1)}`;

				return {
					url: `/lead/reminders${params}`, // Assuming `/lead/reminders` is the endpoint
				};
			},
			async onCacheEntryAdded(
				arg,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				try {
					// Wait for the initial query to resolve
					await cacheDataLoaded;

					// Listen for the missedReminder event
					socket.on('missedReminder', data => {
						console.log('Missed reminder received:', data);

						// Update the cache data
						updateCachedData(draft => {
							const leadIndex = draft.leads.findIndex(
								lead => lead._id === data.leadId
							);
							if (leadIndex !== -1) {
								const reminderIndex = draft.leads[leadIndex].reminder.findIndex(
									reminder => reminder._id === data.reminderId
								);
								if (reminderIndex !== -1) {
									// Update the reminder status to "Missed"
									draft.leads[leadIndex].reminder[reminderIndex].status =
										'Missed';
								}
							}
						});
					});

					// Listen for the newReminder event
					socket.on('newReminder', data => {
						console.log('New reminder received:', data);

						// Update the cache data
						updateCachedData(draft => {
							// Push the new lead object to the front of the leads array
							draft.leads.unshift(data.lead);
						});
					});
				} catch (error) {
					console.error('Error handling socket event:', error);
				}

				// Cleanup the socket listener when the cache entry is removed
				await cacheEntryRemoved;
				socket.off('missedReminder');
				socket.off('newReminder');
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
