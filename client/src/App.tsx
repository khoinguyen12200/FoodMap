import React from "react";
import { Provider } from "react-redux";
import store, { useAppSelector } from "./redux";

import logo from "./logo.svg";
import "./App.scss";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

import MyMapComponent from "./components/Map";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PageWrapper from "./PageWrapper";
import Login from "./pages/Login";
import Register from "./pages/Register";

function WrapperApp() {
    return (
        <Router>
            <ApolloProvider client={apolloClient}>
                <Provider store={store}>
                    <ToastContainer />
                    <App />
                </Provider>
            </ApolloProvider>
        </Router>
    );
}

function App() {
    const theme = useAppSelector((state) => state.theme);
    return (
        <div className={`App theme_${theme.color}`}>
            <Header />
            <div className="AppBody">
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
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default WrapperApp;
