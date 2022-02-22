import React from 'react'
import { NavLink } from 'react-router-dom'
import Order from '../Order/Order.jsx';
import SearchBar from "../SearchBar/SearchBar.jsx";

export default function Nav() {
    return (
        <nav>
            <ul>
                <div>
                <NavLink to="/home">
                    <span>HOME</span>
                </NavLink>
                </div>
                <div>
                    <NavLink to="/create">
                        <span>CREATE</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/about">
                        <span>ABOUT</span>
                    </NavLink>
                </div>
                <div>
                    <SearchBar/>
                    <Order/>
                </div>
            </ul>
        </nav>
    )
}
