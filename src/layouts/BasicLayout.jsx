import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const BasicLayout = () => {
	return (
		<>
			<header className='sticky top-0 z-50 w-full bg-gray-200/95 backdrop-blur supports-[backdrop-filter]:bg-gray-200/60 border-b'>
				<Navbar />
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default BasicLayout;
