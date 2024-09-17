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
      query: (id: string) => `/lead/${id}/requirements/`
    }),
    
}),
overrideExisting: false, // Optional: Prevents overriding existing endpoints
});

// Export the auto-generated hooks for usage in functional components
export const {
  useGetAllConversationsQuery,
  useGetConversationMessagesQuery,
  useUpdateRequirementMutation
} = conversationApi;

export default conversationApi;


