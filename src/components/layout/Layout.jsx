import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';

function Layout() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;