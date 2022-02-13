import React from "react";
import { Provider } from "react-redux";
import store, { useAppSelector } from "./redux";

import logo from "./logo.svg";
import "./App.scss";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MyMapComponent from "./components/Map";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PageWrapper from "./PageWrapper";
import Login from "./pages/Login";

function WrapperApp() {
    return (
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
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
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default WrapperApp;
