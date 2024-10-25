// src/services/meetingsApi.ts
 import apiSlice from '../api/apiSlice';

const meetingsApi = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
        GetAllMeetings: builder.query({
            query: () => '/',
            providesTags: ['Meeting'],
        }),
        GetSingleMeeting: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Meeting', id }],
        }),
        CreateMeeting: builder.mutation({
            query: (meetingData) => ({
                url: '/',
                method: 'POST',
                body: meetingData,
            }),
            invalidatesTags: ['Meeting'],
        }),
        UpdateMeeting: builder.mutation({
            query: ({ id, ...updates }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Meeting', id }],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetSingleMeetingQuery,
    useLazyGetSingleMeetingQuery,
    useCreateMeetingMutation,
    useUpdateMeetingMutation,
} = meetingsApi;

// Export the API slice reducer
export default meetingsApi.reducer;
