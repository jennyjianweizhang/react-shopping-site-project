import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom';
import router from '../route'
import NavbarComponent from '../components/NavBar';
import FooterComponent from '../components/Footer';

export default function Layout() {
    const element = useRoutes(router)
    return (
        <div>
            <NavbarComponent />
            {/* Integrate this part with Navbar Component */}
            {/* <NavLink to="/home" >Home</NavLink>
            <NavLink to="/shop" >Shop</NavLink>
            <NavLink to="/featured" >Featured</NavLink>
            <NavLink to="/recommended" >Recommended</NavLink> */}
            {element}
            <FooterComponent />
        </div>
    )
}
