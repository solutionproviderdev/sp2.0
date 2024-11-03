import apiSlice from '../api/apiSlice';

// Define the interface for the response
interface UploadResponse {
	fileUrl: string;
}

// Extend the apiSlice with upload endpoints
const uploadApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// Upload image endpoint
		uploadImage: builder.mutation<UploadResponse, FormData>({
			query: data => ({
				url: '/upload/image',
				method: 'POST',
				body: data, // FormData will automatically include the file
			}),
		}),

		// Upload file endpoint
		uploadFile: builder.mutation<UploadResponse, FormData>({
			query: data => ({
				url: '/upload/file',
				method: 'POST',
				body: data, // FormData will automatically include the file
			}),
		}),
	}),
	overrideExisting: false,
});

// Export the auto-generated hooks for usage in functional components
export const { useUploadImageMutation, useUploadFileMutation } = uploadApi;

export default uploadApi;
