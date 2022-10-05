//Global Variables 
export const APP_FOLDER_NAME ='/movie-watch';

//API Variables 
export const API_KEY_ONLY = '9aa547d08d34e1b1eb70296fdea706a9'; 
export const API_KEY = `&appid=${API_KEY_ONLY}`;

//APU Variables for making movie poster and search(base_url, size and file path)
export const BASE_URL = "https://api.themoviedb.org/3/movie/";
export const ACTOR_BASE_URL = "https://api.themoviedb.org/3/person/";
export const BASE_SEARCH = "https://api.themoviedb.org/3/search/movie/";
export const SEARCH_API_BASE = "https://api.themoviedb.org/3/search/movie?api_key=";
export const FIND_BASE_URL = "https://api.themoviedb.org/3/find/";
export const DISCOVER_API_BASE = "https://api.themoviedb.org/3/discover/movie?api_key=";
export const BASE_LANG = '&language="en-US"';
export const BASE_PAGE = "&page=";


export const BASE_POSTER = "https://image.tmdb.org/t/p/";
//export const NULL_POSTER = PLACEHOLDER_POSTER;

export const DEFAULT_FILTER = "popular";
export const DEFAULT_PAGELOAD = 1;

//For Parsing Date 
export const MONTH_FORMAT = "long"; //use short for abbrv