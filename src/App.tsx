import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import RootLayout from './layouts/RootLayout';
import LoggedOutRoute from './layouts/LoggedOutRoute';
import LoggedInRoute from './layouts/LoggedInRoute';
import AdminLayout from './layouts/AdminLayout';
import OperatorLayout from './layouts/OperatorLayout';
import store from './app/store';
import LoginLayout from './layouts/LoginLayout';
import Login from './pages/authentication/Login';
import Dashboard from './pages/Dashboard';
import LeadCenter from './pages/LeadCenter';
import Inbox from './components/leadCenter/Inbox/Inbox';
import LeadManagement from './pages/LeadManagement';
import FollowUpList from './pages/FollowUpList';
import FollowUp from './pages/FollowUp';
import UsersLayout from './layouts/UsersLayout';
import CreateUserForm from './pages/CreateUserForm';
import UserManagement from './pages/authentication/UserManagement';
import UserProfile from './pages/authentication/UserProfile';
import DepartmentManagement from './pages/authentication/DepartmentManagement';
import RoleManagement from './pages/authentication/RoleManagement';
import AddRole from './pages/authentication/AddRole';
import Meetings from './pages/Meeting';
import MeetingsSlot from './pages/MeetingsSlot';
import SettingsLayout from './layouts/SettingsLayout';
import ProfileSettings from './pages/settings/ProfileSettings';
import LeadSettings from './pages/settings/LeadSettings';
import FacebookSettings from './pages/settings/FacebookSettings';

// 🌐 Custom MUI Theme
const theme = createTheme({
	palette: {
		primary: {
			main: '#046288', // Primary color
		},
		secondary: {
			main: '#F5F5F5',
		},
		background: {
			default: '#F9FAFB',
			paper: '#FFFFFF',
		},
		text: {
			primary: '#333333',
			secondary: '#555555',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					textTransform: 'none',
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& label.Mui-focused': {
						color: '#046288',
					},
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: '#046288',
						},
						'&:hover fieldset': {
							borderColor: '#046288',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#046288',
						},
					},
				},
			},
		},
	},
});

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<RootLayout />}>
				{/* Logged out routes */}
				<Route path="/" element={<LoggedOutRoute />}>
					<Route path="authentication" element={<LoginLayout />}>
						<Route path="login" element={<Login />} />
					</Route>
				</Route>

				{/* Admin Routes */}
				<Route path="/" element={<LoggedInRoute />}>
					<Route path="admin" element={<AdminLayout />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="users" element={<UsersLayout />}>
							<Route path="all-users" element={<UserManagement />} />
							<Route path=":userId" element={<UserProfile />} />
							<Route path="create-user" element={<CreateUserForm />} />
							<Route path="departments" element={<DepartmentManagement />} />
							<Route path="roles" element={<RoleManagement />} />
							<Route path="create-role" element={<AddRole />} />
						</Route>

						<Route path="lead-management" element={<LeadManagement />} />
						<Route path="lead-followUp" element={<FollowUpList />}>
							<Route path=":leadId" element={<FollowUp />} />
						</Route>
						<Route path="lead-center" element={<LeadCenter />}>
							<Route path=":leadId" element={<Inbox />} />
						</Route>

						{/* Meeting Routes */}
						<Route path="meetings" element={<Meetings />} />
						<Route path="meeting-slot" element={<MeetingsSlot />} />

						{/* Settings Routes */}
						<Route path="settings" element={<SettingsLayout />}>
							<Route path="profile" element={<ProfileSettings />} />
							<Route path="lead-settings" element={<LeadSettings />} />
							<Route path="facebook" element={<FacebookSettings />} />
						</Route>
					</Route>

					{/* Operator Routes */}
					<Route path="operator" element={<OperatorLayout />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="lead-center" element={<LeadCenter />} />
					</Route>
				</Route>
			</Route>
		)
	);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline /> {/* Provides consistent styling across browsers */}
				<RouterProvider router={router} />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
