import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Aos from "aos";
import { useEffect } from "react";

const HomeLayout = () => {
	const { state } = useNavigation();
	useEffect(() => {
		Aos.init({ duration: 600, once: true });
	}, []);
	return (
		<>
			<header className='sticky top-0 z-50 w-full bg-base-200/95 backdrop-blur supports-[backdrop-filter]:bg-base-200/60 border-b border-accent'>
				<Navbar />
			</header>
			<main>{state === "loading" ? <Loader /> : <Outlet />}</main>
		</>
	);
};

export default HomeLayout;
