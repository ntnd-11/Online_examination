import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { privateUrl, publicUrl } from './constants';
import PrivateRoute from '../components/PrivateRoute';

function Router() {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    {publicUrl.map((p, index) => {
                        const Element = p.element;
                        const Layout = p.layout;
                        return (
                            <Route
                                key={index}
                                path={p.path}
                                element={
                                    <Layout>
                                        <Element />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    <Route element={<PrivateRoute />}>
                        {privateUrl.map((p, index) => {
                            const Element = p.element;
                            const Layout = p.layout;
                            return (
                                <Route
                                    key={index}
                                    path={p.path}
                                    element={
                                        <Layout>
                                            <Element />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default Router;
