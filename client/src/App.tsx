import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store, { useAppSelector } from "./redux";

import logo from "./logo.svg";
import "./App.scss";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    Navigate,
    useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from "@apollo/client";
import apolloClient from "./Apollo";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PageWrapper from "./PageWrapper";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyApolloProvider from "./Apollo";
import Account from "./pages/Account";

import { AnimatePresence, motion } from "framer-motion";
import Map from "./pages/Map";
import Restaurant from "./pages/Restaurant";
import RestaurantCreatePage from "./pages/Restaurant/CreatePage";
import ManageRestaurantPage from "./pages/Restaurant/Manage";
import EditRestaurantPage from "./pages/Restaurant/EditPage";
import { useJsApiLoader } from "@react-google-maps/api";
import Visit from "./pages/Visit";

function WrapperApp() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_TOKEN || "",
    });
    if (!isLoaded) {
        return null;
    }
    return (
        <Router>
            <ReduxProvider store={store}>
                <MyApolloProvider>
                    <ToastContainer />
                    <App />
                </MyApolloProvider>
            </ReduxProvider>
        </Router>
    );
}

function App() {
    const location = useLocation();
    const theme = useAppSelector((state) => state.theme);
    return (
        <div className={`App theme_${theme.color}`}>
            <Header />
            <div className="AppBody">
                <AnimatePresence exitBeforeEnter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <PageWrapper>
                                    <Home />
                                </PageWrapper>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PageWrapper isEmpty={true}>
                                    <Login />
                                </PageWrapper>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PageWrapper isEmpty={true}>
                                    <Register />
                                </PageWrapper>
                            }
                        />

                        <Route
                            path="/map"
                            element={
                                <PageWrapper isEmpty={false}>
                                    <Map />
                                </PageWrapper>
                            }
                        />

                        <Route
                            path="/visit/restaurant/:restaurantId"
                            element={
                                <PageWrapper>
                                    <Visit />
                                </PageWrapper>
                            }
                        />
                        <Route path="/" element={<PrivateRoutes />}>
                            <Route
                                path="account"
                                element={
                                    <PageWrapper>
                                        <Account />
                                    </PageWrapper>
                                }
                            />
                            <Route
                                path="my-restaurant"
                                element={
                                    <PageWrapper>
                                        <Restaurant />
                                    </PageWrapper>
                                }
                            />
                            <Route
                                path="my-restaurant/create"
                                element={
                                    <PageWrapper>
                                        <RestaurantCreatePage />
                                    </PageWrapper>
                                }
                            />

                            <Route
                                path="my-restaurant/manage/:id"
                                element={
                                    <PageWrapper>
                                        <ManageRestaurantPage />
                                    </PageWrapper>
                                }
                            />
                            <Route
                                path="my-restaurant/edit/:id"
                                element={
                                    <PageWrapper>
                                        <EditRestaurantPage />
                                    </PageWrapper>
                                }
                            />
                        </Route>
                    </Routes>
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
}

function PrivateRoutes() {
    const user = useAppSelector((state) => state.myAccount.user);
    return user ? <Outlet /> : <Navigate to="/" />;
}

export default WrapperApp;
