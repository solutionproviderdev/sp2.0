import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomFileUpload from '../UI/inputs/CustomFileUpload';

interface DocumentsSectionProps {
	formData: any;
	handleFileChange: (name: string, fileUrl: string) => void;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
	formData,
	handleFileChange,
}) => (
	<div>
		<Typography variant="body1" gutterBottom mt={4}>
			Documents
		</Typography>
		<Grid container spacing={2}>
			<CustomFileUpload
				label="Resume"
				name="documents.resume"
				value={formData?.documents?.resume}
				onChange={handleFileChange} // Call file change handler from parent
			/>
			<CustomFileUpload
				label="NID Copy"
				name="documents.nidCopy"
				value={formData?.documents?.nidCopy}
				onChange={handleFileChange}
			/>
			<CustomFileUpload
				label="Academic Document"
				name="documents.academicDocument"
				value={formData?.documents?.academicDocument}
				onChange={handleFileChange}
			/>
			<CustomFileUpload
				label="Bank Account Number"
				name="documents.bankAccountNumber"
				value={formData?.documents?.bankAccountNumber}
				onChange={handleFileChange}
			/>
			<CustomFileUpload
				label="Agreement"
				name="documents.agreement"
				value={formData?.documents?.agreement}
				onChange={handleFileChange}
			/>
		</Grid>
	</div>
);

export default DocumentsSection;
