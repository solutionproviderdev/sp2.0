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
    getAllConversations: builder.query<GetAllConversationsResponse, void>({
      query: () => "/lead/conversation", // Assuming your backend endpoint for fetching conversations is "/conversations"
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // Await the query's result
          const { data } = await queryFulfilled;
          // Log the successful response
          console.log("Fetched---------- Conversations:", data);
          
        } catch (error) {
          // Log any errors encountered
          console.error("Error fetching conversations:", error);
        }
      },
    }),

    // Fetch a specific conversation by ID
    getConversationById: builder.query<GetConversationByIdResponse, string>({
      query: (id: string) => `/lead/conversation/${id}`,
    }),
    
}),
overrideExisting: false, // Optional: Prevents overriding existing endpoints
});

// Export the auto-generated hooks for usage in functional components
export const {
  useGetAllConversationsQuery,
  useGetConversationByIdQuery
} = conversationApi;

export default conversationApi;


