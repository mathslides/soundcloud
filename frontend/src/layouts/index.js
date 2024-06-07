import React, { Suspense, lazy, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { protectedRoutes } from '../configs/protectedRoutes';
import { publicRoutes } from '../configs/publicRoutes';
import LoaderSpinner from '../components/Spinner';
const Layout = () => {
  const layouts = {
    'protected': lazy(() => import("./ProtectedLayout")),
    'public': lazy(() => import("./PublicLayout")),
  };

  const location = useLocation();
  const history = useHistory();
  const authenticated = useSelector((state) => !!state.session.user);
  const state = useSelector((state) => state);

  useEffect(() => {
  }, [location.pathname]);

  const AppLayout = useMemo(() => {
    const routes = [
      ...protectedRoutes,
      ...publicRoutes
    ];
    for (const row of routes) {
      if (location.pathname === row.path) {
        return layouts[row.layout];
      }
    }

    return layouts.public;
  }, [window.location.pathname, authenticated]);

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <AppLayout />
    </Suspense>
  );
};

export default Layout;




