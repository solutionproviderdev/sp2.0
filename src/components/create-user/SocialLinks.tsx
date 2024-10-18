import React from 'react';
import { Grid, Typography, InputAdornment } from '@mui/material';
import CustomTextField from '../UI/inputs/CustomTextField';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface SocialLinksProps {
	formData: any;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
	formData,
	handleChange,
}) => (
	<div>
		<Typography variant="body1" gutterBottom mt={4}>
			Social Links
		</Typography>
		<Grid container spacing={2}>
			{/* Facebook Input with Icon */}
			<CustomTextField
				label="Facebook"
				name="socialLinks.facebook"
				value={formData?.socialLinks?.facebook}
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<FacebookIcon color="primary" />
						</InputAdornment>
					),
				}}
			/>
			{/* Instagram Input with Icon */}
			<CustomTextField
				label="Instagram"
				name="socialLinks.instagram"
				value={formData?.socialLinks?.instagram}
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<InstagramIcon color="secondary" />
						</InputAdornment>
					),
				}}
			/>
			{/* WhatsApp Input with Icon */}
			<CustomTextField
				label="WhatsApp"
				name="socialLinks.whatsapp"
				value={formData?.socialLinks?.whatsapp}
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<WhatsAppIcon sx={{ color: '#25D366' }} />
						</InputAdornment>
					),
				}}
			/>
		</Grid>
	</div>
);

export default SocialLinks;
