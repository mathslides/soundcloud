

import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { publicRoutes } from "../configs/publicRoutes";
import { protectedRoutes } from "../configs/protectedRoutes";
import ProtectedLayout from "../layouts/ProtectedLayout";
import LoaderSpinner from "./Spinner";
// import ProtectedLayout from "./ProtectedLayout";

function Views() {

    const isAuthenticated = useSelector((state) => !!state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Router>
            <Switch>
                {publicRoutes.map(({ key, path, component: Component }) => (
                    <Route key={key} exact path={path}>
                        <Suspense fallback={<LoaderSpinner />}>
                            <Component />
                        </Suspense>
                    </Route>
                ))}
                {protectedRoutes.map(({ key, path, component: Component }) => (
                    <Route key={key} exact path={path}>
                        <Suspense fallback={<LoaderSpinner />}>
                            {isAuthenticated ? (
                                <ProtectedLayout ProtectedLayout >
                                    <Component isLoaded={isLoaded} />
                                </ProtectedLayout>
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Suspense>
                    </Route>
                ))}
                <Redirect to="/" />
            </Switch>
        </Router >
    );
}

export default Views;

