import React, { useState } from "react";

import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => setDrawerIsOpen(true);

    const closeDrawerHandler = () => setDrawerIsOpen(false);

    return (
        <React.Fragment>
            { drawerIsOpen && (
                <Backdrop onClick={ closeDrawerHandler } />
            ) }
            <SideDrawer show={ drawerIsOpen } >
                <nav className="main-navigation__drawer-nav">
                    <NavLinks onClick={ closeDrawerHandler } />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={ openDrawerHandler }>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Places App</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;