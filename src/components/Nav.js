import React from 'react';
import { NavLink} from 'react-router-dom';



const Nav = () => (
    <ul>
        <li><NavLink exact to="/" activeStyle={{
                fontWeight: "bold",
                color: "#ff3333"
        }}>Home</NavLink></li>

            
        <li><NavLink exact to="/about" activeStyle={{
                fontWeight: "bold",
                color: "#ff3333"
        }}>About</NavLink></li>

        <li><NavLink exact to="/searchpage" activeStyle={{
                fontWeight: "bold",
                color: "#ff3333"
        }}>Search</NavLink></li>

            
        <li><NavLink exact to="/watchlater" activeStyle={{
                fontWeight: "bold",
                color: "#ff3333"
        }}>Watch Later</NavLink></li>

    </ul>
);

export default Nav;