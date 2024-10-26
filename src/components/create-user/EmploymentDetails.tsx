import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import CustomSelect from '../UI/inputs/CustomSelect';
import CustomTextField from '../UI/inputs/CustomTextField';
import { useGetAllDepartmentsQuery } from '../../features/auth/department/departmentAPI';

interface EmploymentDetailsProps {
	formData: any;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleDepartmentChange: (
		event: React.ChangeEvent<{ value: unknown }>
	) => void;
	handleRoleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const EmploymentDetails: React.FC<EmploymentDetailsProps> = ({
	formData,
	handleChange,
	handleDepartmentChange,
	handleRoleChange,
}) => {
	const { data: departmentsData, isLoading: departmentsLoading } =
		useGetAllDepartmentsQuery();
	const [availableRoles, setAvailableRoles] = useState([]);

	console.log('Form Data:', formData);
	console.log('Departments Data:', departmentsData);
	console.log('Available Roles:', availableRoles);

	// Update roles when the department changes
	useEffect(() => {
		if (formData.departmentId && departmentsData) {
			const selectedDepartment = departmentsData?.find(
				(dept: any) => dept._id === formData.departmentId // Checking if the department matches by ID
			);
			if (selectedDepartment) {
				setAvailableRoles(selectedDepartment.roles); // Set the available roles for the selected department
			}
		}
	}, [departmentsData, formData.departmentId]);

	return (
		<div>
			<Typography variant="body1" gutterBottom mt={4}>
				Employment Details
			</Typography>
			<Grid container spacing={2}>
				{/* Department Select */}
				{departmentsData && (
					<CustomSelect
						label="Department"
						name="departmentId"
						value={formData.department} // Set value as the department ID
						onChange={handleDepartmentChange} // Handle change to set department ID
						required
						disabled={departmentsLoading}
						options={departmentsData?.map((dept: any) => ({
							value: dept._id, // Use _id as value
							label: dept.departmentName, // Display department name
						}))}
					/>
				)}

				{/* Role Select */}
				<CustomSelect
					label="Role"
					name="roleId"
					value={formData.role} // Set value as the role ID
					onChange={handleRoleChange} // Handle change to set role ID
					required
					disabled={!availableRoles.length}
					options={availableRoles.map((role: any) => ({
						value: role._id, // Use _id as value
						label: role.roleName, // Display role name
					}))}
				/>

				{/* Current Salary */}
				<CustomTextField
					label="Current Salary"
					name="currentSalary"
					value={formData.currentSalary}
					onChange={handleChange}
				/>

				{/* Working Procedure */}
				<CustomTextField
					label="Working Procedure"
					name="workingProcedure"
					value={formData.workingProcedure}
					onChange={handleChange}
					multiline
				/>
			</Grid>
		</div>
	);
};

export default EmploymentDetails;
