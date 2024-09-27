import { patch } from '@mui/material';
import { getSocket } from '../../hooks/getSocket';
import apiSlice from '../api/apiSlice';

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

interface GetAllConversationsResponse {
	conversations: Conversation[];
}

interface GetConversationMessagesResponse {
	messages: Message[];
	messagesSeen: boolean;
}

interface GetAllConversationsResponse {
	totalLeads: number;
	totalPages: number;
	currentPage: number;
	leads: Conversation[];
}

interface GetConversationByIdResponse {
	conversation: Conversation;
}

const socket = getSocket();

// Extend the apiSlice with specific endpoints for conversations
const conversationApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// get all leads
		getSingleLead: builder.query<GetConversationByIdResponse, string>({
			query: (id: string) => `/lead/${id}`,
			providesTags: (result, error, id) => [{ type: 'Lead', id }],
		}),

		getAllConversations: builder.query<
			GetAllConversationsResponse,
			{ page: number; limit: number }
		>({
			query: ({ page, limit }) =>
				`/lead/conversation?page=${page}&limit=${limit}`,

			// // Use the merge function to combine the new data with the current cache
			// merge: (currentCache, newItems) => {
			// 	console.log('runing merge function');
			// 	// Make sure newItems contains leads to be merged
			// 	if (newItems && newItems.leads) {
			// 		// Append new items to the existing cache
			// 		newItems.leads.forEach(newConversation => {
			// 			const existingIndex = currentCache.leads.findIndex(
			// 				conv => conv._id === newConversation._id
			// 			);

			// 			if (existingIndex !== -1) {
			// 				// Update the existing conversation if it already exists
			// 				currentCache.leads[existingIndex] = newConversation;
			// 			} else {
			// 				// Otherwise, add the new conversation to the list
			// 				currentCache.leads.push(newConversation);
			// 			}
			// 		});

			// 		// Sort conversations by lastMessageTime
			// 		currentCache.leads.sort(
			// 			(a, b) =>
			// 				new Date(b.lastMessageTime).getTime() -
			// 				new Date(a.lastMessageTime).getTime()
			// 		);
			// 	}
			// },

			// Use a constant cache key for all pages
			// serializeQueryArgs: ({ endpointName }) => endpointName,

			// // Refetch when the page number changes
			// forceRefetch({ currentArg, previousArg }) {
			// 	return currentArg.page !== previousArg.page;
			// },

			// Handle real-time socket updates
			async onCacheEntryAdded(
				arg,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				try {
					await cacheDataLoaded;

					// Define the socket listener for conversation updates
					const handleConversationUpdate = (conversation: Conversation) => {
						updateCachedData(draft => {
							const index = draft.leads.findIndex(
								({ _id }) => _id === conversation._id
							);
							if (index !== -1) {
								// Update the existing conversation
								draft.leads[index] = conversation;
							} else {
								// Add the new conversation if it doesn't exist
								draft.leads.unshift(conversation);
							}

							// Sort conversations by lastMessageTime
							draft.leads.sort(
								(a, b) =>
									new Date(b.lastMessageTime).getTime() -
									new Date(a.lastMessageTime).getTime()
							);
						});
					};

					// Listen to socket events for conversation updates
					socket.on('conversation', handleConversationUpdate);

					// Clean up the socket listener when cache entry is removed
					await cacheEntryRemoved;
					socket.off('conversation', handleConversationUpdate);
				} catch (error) {
					console.error('Error handling socket updates:', error);
				}
			},
		}),

		// Fetch a specific conversation by ID
		getConversationMessages: builder.query<
			GetConversationMessagesResponse,
			string
		>({
			query: (id: string) => `/lead/conversation/${id}/messages/`,

			// Adding socket listener to update conversation messages
			async onCacheEntryAdded(
				id,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				try {
					await cacheDataLoaded;

					const handleMessageUpdate = (message: Message) => {
						console.log('Received message update:', message);

						updateCachedData(draft => {
							// Check if message already exists
							const index = draft.messages.findIndex(
								({ messageId }) => messageId === message.messageId
							);

							if (index === -1) {
								// Add the new message to the conversation
								draft.messages.push(message);
							}
						});
					};

					// Listen to socket events for message updates
					socket.on(`fbMessage${id}`, handleMessageUpdate);

					// Clean up the socket listener when cache entry is removed
					await cacheEntryRemoved;
					socket.off(`fbMessage${id}`, handleMessageUpdate);
				} catch {
					// Handle errors if necessary
				}
			},
		}),

		// Requirements
		updateRequirement: builder.mutation({
			query: ({ id, requirements }) => ({
				url: `/lead/${id}/requirements`,
				method: 'PUT',
				body: { requirements },
			}),
		}),
		//Update reminder or follow-up
		updateReminder: builder.mutation({
			query: ({ id, reminders }) => ({
				url: `/lead/${id}/reminders`,
				method: 'post',
				body: { reminders },
			}),
		}),
		// Update leads
		updateLeads: builder.mutation({
			query: ({ id, data }) => ({
				url: `/lead/${id}`,
				method: 'put',
				body: data,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Lead', id }],
		}),

		// sent message to leads
		sentMessage: builder.mutation({
			query: ({ id, message }) => ({
				url: `/lead/conversation/${id}/messages`,
				method: 'POST',
				body: message,
			}),
		}),

		addComment: builder.mutation({
			query: ({ id, comment }) => ({
				url: `/lead/${id}/comments`,
				method: 'POST',
				body: comment,
			}),
		}),
		// add phone number
		addPhone: builder.mutation({
			query: ({ id, phoneNumber }) => ({
				url: `/lead/${id}/add-phone-number`,
				method: 'PUT',
				body: phoneNumber,
			}),
		}),

		markAsSeen: builder.mutation({
			query: ({ id }) => ({
				url: `/lead/conversation/${id}/mark-messages-seen`,
				method: 'PUT',
			}),
			async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
				// Optimistically update the cache with the seen status
				console.log('from outside of dispatch function', id);
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						'getAllConversations',
						{ page: 1, limit: 500 },
						draft => {
							const index = draft.leads.findIndex(lead => lead._id === id);
							if (index !== -1) {
								draft.leads[index].messagesSeen = true;
							}
						}
					)
				);

				console.log(patchResult);

				try {
					await queryFulfilled; // Wait for the mutation to succeed
				} catch {
					patchResult.undo(); // Revert the optimistic update if the mutation fails
				}
			},
		}),
	}),
	overrideExisting: false, // Optional: Prevents overriding existing endpoints
});

// Export the auto-generated hooks for usage in functional components
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
	useMarkAsSeenMutation,
} = conversationApi;

export default conversationApi;
