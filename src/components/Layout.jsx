import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';

import Chatbot from './Chatbot';

const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="antialiased min-h-screen flex flex-col overflow-x-hidden bg-background relative">
      {/* Global Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      {!isAdmin && <Footer />}
      <BackToTop />
      <Chatbot />
    </div>
  );
};

export default Layout;
