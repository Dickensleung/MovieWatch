import React, { useState, useEffect } from 'react';
import { isItemInStorage, removeItemFromStorage, addToStorage, getStorageIndexNumber } from '../utilities/storageMaker';

const AddBookMark = ({movie}) =>{
    useEffect(() => {
        setWatchIndex(isItemInStorage(movie, 'watchlater'));
    }, [movie]);

    const [watchIndex, setWatchIndex] = useState(-1);

    const handleAddWatchLater = (movie) => {
        setWatchIndex(addToStorage(movie, 'watchlater'));
    }
    
    const handleRemoveFromWatchLater = (movie) => {
        removeItemFromStorage(getStorageIndexNumber(movie, 'watchlater'), 'watchlater');
        setWatchIndex(-1);
        let watchLaterPage = window.location.pathname;
        if (watchLaterPage === "/movie-watch/watch-later") {
            window.location.reload();
        }else{
            <p>Error occured: Check console. </p>
            console.log(window.location);
        }
        
    }
    
    return(
        <div className='single-movie-bookmark'>
            {watchIndex >=0 ?

                <button className="unbookmark-movie"
                onClick={() => {handleRemoveFromWatchLater(movie)}}>
                    -
                </button> :

                <button className="bookmark-movie"
                onClick={() => {handleAddWatchLater(movie)}}>
                    +
                </button>
            }
        </div>
    )
    
}
export default AddBookMark;