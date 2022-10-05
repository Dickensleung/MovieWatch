import React from 'react';
import {NavLink} from 'react-router-dom';
import ParseDate from '../utilities/ParseDate';
import AddBookMark from '../components/AddBookMark';

//This page controls the making of movie posters. 

const movies = (md) =>{

    return md.map((movie, i) =>{
        return(
            <li key={i} className={`movie-info movie-${i + 1}`}>{/* Controls BGC for movie poster*/}

                <div className="movie-poster-wrap">{/* Movie Poster - Start*/}
                    <AddBookMark movie={movie} />
                    <figure>
                    <NavLink to={`/movie/${movie.id}`}><img class="image" src={movie.poster} alt={movie.poster} /></NavLink>
                    </figure>
                </div>
                
                <div className="movie-text">{/* Movie Excerpt - Start */}
                    <h2><NavLink to={`/movie/${movie.id}`}>{movie.title}</NavLink></h2>
                    
                    <div className="rating">{/* Ratings - Start */}
                        <div className="rating-number">
                            <p className={`${movie.rate === 0}`}></p>
                        </div>
                        
                    </div>

                    <div className="release-date">
                        <p>{ParseDate(movie.date)}</p>
                    </div>

                    <div className="movie-summary">
                        <p>{movie.excerpt}</p>
                        <NavLink to={`/movie/${movie.id}`}><button class="more-info">More Info</button></NavLink> 
                    </div>

                </div>
            </li>
            
        )
    })
}
const MovieGrid = (props) => (
    <ul className="movie-list">
        {movies(props.movieData)}
    </ul>
);
export default MovieGrid;