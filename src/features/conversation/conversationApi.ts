import { getSocket } from '../../hooks/getSocket';
import apiSlice from '../api/apiSlice';
import { Lead } from '../lead/leadAPI';

// Define Types for Message, Conversation, Lead, and other entities

interface Message {
	_id: string;
	messageId: string;
	content: string;
	senderId: string;
	sentByMe: boolean;
	fileUrl: string[];
	isSticker: boolean;
	date: string;
}

interface Conversation {
	_id: string;
	name: string;
	status: string;
	creName: string | null;
	messagesSeen: boolean;
	createdAt: string;
	lastMessage: string;
	lastMessageTime: string;
	sentByMe: boolean;
}
export interface Comment {
	comment: string;
	commentBy: string; // Assuming commentBy is a user ID (ObjectId as string)
	images: string[];
	timestamp: string;
	_id: string;
}
interface CallLog {
	recipientNumber: string;
	callDuration: number | string; // Allow string format as "MM:SS"
	timestamp: string;
	callType: string;
	status: string;
}

interface Reminder {
	time: string;
	status: string;
	_id: string;
}

interface GetAllConversationsResponse {
	totalLeads: number;
	totalPages: number;
	currentPage: number;
	leads: Conversation[];
}

interface GetConversationMessagesResponse {
	messages: Message[];
	messagesSeen: boolean;
}

interface GetLeadByIdResponse {
	lead: Lead;
}

interface CreateLeadPayload {
	name: string;
	phone: string[];
	source: string;
	status?: string;
	comment?: string;
	images?: string[];
}

interface UpdateLeadPayload {
	name?: string;
	phone?: string[]; // Array of phone numbers
	source?: 'Facebook' | 'WhatsApp' | 'Web' | 'Phone'; // Enum values for the source
	status?:
		| 'New'
		| 'No Response'
		| 'Message Rescheduled'
		| 'Need Support'
		| 'Number Collected'
		| 'Ongoing'
		| 'Call Rescheduled'
		| 'Follow Up'
		| 'Meeting Fixed'
		| 'Meeting Reschedule'
		| 'Cancel Meeting'; // Enum for status
	address?: {
		division?: string;
		district?: string;
		area?: string;
		address?: string;
	}; // Address fields
	projectStatus?: {
		status?: 'Ongoing' | 'Ready' | 'Renovation'; // Project status
		subStatus?:
			| 'Roof Casting'
			| 'Brick Wall'
			| 'Plaster'
			| 'Pudding'
			| 'Two Coat Paint'
			| 'Tiles Complete'
			| 'Final Paint Done'
			| 'Handed Over'
			| 'Staying in the Apartment'
			| 'Interior Work Complete'; // Project sub-status
	};
	projectLocation?: 'Inside' | 'Outside'; // Enum for project location
	messagesSeen?: boolean; // Boolean for messagesSeen
	requirements?: string[]; // Array of requirements
}

interface PageInfo {
	pageId: string;
	pageName: string;
	pageProfilePicture: string;
	fbSenderID: string;
}

interface Comment {
	comment: string;
	commentBy?: string; // ObjectId as string (optional based on existence in the data)
	images: string[];
	date: string; // Assuming it's a string (ISO format)
	_id: string;
	createdAt: string;
	updatedAt: string;
}

interface Reminder {
	time: string; // ISO format date string
	status: 'Pending' | 'Complete' | 'Missed' | 'Late Complete';
	commentId?: string;
	_id: string;
}

interface MeetingDetail {
	date: string; // ISO format date string
	slot: 'slot_1' | 'slot_2' | 'slot_3' | 'slot_4';
	team: string; // Assuming team is an ObjectId represented as a string
}

interface Address {
	division: string;
	district: string;
	area: string;
	address: string;
}

interface ProjectStatus {
	status: 'Ongoing' | 'Ready' | 'Renovation';
	subStatus:
		| 'Roof Casting'
		| 'Brick Wall'
		| 'Plaster'
		| 'Pudding'
		| 'Two Coat Paint'
		| 'Tiles Complete'
		| 'Final Paint Done'
		| 'Handed Over'
		| 'Staying in the Apartment'
		| 'Interior Work Complete';
}

interface CREName {
	_id: string;
	nameAsPerNID: string;
	nickname: string;
	profilePicture: string;
}

interface ConversationLead {
	pageInfo: PageInfo;
	projectStatus: ProjectStatus;
	_id: string;
	CID: string;
	name: string;
	status: string;
	lastMsg: string;
	source: string;
	phone: string[];
	creName: CREName;
	messagesSeen: boolean;
	requirements: string[];
	createdAt: string;
	meetingDetails: MeetingDetail[];
	comment: Comment[];
	reminder: Reminder[];
	updatedAt: string;
	__v: number;
	address: Address;
}

