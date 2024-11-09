import React from 'react';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';
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
import CreateMeeting from './pages/CreateMeeting';
 
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

						{/* meeting page */}
						<Route path="meetings" element={<Meetings />} />
						<Route path="meeting-slot" element={<MeetingsSlot />} />
						<Route path="meeting-create" element={<CreateMeeting />} />
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
			<RouterProvider router={router} />
		</Provider>
	);
};

export default App;
