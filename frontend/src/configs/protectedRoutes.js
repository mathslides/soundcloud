import React from "react";

export const protectedRoutes = [
    {
        key: "dashboard",
        path: "/dashboard",
        component: React.lazy(() => import("../components/views/Home.js")),
        loaded: true,
        layout: "protected"

    },
    {
        key: "album",
        path: "/album",
        component: React.lazy(() => import("../components/views/Album.js")),
        loaded: true,
        layout: "protected"

    },

    {
        key: "upload",
        path: "/upload",
        component: React.lazy(() => import("../components/UploadForm/UploadForm.js")),
        loaded: true,
        layout: "protected"

    },
    {
        key: "bottombar",
        path: "/bottombar",
        component: React.lazy(() => import("../components/BottomBar.js")),
        loaded: true,
        layout: "protected"

    },
    {
        key: "liked",
        path: "/liked",
        component: React.lazy(() => import("../components/views/Liked.js")),
        loaded: true,
        layout: "protected"

    },
    {
        key: "playlists",
        path: "/playlists",
        component: React.lazy(() => import("../components/views/Playlist.js")),
        loaded: true,
        layout: "protected"

    },

    {
        key: "createplaylist",
        path: "/createplaylist",
        component: React.lazy(() => import("../components/views/CreatePlaylist.js")),
        layout: "protected"

    },
    {
        key: "artists",
        path: "/artists",
        component: React.lazy(() => import("../components/views/Artists.js")),
        layout: "protected"
    },
    {
        key: "profile",
        path: "/profile",
        component: React.lazy(() => import("../components/Splash/SplashNavigation/ProfileButton.js")),
        layout: "protected"
    },
    {
        key: "logout",
        path: "/logout",
        component: React.lazy(() => import("../components/views/Logout.js")),
        layout: "protected"
    },
];
