import React from 'react';
import { getStorage } from '../utilities/storageMaker';
import MovieGrid from '../components/MovieGrid';
import noData from '../images/no_data.png';


const WatchLater = () => {
    let movieData = getStorage('watchlater');

    return (
        <main>
            <div className="page-wrapper">
                <section className="movie-lists">
                    <h2 className="section-title">Watch List</h2>
                    {movieData.length > 1?
                        movieData && <MovieGrid movieData={movieData? movieData : <p>Nothing here</p>}/>
                    :
                    <p class="nodata"><img src={noData} alt="nodata"></img><br></br>
                    These are your <b>'Watch Later'</b> movies!<br></br>Create your Watch Later list by clicking the button on each movie.</p>
                    
                    }
                    
                </section>
            </div>
        </main>
    )
}

export default WatchLater;