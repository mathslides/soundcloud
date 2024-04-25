import React, { Suspense, lazy, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Layout = () => {
  const layouts = {
    'protected': lazy(() => import("./ProtectedLayout")),
    'public': lazy(() => import("./PublicLayout")),

  };

  const location = useLocation();
  const authenticated = useSelector((state) => !!state.session.user);
  const state = useSelector((state) => state);

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return layouts['protected'];
    }

    return layouts['public'];
  }, [authenticated, location.pathname]);

  return (
    <Suspense fallback={<h1 className='fixed top-0 bottom-0 left-0 right-0 mx-auto h-full text-white'>Loading...</h1>}>
      <AppLayout />
    </Suspense>
  )
}

export default Layout




// const routes = [
//   ...protectedRoutes,
//   ...publicRoutes
// ]

// for (const row of routes) {
//   if (location.pathname === row.path) {
//     return layouts[row.layout]
//   }
// }