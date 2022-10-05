import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Slider from "react-slick";
import { BASE_URL, API_KEY_ONLY } from '../globals/variable';
import profileimage from '../images/profileimage.jpg';
import {slickSliderCastconfig} from '../utilities/SlickConfig';

const CastSlider = () =>{

    let {movieId} = useParams();
    const base_url = BASE_URL;
    const key = API_KEY_ONLY;
    const [movieData, setMovie] = useState(null);

    useEffect(()=>{
        const fetchMovies = async () =>{
            const res = await fetch(`${base_url}${movieId}?api_key=${key}&language=en-US&append_to_response=credits,videos,recommendations,release_dates,people`);
            const data = await res.json();
            setMovie(data);
        }
        fetchMovies();
    }, [base_url, movieId, key]);

    //actors list
    const makeActors = (movies) =>{
        if(movies){
            let actors = movies.credits.cast;
            return actors.slice(0, 10).map((actor, i)=>{
                if(actor.profile_path !== null ){
                    return(
                        <div key={i} className='actors-card-container-working'>
                            <img className='actor' src={`https://image.tmdb.org/t/p/w138_and_h175_face${actor.profile_path}`} alt="actor-profile-face"/>
                            <h2 className='actor-name'>{actor.name}</h2>
                            <h3 className='actor-name'>{actor.character} </h3>
                        </div>
                    )
                    
                }else{
                    return(
                        <div key={i} className='actors-card-container-no-profile-image'>
                            <img className='actor' src={profileimage} alt="default-actor-profile-face"/>
                            <h3 className='actor-name'>{actor.name}</h3>
                            <h3 className='actor-name'>{actor.character} </h3>
                        </div>
                    )
                }
            })

        }
    }

    const makeCrew = (movies) =>{
        if(movies){
            let crewMembers = movies.credits.crew;

            return crewMembers.slice(0, 8).map((crew, e)=>{
                if(crew.profile_path !== null){
                    return(
                        <div key={e} className='behind-the-scene-crew-container'>
                            <h2>{crew.department}</h2>
                            <p>{crew.name}, {crew.job}</p>
                        </div>
                    )
                }else{
                    return(
                        <div key={e} className='behind-the-scene-crew-container'>
                            <h2>{crew.department}</h2>
                            <p>Sorry, no data avaliable.</p>
                        </div>
                    )

                }
            })
        }
    }


    return(
        <div>
            <h2 className='section-title'>Production Crew</h2>
            {makeCrew(movieData)}
            <h2 className='section-title'>Top Cast</h2>
            {<Slider {...slickSliderCastconfig} >{makeActors(movieData)}</Slider>}
            
        </div>
    )
}
export default CastSlider;