interface GetConversationByIdResponse {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	filters: {
		statuses: string[];
		sources: string[];
		creNames: {
			_id: string;
			name: string;
			nickname: string;
			profilePicture: string;
		}[];
		salesExecutives: {
			_id: string;
			name: string;
			nickname: string;
			profilePicture: string;
		}[];
	};
	leads: ConversationLead[];
}

interface UpdateReminderPayload {
	id: string;
	time: string;
	commentId?: string;
}

interface ReminderResponse {
	status: 'success' | 'error';
	reminders: Reminder[];
}

interface ErrorResponse {
	status: number;
	data: {
		msg: string;
	};
}

const socket = getSocket();

const conversationApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		createLeadWithNumber: builder.mutation({
			query: ({ leadData }) => {
				console.log('rtk rtk phone lead create------', leadData);
				return {
					url: `/lead`,
					method: 'post',
					body: leadData,
				};
			},
		}),

		// Get all leads with filters
		getAllLead: builder.query<
			GetConversationByIdResponse,
			{
				page?: number;
				limit?: number;
				status?: string;
				source?: string;
				startDate?: string;
				endDate?: string;
				assignedCre?: string;
				salesExecutive?: string;
			}
		>({
			query: ({
				page = 1,
				limit = 100,
				status,
				source,
				startDate,
				endDate,
				assignedCre,
				salesExecutive,
			}) => {
				// Build query string dynamically based on provided filters
				const queryParams = new URLSearchParams();

				queryParams.append('page', page.toString());
				queryParams.append('limit', limit.toString());

				if (status) queryParams.append('status', status);
				if (source) queryParams.append('source', source);
				if (startDate) queryParams.append('startDate', startDate);
				if (endDate) queryParams.append('endDate', endDate);
				if (assignedCre) queryParams.append('assignedCre', assignedCre);
				if (salesExecutive)
					queryParams.append('salesExecutive', salesExecutive);

				return `/lead?${queryParams.toString()}`;
			},
		}),

		// Get a single lead by its ID
		getSingleLead: builder.query<Lead, string>({
			query: (id: string) => `/lead/${id}`,
			providesTags: (result, error, id) => [{ type: 'Lead', id }],
		}),

		// Get all conversations (leads) with pagination
		getAllConversations: builder.query<
			GetAllConversationsResponse,
			{ page: number; limit: number }
		>({
			query: ({ page, limit }) =>
				`/lead/conversation?page=${page}&limit=${limit}`,
			onCacheEntryAdded: async (
				arg,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) => {
				await cacheDataLoaded;

				const handleConversationUpdate = (conversation: Conversation) => {
					updateCachedData(draft => {
						const index = draft.leads.findIndex(
							({ _id }) => _id === conversation._id
						);
						if (index !== -1) {
							draft.leads[index] = conversation;
						} else {
							draft.leads.unshift(conversation);
						}
						draft.leads.sort(
							(a, b) =>
								new Date(b.lastMessageTime).getTime() -
								new Date(a.lastMessageTime).getTime()
						); 
					});
				};

				socket.on('conversation', handleConversationUpdate);
				await cacheEntryRemoved;
				socket.off('conversation', handleConversationUpdate);
			},
		}),

		// Get conversation messages for a specific lead
		getConversationMessages: builder.query<
			GetConversationMessagesResponse,
			string
		>({
			query: (id: string) => `/lead/conversation/${id}/messages/`,
			onCacheEntryAdded: async (
				id,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) => {
				await cacheDataLoaded;

				const handleMessageUpdate = (message: Message) => {
					updateCachedData(draft => {
						if (
							!draft.messages.find(
								({ messageId }) => messageId === message.messageId
							)
						) {
							draft.messages.push(message);
						}
					});
				};

				socket.on(`fbMessage${id}`, handleMessageUpdate);
				await cacheEntryRemoved;
				socket.off(`fbMessage${id}`, handleMessageUpdate);
			},
		}),

		// Update lead requirements
		updateRequirement: builder.mutation<
			Lead,
			{ id: string; requirements: string[] }
		>({
			query: ({ id, requirements }) => ({
				url: `/lead/${id}/requirements`,
				method: 'PUT',
				body: { requirements },
			}),
		}),

		// Add a phone number to a lead
		addPhone: builder.mutation<Lead, { id: string; phoneNumber: string }>({
			query: ({ id, phoneNumber }) => {
				console.log(phoneNumber, typeof phoneNumber);
				return {
					url: `/lead/${id}/add-phone-number`,
					method: 'PUT',
					body: { phoneNumber },
				};
			},
		}),

		// Update reminders
		updateReminder: builder.mutation<
			ReminderResponse, // Response type (reminders array)
			UpdateReminderPayload // Request type (with optional commentId)
		>({
			query: ({ id, time, commentId }) => ({
				url: `/lead/${id}/reminders`,
				method: 'POST',
				body: { time, commentId }, // Send both time and optional commentId
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Lead', id }],
		}),

		// Mark messages as seen with optimistic update
		markAsSeen: builder.mutation<void, { id: string }>({
			query: ({ id }) => ({
				url: `/lead/conversation/${id}/mark-messages-seen`,
				method: 'PUT',
			}),
			// Optimistic update: we update the cached data before the mutation is fulfilled
			onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
				// Optimistically update the leads cache to mark messages as seen
				const patchResult = dispatch(
					conversationApi.util.updateQueryData(
						'getAllConversations',
						{ page: 1, limit: 500 }, // Assuming you're fetching paginated data
						draft => {
							const lead = draft.leads.find(lead => lead._id === arg.id);
							if (lead) {
								lead.messagesSeen = true; // Mark the messages as seen optimistically
							}
						}
					)
				);

				try {
					// Await the actual server response
					await queryFulfilled;
				} catch (err) {
					// Rollback the optimistic update if the mutation fails
					patchResult.undo();
				}
			},
			// Invalidates the cache for specific lead once the mutation is successful
			invalidatesTags: (result, error, { id }) => [{ type: 'Lead', id }],
		}),

		// Add a call log to a lead
		addCallLogs: builder.mutation<
			{ msg: string; lead: Lead }, // Response type
			{
				id: string;
				newCallLog: {
					recipientNumber: string;
					callType: 'Incoming' | 'Outgoing';
					status: 'Missed' | 'Received';
					callDuration?: number | string;
					timestamp: string;
				};
			} // Request type
		>({
			query: ({ id, newCallLog }) => ({
				url: `/lead/${id}/call-logs`,
				method: 'POST',
				body: newCallLog,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Lead', id }],
		}),

		// Send a message to a lead
		sentMessage: builder.mutation<
			void,
			{
				id: string;
				message: { messageType: string; content: { text: string } };
			}
		>({
			query: ({ id, message }) => ({
				url: `/lead/conversation/${id}/messages`,
				method: 'POST',
				body: message,
			}),
		}),

		// Add a comment to a lead
		addComment: builder.mutation<
			void,
			{ id: string; comment: { comment: string; images: string[] } }
		>({
			query: ({ id, comment }) => ({
				url: `/lead/${id}/comments`,
				method: 'POST',
				body: comment,
			}),
			async onQueryStarted({ id, comment }, { dispatch, queryFulfilled }) {
				// Reference to handle incoming socket events
				const handleCommentAdded = ({
					leadId,
					comment,
				}: {
					leadId: string;
					comment: Comment;
				}) => {
					dispatch(
						conversationApi.util.updateQueryData('getSingleLead', id, lead => {
							// check if the comment already exists in the lead's comment array
							const existingComment = lead.comment.find(
								c => c._id === comment._id
							);

							if (!existingComment) {
								// If the comment not exists, push it

								lead.comment.push(comment);
							}
						})
					);
				};
				socket.on(`newComment_${id}`, handleCommentAdded);

				// Ensure socket listener is removed when the cache entry is removed
				// await queryFulfilled;
				// socket.off(`newComment_${id}`, handleCommentAdded);
			},
		}),

		// Update a lead
		updateLeads: builder.mutation<
			Lead,
			{ id: string; data: UpdateLeadPayload }
		>({
			query: ({ id, data }) => ({
				url: `/lead/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Lead', id }],
		}),
	}),
	overrideExisting: false,
});

// Export hooks for use in components
export const {
	useGetAllConversationsQuery,
	useGetConversationMessagesQuery,
	useUpdateRequirementMutation,
	useGetSingleLeadQuery,
	useUpdateReminderMutation,
	useUpdateLeadsMutation,
	useSentMessageMutation,
	useAddCommentMutation,
	useAddPhoneMutation,
	useAddCallLogsMutation,
	useMarkAsSeenMutation,
	useGetAllLeadQuery,
	useCreateLeadWithNumberMutation,
} = conversationApi;

export default conversationApi;
