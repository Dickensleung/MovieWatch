import React, {useState, useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import Flickity from "react-flickity-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL, API_KEY_ONLY } from '../globals/variable';
import movieMaker from '../utilities/movieMaker';
import AddBookMark from './AddBookMark';
import ParseDate from '../utilities/ParseDate';
import {flickityOptionsHome} from '../utilities/Flickity';
import {slickSliderHomeConfig} from '../utilities/SlickConfig';


const Home = () =>{
    const [movieData1, setMovieData1] = useState(null);
    const [movieData2, setMovieData2] = useState(null); 
    const [movieData3, setMovieData3] = useState(null);
    const [movieData4, setMovieData4] = useState(null);
    const key = API_KEY_ONLY;
    const d = new Date();
    const year = d.getFullYear();
    const bannerYear = d.getFullYear(2022);

    useEffect(()=>{
        window.scrollTo(0,0);
        const shuffle = (array) => {
            for (var i = array.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
        };
        const fetchMovies = async() => {
            const topchart = "top_rated";
            const popular = "popular";
            const upcoming = "upcoming";
            const nowPlaying = "now_playing";
            const langAndYear = "&language=en-US&page=1&primary_release_year=";
            
            const topchartRes = await fetch(`${BASE_URL}${topchart}?api_key=${key}${langAndYear}${year}`);
            const popularRes = await fetch(`${BASE_URL}${popular}?api_key=${key}${langAndYear}${year}`);
            const upcomingRes = await fetch(`${BASE_URL}${upcoming}?api_key=${key}${langAndYear}${year}`);
            const nowPlayingres = await fetch(`${BASE_URL}${nowPlaying}?api_key=${key}${langAndYear}${bannerYear}`);

            let topchartData = await topchartRes.json();
            let popularData = await popularRes.json();
            let upcomingData = await upcomingRes.json();
            let nowPlayingData = await nowPlayingres.json();
            
            const topchartMovie = movieMaker(topchartData.results);
            const popularMovie = movieMaker(popularData.results);
            const upcomingMovie = movieMaker(upcomingData.results);
            const nowPlayingMovie = movieMaker(nowPlayingData.results);
            shuffle(nowPlayingMovie);
             

            // handling 429 error. https://www.themoviedb.org/talk/62c7c1b258361b005fd2e747
            // maximum of 50 requests per second and 20 connections per IP.
            setInterval(()=>{             
                setMovieData4(nowPlayingMovie);
                setMovieData2(topchartMovie);
            }, 100);


            setInterval(()=>{
                setMovieData1(popularMovie);
                setMovieData3(upcomingMovie);
            }, 500);
        }
        fetchMovies();
    }, [key, year, bannerYear]);

    //HEADER BANNER 
    const makeBannerMovieSlider = (movies) => {        
        if(movies){
            const movieCounts = 10;
            return movies.slice(0, movieCounts).map((movie, index) =>{
                return(
                    <div className='carouselImage' key={index}>
                        <NavLink to={`/movie/${movie.id}`}>
                            <div className='bg-home-poster'>
                                <div className='bg-image'>
                                    <img src={movie.bgimg} alt={movie.title}/>
                                </div>

                                <div className='single-home-poster'>
                                    <div className='home-info'>
                                        <h1>{movie.title}</h1>
                                        <h3>{movie.excerpt}</h3>
                                        <h3>Release: {ParseDate(movie.date)}.</h3>
                                    </div>
                                </div>
                            </div>                            
                        </NavLink>
                    </div>
                )
            })
        }
    }
   
    //Movie list 
    const makeMovieSlider = (movies) =>{
        if(movies){
            return movies.slice(0, 10).map((movie, index) =>{
                return(
                    <div className='post' key={index.popularity}>
                        <AddBookMark movie={movie} />
                        <NavLink to={`/movie/${movie.id}`}>
                            <div className='slider-front'>
                                <img className='thumbnail' src={movie.poster}  alt={movie.title}  style={{borderRadius: "4px"}}/>
                            </div> 
                        </NavLink>

                        <div className='slider-back'>
                            <div className='slider-info'>
                                <h3>{movie.title}</h3>
                                <p className='genre'>{movie.genres}</p>
                                
                            </div>

                            <div className="slider-buttons">
                            <NavLink to={`/movie/${movie.id}`}><button class="more-info">More Info</button></NavLink>
                            </div>
                        </div>

                        <div className='slider-background'></div>
                    </div>
                )
            })
        }
    }

    return(
        <main>
            <div className='hero-wrapper'>    
                <Flickity 
                    className={'carouselOfImages'}
                    elementType={'div'}
                    options={flickityOptionsHome}
                    reloadOnUpdate={false}
                    setGallerySize= {false}
                    disableImagesLoaded={false} // default false
                    static={false}> 
                    {makeBannerMovieSlider(movieData4)} 
                </Flickity>
            </div>
            
            <div className="content-wrapper">
                <div className="content-home">
                    <h1>Upcoming</h1>
                    <div className="content-slider">
                        <Slider {...slickSliderHomeConfig}>{makeMovieSlider(movieData3)}</Slider>
                    </div>
                </div>

                <div className="content-home">
                    <h1>Top Rated</h1>
                    <div className="content-slider">
                        <Slider {...slickSliderHomeConfig} >{makeMovieSlider(movieData1)}</Slider>
                    </div>
                </div>
                
                <div className="content-home">
                    <h1 className='content-title-reverse'>Popular</h1>
                    <div className="content-slider">
                        <Slider {...slickSliderHomeConfig}>{makeMovieSlider(movieData2)}</Slider>
                    </div>
                </div>
            </div>
           
        </main>
    )
}
export default Home;