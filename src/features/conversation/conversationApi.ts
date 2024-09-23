import apiSlice from "../api/apiSlice";

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

interface GetConversationByIdResponse {
  conversation: Conversation;
}

// Extend the apiSlice with specific endpoints for conversations
const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all leads
    getSingleLead: builder.query<GetConversationByIdResponse, string>({
      query: (id: string) => `/lead/${id}`,
    }),
    // Fetch all conversations
    getAllConversations: builder.query<GetAllConversationsResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `/lead/conversation?page=${page}&limit=${limit}`, // Adjust endpoint to include pagination
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Fetched Conversations:", data);
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }
      },
    }),

    // Fetch a specific conversation by ID
    getConversationMessages: builder.query<GetConversationByIdResponse, string>({
      query: (id: string) => `/lead/conversation/${id}/messages/`,
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
        body:  data ,
      }),
    }),
    // sent message to leads
    sentMessage: builder.mutation({
      query: ({ id, message }) => ({
        url: `/lead/conversation/${id}/messages`,
        method: 'POST',
        body: message,
      }),
    }),
    // add comment to leads
    addComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `/lead/${id}/comments`,
        method: 'POST',
        body: comment,
      }),
    }),
    // add phon nuber 
    addPhone: builder.mutation({
      query: ({ id, phoneNumber }) => ({
        url: `/lead/${id}/add-phone-number`,
        method: 'PUT',
        body: phoneNumber,
      }),
    }),
    // add reminder follow up    
    addReminder: builder.mutation({
      query: ({ id, reminder }) => ({
        url: `/lead/${id}/reminders`,
        method: 'POST',
        body: reminder,
      }),
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
  useAddPhoneMutation
} = conversationApi;

export default conversationApi;


