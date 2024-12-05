import apiSlice from '../../api/apiSlice';

// Define types for the data structures
interface FacebookPage {
	name: string;
	pageId: string;
	picture: string;
	pageAccessToken: string;
}

interface FacebookSettings {
	pages: FacebookPage[];
}

const facebookApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// Fetch all Facebook pages
		getFacebookPages: builder.query<FacebookSettings, void>({
			query: () => '/settings/facebook/pages',
			providesTags: ['FacebookPages'], // Provides the FacebookPages tag
		}),

		// Add a new Facebook page
		addFacebookPage: builder.mutation<
			FacebookSettings,
			{ pageAccessToken: string }
		>({
			query: body => ({
				url: '/settings/facebook/pages',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['FacebookPages'], // Invalidates the FacebookPages tag
		}),

		// Delete a Facebook page
		deleteFacebookPage: builder.mutation<FacebookSettings, { pageId: string }>({
			query: body => ({
				url: '/settings/facebook/pages',
				method: 'DELETE',
				body,
			}),
			invalidatesTags: ['FacebookPages'], // Invalidates the FacebookPages tag
		}),
	}),
});

// Export hooks for using the endpoints in components
export const {
	useGetFacebookPagesQuery,
	useAddFacebookPageMutation,
	useDeleteFacebookPageMutation,
} = facebookApi;

export default facebookApi;
