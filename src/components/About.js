import React from 'react';
import logo from '../images/movie_logo.png'
import tmdblogo from '../images/tmdb_logo.png'

const About = () => (
	<main>
		<div className="about about-wrapper">
			<section className="about-project">
				
				<h2 className='about-title'>Welcome to Movie-Watch!</h2>
				<p>Browse for movies by title or related genres, watch trailers and related videos, and save it to the Watch Later list!</p>

				<p>Movie Watch is a Movie Database App that is listing the movies based on popularity, rating, and release date.</p>

				<p classname='about-text'> 'Storage Maker' source is from the BCIT's React Weather app.</p>
					
					
				<h2 className='about-sub-title'>This site API data getting from <b><a href="https://www.themoviedb.org/about" alt="external-link-to-tmdb-api">TMDB movie website.</a></b></h2>
				
				<div className='heading'>
					
					<div classname='movie-watch-logo'>
						<img src={logo} alt="movie-watch-logo" />
					</div>
					
					<a href='https://developers.themoviedb.org/3/getting-started/introduction'>
						<div classname='tmdb-logo'>
							<img src={tmdblogo} alt="TMDB-logo"/>
						</div>
					</a>
				</div>

				<p className='about-text'>Developer: Dickens Leung. This site is created for education purpose.</p>
				
			
				
			</section>
		</div>
	</main>
);

export default About;