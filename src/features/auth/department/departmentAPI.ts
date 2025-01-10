import apiSlice from '../../api/apiSlice';

// Updated Interfaces for Department, Role, and Permission
interface PermissionAction {
	name: string;
	allowed: boolean;
}

interface Permission {
	resource: string;
	actions: PermissionAction[];
}

export interface Role {
	_id: string;
	roleName: string;
	description?: string;
	permissions: Permission[];
}

export interface Department {
	_id: string;
	departmentName: string;
	description?: string;
	roles: Role[];
	staffCount: number;
}

// Response for fetching all permissions
type GetAllPermissionsResponse = Permission[];

// Responses
type GetAllDepartmentsResponse = Department[];

type GetDepartmentByIdResponse = Department;

interface CreateDepartmentRequest {
	departmentName: string;
	description?: string;
	roles?: Role[]; // Roles are now optional
}

type CreateDepartmentResponse = Department;

interface UpdateDepartmentRequest {
	departmentName?: string;
	description?: string;
	roles?: Role[];
}

interface UpdateDepartmentResponse {
	department: Department;
}

interface AddRoleRequest {
	roleName: string;
	description?: string;
	permissions: Permission[];
}

interface UpdateRoleRequest {
	roleName?: string;
	description?: string;
	permissions?: Permission[];
}

// RTK API for Department
const departmentApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// Fetch all departments
		getAllDepartments: builder.query<GetAllDepartmentsResponse, void>({
			query: () => '/users/departments',
		}),

		// Fetch department by ID
		getDepartmentById: builder.query<GetDepartmentByIdResponse, string>({
			query: id => `/users/departments/${id}`,
		}),

		// Create a new department (with pessimistic update for all departments)
		createDepartment: builder.mutation<
			CreateDepartmentResponse,
			CreateDepartmentRequest
		>({
			query: department => ({
				url: '/users/departments',
				method: 'POST',
				body: department,
			}),
			onQueryStarted: async (newDepartment, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled; // Wait for mutation to succeed

					console.log(data);

					// Pessimistically update the cache for getAllDepartments
					dispatch(
						departmentApi.util.updateQueryData(
							'getAllDepartments',
							undefined,
							draft => {
								// Add the new department to the cached list of departments
								draft.push(data);
							}
						)
					);
				} catch (error) {
					// Handle errors if needed (optional logging, etc.)
					console.error('Error creating department:', error);
				}
			},
		}),

		// Update a department by ID
		updateDepartment: builder.mutation<
			UpdateDepartmentResponse,
			{ id: string; department: UpdateDepartmentRequest }
		>({
			query: ({ id, department }) => ({
				url: `/users/departments/${id}`,
				method: 'PUT',
				body: department,
			}),
		}),

		// Delete a department by ID
		deleteDepartment: builder.mutation<{ msg: string }, string>({
			query: id => ({
				url: `/users/departments/${id}`,
				method: 'DELETE',
			}),
		}),

		// Add a role to a department (Pessimistic Update for all departments)
		addRoleToDepartment: builder.mutation<
			Department,
			{ departmentId: string; role: AddRoleRequest }
		>({
			query: ({ departmentId, role }) => ({
				url: `/users/departments/${departmentId}/roles`,
				method: 'POST',
				body: role,
			}),
			onQueryStarted: async (
				{ departmentId, role },
				{ dispatch, queryFulfilled }
			) => {
				try {
					const { data } = await queryFulfilled; // Wait for mutation to succeed

					// Pessimistically update the cache for getAllDepartments
					dispatch(
						departmentApi.util.updateQueryData(
							'getAllDepartments',
							undefined,
							draft => {
								const department = draft.find(dep => dep._id === departmentId);
								if (department) {
									department.roles.push(data.roles[data.roles.length - 1]);
								}
							}
						)
					);
				} catch (error) {
					// Handle errors if needed (optional logging, etc.)
					console.error('Error adding role:', error);
				}
			},
		}),

		// Update a role in a department
		updateRoleInDepartment: builder.mutation<
			Department,
			{ departmentId: string; roleId: string; role: UpdateRoleRequest }
		>({
			query: ({ departmentId, roleId, role }) => ({
				url: `/users/departments/${departmentId}/roles/${roleId}`,
				method: 'PUT',
				body: role,
			}),
		}),

		// Delete a role from a department
		deleteRoleFromDepartment: builder.mutation<
			{ msg: string },
			{ departmentId: string; roleId: string }
		>({
			query: ({ departmentId, roleId }) => ({
				url: `/users/departments/${departmentId}/roles/${roleId}`,
				method: 'DELETE',
			}),
		}),

		// New Endpoint: Get all permissions
		getAllPermissions: builder.query<GetAllPermissionsResponse, void>({
			query: () => '/users/departments/permissions',
		}),
	}),
});

// Export hooks for usage in components
export const {
	useGetAllDepartmentsQuery,
	useGetDepartmentByIdQuery,
	useCreateDepartmentMutation,
	useUpdateDepartmentMutation,
	useDeleteDepartmentMutation,
	useAddRoleToDepartmentMutation,
	useUpdateRoleInDepartmentMutation,
	useDeleteRoleFromDepartmentMutation,
	useGetAllPermissionsQuery,
} = departmentApi;

export default departmentApi;
