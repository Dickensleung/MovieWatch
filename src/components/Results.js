import React from 'react';
import { NavLink } from 'react-router-dom';
import ParseDate from '../utilities/ParseDate';


const Result = ({result}) => {
    //returns single movie card
    return(
        <div className="search-results-card">
            <NavLink className ="search-results-poster" to={`/movie/${result.id}`}>
                <img src={result.poster} alt={result.title} />
                   
                <div className="search-results-text">
                    <h3 className="result-card-title">{result.title}</h3>
                    <p className="result-card-date"> {ParseDate(result.date)}</p>
                    <br />
                    <p className="result-card-date"> {result.genres}</p>
                </div>
            </NavLink>
        </div>

    );
}

const Results = ({results}) => {
    //sort by release dates by descending order
    results.sort((a, b) => { return b.date.localeCompare(a.date)});
    
    //results list.
    return(
        <div className="movielist-wrapper">
            {results.map((result, i)=>{
                return <Result key={i} result={result}/>
                
            })}
        </div>
    );   
}
export default Results;