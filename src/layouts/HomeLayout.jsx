import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import ScrollToTopButton from "../components/effects/ScrollToTopButton";

const HomeLayout = () => {
  const navigation = useNavigation();
  const state = navigation?.state;

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-[calc(100vh-23rem)]">
        {state === "loading" ? (
          <Loader />
        ) : (
          <PageTransition>
            <Outlet />
          </PageTransition>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
      <ScrollToTopButton />
    </>
  );
};

export default HomeLayout;
