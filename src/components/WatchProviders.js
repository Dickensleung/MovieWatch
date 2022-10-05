import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { BASE_URL, API_KEY_ONLY } from '../globals/variable';
import movieMaker from '../utilities/movieMaker';

const WatchProviders = () =>{

    let {movieId} = useParams();
    const base_url = BASE_URL;
    const key = API_KEY_ONLY;
    const [freeToWatch, setFree] = useState(null);
    const [buyProviders, setBuy] = useState(null);
    const [flateRatedProviders, setFlat] = useState(null);
    const [rentProviders, setRent] = useState(null);

    useEffect(()=>{
        const fetchProviders = async () =>{
            const res = await fetch(`${base_url}${movieId}/watch/providers?api_key=${key}&language=en-US`);
            let data = await res.json();

            if( data.results.CA.ads  !== undefined){
                const freeProvidersArray = movieMaker(data.results.CA);
                setFree(freeProvidersArray);
            }

            if(data.results.CA.buy !== undefined){
                const buyProvidersArray = movieMaker(data.results.CA.buy);
                setBuy(buyProvidersArray);
            }
            if(data.results.CA.flatrate !== undefined){
                const flateRatedProvidersArray = movieMaker(data.results.CA.flatrate);
                setFlat(flateRatedProvidersArray);
            }

            if(data.results.CA.rent !== undefined){
                const rentProvidersArray = movieMaker(data.results.CA.rent);
                setRent(rentProvidersArray);
            }            
        }
        fetchProviders();
    }, [base_url, movieId, key]);

    const makeProviders = (providers) =>{
        if(providers){
            const providerCounts = providers.length;

            return providers.slice(0, providerCounts).map((provider, i)=>{
                return(
                    <div className='provider' key={i}>
                        <img src={provider.providericon} alt='providers-icon'/>
                    </div>
                )
            },)
        }
    }

    return(
        <div className='watch-providers'>
            <div className='provider-container'>            
                <h2 className='section-title'>Now Streaming</h2>
                <div className='providers'> 
                    {flateRatedProviders?
                    makeProviders(flateRatedProviders)
                    :<p>Sorry, nobody is streaming this movie.</p>}
                </div> 
            </div>
            
            <div className='provider-container-two'>
                <h2 className='section-title'>Buy</h2>
                <div className='providers'>    
                    {buyProviders?
                    makeProviders(buyProviders)
                    :<p>Sorry, we did not find anything.</p>}
                </div>
            </div>

            <div className='provider-container-two'>           
                <h2 className='section-title'>Rent</h2>
                <div className='providers'>
                        {rentProviders?
                        makeProviders(rentProviders)
                    :<p>Sorry, nobody to rent from.</p>}
                </div>
            </div> 

            <div className='provider-container-two'>
                <h2 className='section-title'>TV Network </h2>
                <div className='providers'>
                    
                    {freeToWatch?
                    makeProviders(freeToWatch)
                    :<p>Sorry, we did not find anything.</p>}
                </div>
            </div>
        </div>
    )




}
export default WatchProviders;