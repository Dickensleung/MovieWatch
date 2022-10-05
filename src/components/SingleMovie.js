import React, {useState, useEffect} from 'react';
import { useParams, Redirect, NavLink} from 'react-router-dom';
import movieMaker from '../utilities/movieMaker';
import { BASE_URL, API_KEY_ONLY } from '../globals/variable';
import CastSlider from '../components/CastsSlider';
import ParseDate from '../utilities/ParseDate';
import Flickity from "react-flickity-component";
import WatchProviders from './WatchProviders';
import Youtube from 'react-youtube';
import AddBookMark from './AddBookMark';
import PageNotFound from './PageNotFound';
import StarsRating from './StarsRating';
import {flickityOptionsRecommendations, moreTrailerFlickityOptions} from '../utilities/Flickity';

const SingleMovie = () =>{
    //base variables 
    const base_url = BASE_URL; 
    const key = API_KEY_ONLY;
    let {movieId} = useParams();
    const [singleMovie, setSingleMovie] = useState({});
    const [isDataGood, setisDataGood] = useState(false);

    //similar movie recommendations variables. 
    const [recommendatedMovie, setRecommendation] = useState(null);

    // trailers variables
    const [trailerKey, setTrailerKeysOnly] = useState("");
    const [allTrailersInfo, setAllTrailersInfo] = useState([]);
    
    useEffect(() =>{
        window.scrollTo(0,0);// load page at this position. 

        const fetchMovies = async () =>{
            const append_to = "&append_to_response=credits,videos,recommendations,release_dates,people,similar,images";
            const res = await fetch(`${base_url}${movieId}?api_key=${key}&language=en-US${append_to}`);
            let data = await res.json();

            if(data.state_code !== 34 && data){
                // setting up movie's data
                setSingleMovie(movieMaker([data])[0]);

                //Setting up recommended movie data
                const recommendationList = movieMaker(data.recommendations.results);
                setRecommendation(recommendationList);

                // hero trailer.
                let trailers = data.videos.results; 
                setAllTrailersInfo(trailers);


                //Default trailer key ONLY.
                let trailerKeys = trailers[0].key;
                setTrailerKeysOnly([trailerKeys]);
    

            }else{
                setisDataGood(false);
                console.log(`Page data is ${isDataGood}`);
            }

        }
        fetchMovies();

    }, [base_url, key, movieId, isDataGood]);

    const makeHeroTrailer = (obj) =>{
        if(obj !== undefined){
            let heroTrailerKey = obj;
            return(
                <Youtube videoId={heroTrailerKey}
                    containerClassName={"youtube-container"}
                    loading={'loading...please wait.'}
                    opts={
                    {
                        playerVars: {
                            autoplay: 0,
                            controls: 1,
                            cc_load_policy: 0,
                            fs: 1,
                            iv_load_policy: 0,
                            modestbranding: 0,
                            rel: 0,
                            showinfo: 0,
                        },
                    }
                }
                />
            )
        }
    }

    const handleClick = (event) =>{
        event.preventDefault();
        window.scrollTo(0,0);// load page at this position. 
        setTrailerKeysOnly(event.target.value);//Sets hero Trailers. 
    }

    //Genres List
    const makeGenreList = (obj) =>{
        if(obj){
            let genres = obj;
            const genreCounts = obj.length; 
            return genres.slice(genres, genreCounts).map((genre, index)=>{
                return(
                    <h3 key={index}>{genre}</h3>
                )
            })
        }
    }

    //Trailers List 
    const makeTrailerList = (obj)=>{
        if(obj !== undefined){
            let trailerList = obj;
            let count = trailerList.length;            
            return trailerList.slice(0, 20).map((trailer, index)=>{
                return(
                    <li key={index} className={`trailer-video ${index}`}>
                            {/* click button/checkbox to send trailer.key */}
                            <button value={trailer.key} onClick={e => handleClick(e, "value")}>Click</button>
                            <Youtube videoId={trailer.key}
                                containerClassName={"youtube-container"}
                                title={trailer.name}
                                id={trailer.id}
                                loading={'loading...please wait.'}
                                opts={
                                {
                                    playerVars: {
                                        autoplay: 0,
                                        controls: 0,
                                        cc_load_policy: 0,
                                        fs: 0,
                                        iv_load_policy: 0,
                                        modestbranding: 0,
                                        rel: 0,
                                        showinfo: 0,
                                    },
                                }
                            }
                            />
                        <h2>{index +1} of {count}</h2>
                        <h2>{trailer.name}</h2>
                    </li>
                    
                )
            })
        }
    }
    //Suggestions List
    const makeSuggestions = (suggestions) =>{
        if(suggestions !== null){
            return suggestions.slice(0, 20).map((suggestion, i)=>{
                return(
                    <div key={i} className='suggested-movie' >
                        <NavLink reloadDocument to={`/movie/${suggestion.id}`} onClick={()=> setTrailerKeysOnly()}>
                            <img src={suggestion.poster} alt={suggestion.title}/>
                            <h2>{suggestion.title}</h2>
                        </NavLink> 
                    </div>
                )
            })
        }
    } 
    return(
        <main>
            {isDataGood? <Redirect to={<PageNotFound/>}/> :
                <div className='single-m-page'>
                    <img id='single-bg-image' src={singleMovie.bgimg} alt={singleMovie.title}/>
                    
                    <section className='single-m-wrapper'>
                        <div className='hero-sub-nav'>
                        <AddBookMark movie={singleMovie}/>
                        </div>

                        <div className='hero-media-container'>
                            <div className="single-bg-poster">
                                {trailerKey? makeHeroTrailer(trailerKey):
                                <img src={singleMovie.bgimg} alt={singleMovie.title} />
                                }
                                
                                <div className='single-movie-poster'>
                                    <img src={singleMovie.poster} alt={singleMovie.title} />  
                                </div>  
                            </div>
                        </div>

                        <div className="single-m-content">{/*movie poster text & content Starts*/ }
                            <div className='heading'>
                                <h1>{singleMovie.title}</h1>
                            </div>

                            <div className='single-m-sub-text'>
                                <h3>Release · {ParseDate(singleMovie.date)}</h3>
                                <span>&#183;</span>
                                <h3>{singleMovie.runtime}</h3>
                            </div>
                            
                            <div className="single-m-header">
                                <div className="single-m-btns">{/*Add to Favs, Watchlater, Trailer*/ }</div>
                            </div>
                            
                            <div className='single-m-text'>
                                <div className="genre">
                                    {makeGenreList(singleMovie.singleMovieGenres)}
                                </div>
                                <p>{singleMovie.overview}</p>

                                <div className="rate">
                                    <h2>Audience Score</h2>
                                    <div className="star-img">
                                        {StarsRating(singleMovie)}
                                        <p>{singleMovie.rate}</p>
                                    </div>
                                </div>

                                
                                <div className='trailer-media-container'>
                                    <h2 className='section-title'>Videos</h2>
                                    <Flickity
                                        elementType={'div'}
                                        className='other-trailers-wrapper'
                                        options={moreTrailerFlickityOptions}
                                        imageLoaded={true}
                                        reloadOnUpdate={false}
                                        lazyLoad={true}
                                        static={false}>
                                        {makeTrailerList(allTrailersInfo)}
                                    </Flickity>
                                </div>

                                <div className='cast-wrapper'>
                                    <CastSlider movieData={singleMovie}/>
                                </div>

                                <div className='media-container'>
                                    <WatchProviders />
                                </div>

                                <div className='media-container'>
                                    <h2 className='section-title'>Recommendations</h2>
                                    <Flickity
                                        className='recommendations'
                                        elementType={'div'}
                                        options={flickityOptionsRecommendations}
                                        imageLoaded={true}
                                        reloadOnUpdate={false}
                                        static={false}>
                                        {makeSuggestions(recommendatedMovie)}
                                    </Flickity>
                                </div>                             
                            </div>
                        
                        </div>

                    </section> {/****** END Single Page Wrap */}
                </div>
            }

        </main>
    )


}

export default SingleMovie; 