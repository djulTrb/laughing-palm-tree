import React, { useEffect, useLayoutEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroller from './components/SmoothScroller';
import RouteLoader from './components/ui/RouteLoader';
import LoadingState from './components/ui/LoadingState';
import PageTransition from './components/ui/PageTransition';

import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoaderProvider } from './contexts/LoaderContext';
import { routeComponents } from './utils/routePreloader';

const Home = React.lazy(routeComponents.Home);
const Events = React.lazy(routeComponents.Events);
const Gallery = React.lazy(routeComponents.Gallery);
const Resources = React.lazy(routeComponents.Resources);
const Contact = React.lazy(routeComponents.Contact);
const Recruitment = React.lazy(routeComponents.Recruitment);
const Admin = React.lazy(routeComponents.Admin);
const AddMember = React.lazy(routeComponents.AddMember);
const AdminAuth = React.lazy(routeComponents.AdminAuth);
const EventDetails = React.lazy(routeComponents.EventDetails);
const NotFound = React.lazy(routeComponents.NotFound);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

const ProtectedAdminRoute = ({ children }) => {
  // Authentication check is now handled directly inside the Admin component
  // via a secure API call to /api/accounts/me/ instead of localStorage.
  return children;
};

const SuspenseFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background">
    <LoadingState variant="Dots" showPercentage={false} />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <LoaderProvider>
          <Router>
              <SmoothScroller />
              <RouteLoader />
            <ScrollToTop />
            
              <PageTransition>
              <Suspense fallback={<SuspenseFallback />}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="events" element={<Events />} />
                    <Route path="events/:id" element={<EventDetails />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="recruitment" element={<Recruitment />} />
                    <Route path="admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
                    <Route path="admin/add-member" element={<ProtectedAdminRoute><AddMember /></ProtectedAdminRoute>} />
                    <Route path="admin-auth" element={<AdminAuth />} />
                  </Route>
                  {/* 404 Catch-all Outside Layout */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
            
          </Router>
        </LoaderProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
