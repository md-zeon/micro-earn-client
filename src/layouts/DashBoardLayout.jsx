import { Outlet, useNavigation } from "react-router";
import useRole from "../hooks/useRole";
import DashboardSidebar from "../pages/Dashboard/Common/DashboardSidebar";
import DashboardFooter from "../pages/Dashboard/Common/DashboardFooter";
import DashboardNavbar from "../pages/Dashboard/Common/DashboardNavbar";
import { useState } from "react";
import Container from "../components/Container";
import Loader from "../components/Loader";

const DashboardLayout = () => {
	const { state } = useNavigation();
	const { role, isRoleLoading } = useRole();
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	if (isRoleLoading) {
		return <Loader />;
	}

	return (
		<Container>
			<div className='flex flex-col'>
				{/* Header */}
				<header className='flex justify-between items-center px-2 py-4 sm:p-4 bg-base-200 rounded-xl shadow sticky top-0 z-50'>
					<DashboardNavbar
						role={role}
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
					/>
				</header>

				{/* Main content area: Sidebar + Content */}
				<div className='flex flex-1 h-[calc(100vh-72px)]'>
					<DashboardSidebar
						role={role}
						isSidebarOpen={isSidebarOpen}
						isRoleLoading={isRoleLoading}
					/>
					<main className='flex-1 overflow-y-auto bg-base-100 flex flex-col'>
						{/* Content */}
						<div className='flex-1 p-6'>{state === "loading" ? <Loader /> : <Outlet />}</div>
						{/* Footer */}
						<DashboardFooter />
					</main>
				</div>
			</div>
			{/* Sidebar Overlay */}
			{isSidebarOpen && (
				<div
					className='fixed inset-0 z-30 bg-base-100/80 backdrop-blur-sm lg:hidden'
					onClick={() => setIsSidebarOpen(false)}
				></div>
			)}
		</Container>
	);
};

export default DashboardLayout;
