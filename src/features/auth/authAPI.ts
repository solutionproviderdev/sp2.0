import apiSlice from '../api/apiSlice';

interface User {
	_id: string;
	nameAsPerNID: string;
	nickname: string;
	email: string;
	personalPhone: string;
	officePhone: string;
	gender: string;
	address: string;
	profilePicture?: string;
	coverPhoto?: string;
	status: string;
	roleId?: string;
	departmentId?: string;
}

interface LoginResponse {
	user: User;
	token: string;
}

interface UpdateUserResponse {
	msg: string;
	user: User;
}

interface UpdatePasswordPayload {
	oldPassword: string;
	newPassword: string;
}

interface UpdateProfilePicturePayload {
	profilePicture: string;
}

interface UpdateCoverPhotoPayload {
	coverPhoto: string;
}

interface UpdateStatusPayload {
	status: string;
}

const authApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// User login
		loginUser: builder.mutation<
			LoginResponse,
			{ email: string; password: string }
		>({
			query: ({ email, password }) => {
				console.log('redux--->',email,password)
				return{
				url: '/users/login',
				method: 'POST',
				body: { email, password },
				credentials: 'include',
			}},
		}),

		// User logout
		logoutUser: builder.mutation<{ msg: string }, void>({
			query: () => ({
				url: '/users/logout',
				method: 'POST',
			}),
		}),

		// Fetch all users
		getAllUsers: builder.query<User[], void>({
			query: () => '/users',
		}),

		// Get single user by ID
		getUserById: builder.query<User, string>({
			query: id => `/users/${id}`,
		}),

		// Update user details
		updateUser: builder.mutation<
			UpdateUserResponse,
			{ id: string; userData: Partial<User> }
		>({
			query: ({ id, userData }) => ({
				url: `/users/${id}`,
				method: 'PUT',
				body: userData,
			}),
		}),

		// Update user password
		updateUserPassword: builder.mutation<
			{ msg: string },
			{ id: string; data: UpdatePasswordPayload }
		>({
			query: ({ id, data }) => ({
				url: `/users/${id}/password`,
				method: 'PATCH',
				body: data,
			}),
		}),

		// Admin update user password
		adminUpdateUserPassword: builder.mutation<
			{ msg: string },
			{ id: string; newPassword: string }
		>({
			query: ({ id, newPassword }) => ({
				url: `/users/admin/${id}/password`,
				method: 'PATCH',
				body: { newPassword },
			}),
		}),

		// Update user profile picture
		updateUserProfilePicture: builder.mutation<
			{ msg: string; profilePicture: string },
			{ id: string; data: UpdateProfilePicturePayload }
		>({
			query: ({ id, data }) => ({
				url: `/users/${id}/profile-picture`,
				method: 'PATCH',
				body: data,
			}),
		}),

		// Update user cover photo
		updateUserCoverPhoto: builder.mutation<
			{ msg: string; coverPhoto: string },
			{ id: string; data: UpdateCoverPhotoPayload }
		>({
			query: ({ id, data }) => ({
				url: `/users/${id}/cover-photo`,
				method: 'PATCH',
				body: data,
			}),
		}),

		// Update user status
		updateUserStatus: builder.mutation<
			{ msg: string; status: string },
			{ id: string; data: UpdateStatusPayload }
		>({
			query: ({ id, data }) => ({
				url: `/users/${id}/status`,
				method: 'PATCH',
				body: data,
			}),
		}),
	}),
});

// Export hooks for each endpoint
export const {
	useLoginUserMutation,
	useLogoutUserMutation,
	useGetAllUsersQuery,
	useGetUserByIdQuery,
	useUpdateUserMutation,
	useUpdateUserPasswordMutation,
	useAdminUpdateUserPasswordMutation,
	useUpdateUserProfilePictureMutation,
	useUpdateUserCoverPhotoMutation,
	useUpdateUserStatusMutation,
} = authApi;

export default authApi;
