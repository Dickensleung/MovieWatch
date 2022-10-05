import React, { useState, useEffect } from 'react';
import { isItemInStorage, removeItemFromStorage, addToStorage, getStorageIndexNumber } from '../utilities/storageMaker';
import { GiHeartPlus, GiHeartMinus} from "react-icons/gi";

const AddFavourite = ({ movie }) => {
    useEffect(() => {
        setFavIndex(isItemInStorage(movie, 'favourites'));
    }, [movie]);

    const [favIndex, setFavIndex] = useState(-1);

    const handleAddFavourite = (movie) => {
        setFavIndex(addToStorage(movie, 'favourites'));
    }
    const handleRemoveFromFavourites = (movie) => {
        removeItemFromStorage(getStorageIndexNumber(movie, 'favourites'), 'favourites');
        setFavIndex(-1);
        let favouritesPage = window.location.pathname;
        if (favouritesPage === "/movie-watch/favourites") {
            window.location.reload();
        }
    }

    return (
        <div className='single-movie-favourite'>
            { favIndex >= 0 ?
                <button
                    className="favMovie"
                    onClick={() => { handleRemoveFromFavourites(movie) }}>
                    <GiHeartMinus size="2.5em" color="white"/>
                </button> :
                <button
                    className="unfavMovie"
                    onClick={() => { handleAddFavourite(movie) }}>
                    <GiHeartPlus size="2.5em" color="white" /> 
                    
                </button>
            }
        </div>
    );
}

export default AddFavourite;