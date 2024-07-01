import React from "react";

export const protectedRoutes = [
  {
    key: "dashboard",
    path: "/dashboard",
    component: React.lazy(() => import("../components/views/Home.jsx")),
    loaded: true,
    layout: "protected",
  },
  {
    key: "album",
    path: "/album",
    component: React.lazy(() => import("../components/views/Album.jsx")),
    loaded: true,
    layout: "protected",
  },

  {
    key: "upload",
    path: "/upload",
    component: React.lazy(() =>
      import("../components/UploadForm/UploadForm.jsx")
    ),
    loaded: true,
    layout: "protected",
  },
  {
    key: "bottombar",
    path: "/bottombar",
    component: React.lazy(() => import("../components/BottomBar.jsx")),
    loaded: true,
    layout: "protected",
  },
  {
    key: "liked",
    path: "/liked",
    component: React.lazy(() => import("../components/views/Liked.jsx")),
    loaded: true,
    layout: "protected",
  },
  {
    key: "playlists",
    path: "/playlists",
    component: React.lazy(() => import("../components/views/Playlist.jsx")),
    loaded: true,
    layout: "protected",
  },

  {
    key: "createplaylist",
    path: "/createplaylist",
    component: React.lazy(() =>
      import("../components/views/CreatePlaylist.jsx")
    ),
    layout: "protected",
  },
  {
    key: "artists",
    path: "/artists",
    component: React.lazy(() => import("../components/views/Artists.jsx")),
    layout: "protected",
  },
  {
    key: "profile",
    path: "/profile",
    component: React.lazy(() =>
      import("../components/Splash/SplashNavigation/ProfileButton.jsx")
    ),
    layout: "protected",
  },
  {
    key: "edit-profile",
    path: "/edit-profile",
    component: React.lazy(() =>
      import("../components/Splash/SplashNavigation/EditProfile.jsx")
    ),
    layout: "protected",
  },
  {
    key: "logout",
    path: "/logout",
    component: React.lazy(() => import("../components/views/Logout.jsx")),
    layout: "protected",
  },
];
