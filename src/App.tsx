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
						<Route path="lead-center" element={<LeadCenter />}>
							<Route path=":leadId" element={<Inbox />} />
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
			<RouterProvider router={router} />
		</Provider>
	);
};

export default App;
