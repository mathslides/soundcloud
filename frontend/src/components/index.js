import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicRoutes } from "../configs/publicRoutes";
import { protectedRoutes } from "../configs/protectedRoutes";

function Views() {
    const isAuthenticated = useSelector((state) => !!state.session.user);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Router  >
            <Suspense fallback={<h1 className='fixed top-0 bottom-0 left-0 right-0 mx-auto h-full text-white'>Loading...</h1>}>
                <Switch>
                    {publicRoutes.map(({ key, path, component: Component }) => (
                        <Route key={key} exact path={path}>
                            <Component isLoaded={isLoaded} />
                        </Route>
                    ))}

                    {protectedRoutes.map(({ key, path, component: Component }) => (
                        <Route key={key} exact path={path}>
                            {isAuthenticated ? <Component isLoaded={isLoaded} /> : <Redirect to="/" />}
                        </Route>
                    ))}
                    <Redirect to="/" />
                </Switch>
            </Suspense>
        </Router >
    );
}

export default Views;
