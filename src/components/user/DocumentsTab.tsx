import React from 'react';
import { Box, Typography } from '@mui/material';

interface DocumentsTabProps {
	user: any;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ user }) => {
	return (
		<Box p={3}>
			<Typography variant="h6">Documents</Typography>
			<Typography>
				Resume: <a href={user.documents.resume}>View</a>
			</Typography>
			<Typography>
				NID Copy: <a href={user.documents.nidCopy}>View</a>
			</Typography>
			<Typography>
				Academic Document: <a href={user.documents.academicDocument}>View</a>
			</Typography>
			<Typography>
				Agreement: <a href={user.documents.agreement}>View</a>
			</Typography>
			{/* Add more document fields if available */}
		</Box>
	);
};

export default DocumentsTab;
