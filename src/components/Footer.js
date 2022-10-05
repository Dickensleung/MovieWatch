import React from 'react';
import logoPath from '../images/movie_logo.png';
import tmdblogo from '../images/tmdb_logo.png'
import Nav from '../components/Nav';

const Footer = () =>{

    return(
        <footer>
            <section className='footer-nav'>
                <Nav />
            </section>

            <section className="footer-text">
                <p>&copy; 2022 Movie Watch All Rights Reserved.</p>
                <p>Developed by Dickens Leung.</p>
            </section>

            <div className="footer-logo">
                <div className='movie-watch-logo'>       
                    <img src={logoPath} alt="movie-watch-logo-icon" />
                </div>
                
                <a href='https://developers.themoviedb.org/3/getting-started/introduction'>
                    <div className='tmdb-logo'>
                        <img src={tmdblogo} id='img-padding' alt="TMDB-logo"/>
                    </div>
                </a>                   
            </div>

        </footer>
    )
}
export default Footer;