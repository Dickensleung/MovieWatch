import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from '../components/Nav';
import logoPath from '../images/movie_logo.png';


const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const node = useRef();
	const navNode = useRef();

	useEffect(() => {
		window.scrollTo(0, 0);
		// add when mounted
			document.addEventListener("mousedown", handleEvent);
		// return function to be called when unmounted
		return () => {
			document.removeEventListener("mousedown", handleEvent);
		};
	}, []);


	const handleEvent = (e) => {
		if (node.current.contains(e.target)) {
			// inside click
			return;
		}
		// outside click 
		setIsMenuOpen(false);
	}

	return (	
			<header ref={node}>
				<div className='navbar' ref={navNode}>
					<NavLink exact to="/" className="logo">
						<img src={logoPath} alt="logo-icon" />
					</NavLink>

					<div id="btn-menu">
						<ul className='btn-menu-left'>
							<NavLink exact to="/">	
								<li className='desk-menu'>
									<button id="movie-watch-home"></button>
									<h2>Home</h2>
								</li>
							</NavLink>	
							<NavLink exact to="/searchpage" id="search-icon">
								<li className='desk-menu'>
									<svg id="movie-watch-search" className="svg-icon" viewBox="0 0 20 20">
										<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
									</svg>
									
									<h2>Search</h2>
								</li>
							</NavLink>
							<NavLink exact to="/watchlater">
								<li className='desk-menu'>
									<button id="movie-watch-watchlist"></button>
									<h2>Watchlist</h2>	
								</li>
							</NavLink>
						</ul>

						<ul className='btn-menu-right'>
							<NavLink exact to="/about">
								<li className='desk-menu'>
									<div className="icons8-about"></div>	
								</li>
							</NavLink>

							{/**MENU ICON ONLY**/}
							<li className={isMenuOpen? 'active' : ''}onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
								<div className='menu-bar1'></div>
								<div className='menu-bar2'></div>
								<div className='menu-bar3'></div>
							</li>
						</ul>
					</div>
									
					<nav className={isMenuOpen ? 'show' : 'menu-close'} onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
						<Nav />
					</nav>
				</div>
			</header>		
		
	);
}

export default Header;