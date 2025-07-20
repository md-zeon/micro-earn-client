import { Outlet } from "react-router";
import useRole from "../hooks/useRole";
import DashboardSidebar from "../pages/Dashboard/Common/DashboardSidebar";
import DashboardFooter from "../pages/Dashboard/Common/DashboardFooter";
import DashboardNavbar from "../pages/Dashboard/Common/DashboardNavbar";
import { useState } from "react";
import Container from "../components/Container";

const DashboardLayout = () => {
	const { role, isRoleLoading } = useRole();
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	if (isRoleLoading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<span className='loading loading-spinner loading-lg'></span>
			</div>
		);
	}

	return (
		<Container>
			<div className='flex flex-col min-h-screen'>
				{/* Header */}
				<header className='flex justify-between items-center p-4 bg-base-200 shadow sticky top-0 z-50'>
					<DashboardNavbar
						role={role}
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
					/>
				</header>

				{/* Main content area: Sidebar + Content */}
				<div className='flex flex-1 overflow-hidden'>
					<DashboardSidebar
						role={role}
						isSidebarOpen={isSidebarOpen}
					/>

					<main className='flex-1 overflow-auto p-6 bg-base-100'>
						<Outlet />
					</main>
				</div>

				{/* Footer */}
				<DashboardFooter />
			</div>
		</Container>
	);
};

export default DashboardLayout;
