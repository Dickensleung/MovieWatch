import React, { useState, useEffect, useRef } from 'react';
import Search from './Search';
import Results from '../components/Results';
import axios from 'axios';
import { API_KEY_ONLY, SEARCH_API_BASE, DISCOVER_API_BASE } from '../globals/variable';
import movieMaker from '../utilities/movieMaker';
import {genresList} from '../utilities/movieMaker';
import Checkbox from "./Checkbox";
import Year from '../utilities/Year';


const SearchPage = () =>{
    //helper variables. 
    const node = useRef();
    const search_api = SEARCH_API_BASE;
    const discover_api = DISCOVER_API_BASE;
    const key = API_KEY_ONLY;
    const d = new Date();
    const y = d.getFullYear();
    const [year, setYear] = useState(y);
    const genreInfoImported = genresList;


    // Handles State changes 
    const [titlesearchResult, setSearchTitleResult] = useState([]);
    const [othersearchResult, setOtherResult] = useState([]);
    const [titleSearchOpen, setisOpen] = useState(false);
    const [genreList, setGenreList] = useState([]); //importing genreInfo.
    const [genreInfo, setGenreInfo] = useState({
        genrename: [], 
        responses:[],
    });
    const [titleInput, setTitleInput] = useState();

    const [expand, setExpand] = useState(false);
    const toggleExpand = () => setExpand(prevExpand => !prevExpand);

    const [yearExpandOnly, setYearExpand] = useState(false);
    const toggleYearExpand = () => setYearExpand(prevExpand => !prevExpand);


    useEffect(()=>{
        setGenreList(genreInfoImported);
    }, [genreInfoImported]);
    
    // State Change Methods
    const handleChangeYear = (year) => {
        setSearchTitleResult([]);
        setOtherResult([]);
        setYear(year);
    }

    
    const handleSearch = (searchEnteredByUser) => {
        // Handles SEARCH by MOVIE TITLE by calling API. 
        let userQuery = searchEnteredByUser;
        if (userQuery !== '') {
            axios( search_api + key + "&query=" + userQuery).then(({ data }) => {
                setSearchTitleResult(movieMaker(data.results));
                setisOpen(true);
            });
        } else {
            setSearchTitleResult([]);
        }
        setTitleInput(searchEnteredByUser);//sending data of what's being typed by user. 
    }
    
    const handleDiscovery = (event) =>{
        // handles SEARCH by RELATED GENRES. 
        event.preventDefault();
        let userQuery = genreInfo.responses;
        let searchYear = year;
        if(userQuery !== ''){
            axios(discover_api + key + "&with_genres=" + userQuery + "&primary_release_year=" + searchYear)
            .then(({data})=>{
                setOtherResult(movieMaker(data.results));
                setisOpen(true);
            })
        }else{
            setOtherResult([]);
        }
    }
   
    const handleOnClick = (event)=>{
         // Handles changes: Filtering by movie genres, 
        setSearchTitleResult([]); // handles resetting title bar
        setOtherResult([]); // handles resetting searched results
        
        const {name, id, checked} = event.target;// Destructuring
        const { genrename } = genreInfo;

        if(checked){
            setGenreInfo({
                genrename: [...genrename, id],
                responses: [...genrename, id],
            });

        }else{
            setGenreInfo({
                genrename: genrename.filter((item) => item !== id), 
                responses: genrename.filter((item)=> item !== id),
            });
        }
        console.log(`${name} is ${checked} and id is ${id}`);//error checking in console

    }

    const handleMovieListReset = (event) =>{
        event.preventDefault();
        setSearchTitleResult([]);
        setOtherResult([]);
    }

    const makeCheckBoxList = (obj) =>{
        if(obj){
            const count = obj.length;
            return obj.slice(0, count).map((item, index)=>{
                return(
                    <li key={item.id.toString()} id={item.name} className={"genre-group"}>
                        <Checkbox key={index} inputname={item.name} name={item.name} id={item.id} onClick={handleOnClick}/>
                    </li>
                )
            })
        }
    }


    const makeSearchResultsHeaderContainer = (data) =>{
        // set sentry for data != null or undefined
        if(data !== null || data !== undefined){
            let count = data.length; //results count
            let titleSearchQuery = titleInput; //userQuery from searchbar, place holder to not display text. 

            if( titleSearchQuery !=="" && count >=1){
                return(
                    <div ref={node} className="search-result-wrapper">
                        <h2>Matched {count} results for "{titleSearchQuery}".</h2>
                    </div>
                )
            }
            if( titleSearchQuery && count < 1){
                return(
                    <div ref={node} className="search-result-wrapper">
                        <h2>{count} results for "{titleSearchQuery}". Try again.</h2>
                    </div>
                )
            }else{
                return(
                    <div ref={node} className="search-result-wrapper"></div>
                )
            }
        }
        return data
    }

    const makeSearchResultsHeaderContainerTwo = (data) =>{
        if(data !== null || data !== undefined){
            let count = data.length; //results count
            let genreAndYearQuery = othersearchResult;

            if(genreAndYearQuery !=="" && count >=1){
                return(
                    <div ref={node} className="search-result-wrapper">
                        <h2>Selection result matched {count} results for Year: {year}.</h2>
                    </div> 
                )
            }else{
                return(
                    <div ref={node} className="search-result-wrapper"></div>
                )
            }
        }
        return data
    }
    return(
        <div className="page-wrapper">
            <div className="search-filter-container">
                <div className="genre-list">
                    <h2>Advance Search</h2>
                    <div className='title-search'>
                        <Search handleSearch={handleSearch} search={null}/>
                        {makeSearchResultsHeaderContainer(titlesearchResult)}
                        {makeSearchResultsHeaderContainerTwo(othersearchResult)}
                    </div> 

                    <div id="search-desktop-view">
                        <div className='year-search'>
                            <button id="filter-btn" type='button' onClick={toggleYearExpand}>
                                Search Movies by Year <span>{yearExpandOnly? "-" : "+"}</span>
                            </button>
                            {expand? expand && <div><Year year={year} handleChangeYear={handleChangeYear} /></div> : yearExpandOnly && <div><Year year={year} handleChangeYear={handleChangeYear} /></div>}
                        </div>

                        <div className='genre-and-year-search'>
                            <button id="filter-btn" type='button' onClick={toggleExpand}>
                                Movies by Genres and Year <span>{expand? "-" : "+"}</span>
                            </button>
                            
                            {expand &&  <form className="checkbox-wrapper">  {makeCheckBoxList(genreList)}</form>}
                            
                        </div>
                    </div>
     

                    <div className='search-buttons'>
                        {expand? expand && 
                            <div>
                                <button type='button' id='discovery-button' onClick={handleDiscovery}>Search</button>
                                <button type='button' id='reset-button'onClick={handleMovieListReset}>Clear Results</button> 
                            </div>
                            :
                            yearExpandOnly && 
                            <div>
                                <button type='button' id='discovery-button' onClick={handleDiscovery}>Search</button>
                                <button type='button' id='reset-button'onClick={handleMovieListReset}>Clear Results</button> 
                            </div>
                        }   
                    </div>        
                </div>
            </div>

            {titlesearchResult.length>= 1?
                titleSearchOpen && 
                <div ref={node} className="search-result-wrapper">
                    <Results results={titlesearchResult}/>
                </div> :
                <div ref={node} className="search-result-wrapper"></div>
            }
            
            {othersearchResult.length>=1?
                titleSearchOpen &&
                <div ref={node} className="search-result-wrapper">
                    <Results results={othersearchResult}/>
                    </div> :
                <div ref={node} className="search-result-wrapper"></div>
            }
        
        </div>
    )
}
export default SearchPage;