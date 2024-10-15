import apiSlice from '../../api/apiSlice';

// Interfaces for Department and Role
interface Permission {
	resource: string;
	action: string;
}

interface Role {
	_id: string;
	roleName: string;
	description?: string;
	permissions: Permission[];
}

interface Department {
	_id: string;
	departmentName: string;
	description?: string;
	roles: Role[];
}

// Responses
interface GetAllDepartmentsResponse {
	departments: Department[];
}

interface GetDepartmentByIdResponse {
	department: Department;
}

interface CreateDepartmentRequest {
	departmentName: string;
	description?: string;
	roles: Role[];
}

interface CreateDepartmentResponse {
	department: Department;
}

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

		// Create a new department
		createDepartment: builder.mutation<
			CreateDepartmentResponse,
			CreateDepartmentRequest
		>({
			query: department => ({
				url: '/users/departments',
				method: 'POST',
				body: department,
			}),
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

		// Add a role to a department
		addRoleToDepartment: builder.mutation<
			Department,
			{ departmentId: string; role: AddRoleRequest }
		>({
			query: ({ departmentId, role }) => ({
				url: `/users/departments/${departmentId}/roles`,
				method: 'POST',
				body: role,
			}),
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
} = departmentApi;

export default departmentApi;
