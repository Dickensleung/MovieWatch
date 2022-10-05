//Converting API data into JSON format. TMDB only support JSON & JSONP
export const genresList = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];

//Images Path. 
const iconPath = 'https://image.tmdb.org/t/p/h632';
const iconPathoriginal = 'https://image.tmdb.org/t/p/original';
const iconPath1280 = 'https://image.tmdb.org/t/p/w1280';
const rateIconPath = process.env.PUBLIC_URL + '/assets/images/';

//Functions 
function filterMD(arr){
    return(
        arr.reduce((result, item)=>{
            result.push({
                date: item.release_date,
                poster: item.poster_path, 
                title: item.title, 
                excerpt: item.overview, 
                overview: item.overview, 
                id: item.id, 
                rate: item.vote_average, 
                bgimg:item.backdrop_path, 
                genres: item.genre_ids,
                singleMovieGenres: item.genres,
                runtime: item.runtime, 
                tagline:item.tagline,
                popularity: item.popularity,
                providericon: item.logo_path

            });
            return result;
        }, [])
    )
}



//Setting movie excerpts 
function setExcerpt(obj) {
    if (obj.excerpt) {
        const fullOverview = obj.excerpt;
        let brokenOverview = fullOverview.split(' ');
        if (brokenOverview.length > 20) {
            let brokenOverviewIndex = 0;
            let rebuildExcerpt = '';
            while (brokenOverviewIndex < 20) {
                rebuildExcerpt = rebuildExcerpt + brokenOverview[brokenOverviewIndex] + ' ';
                brokenOverviewIndex += 1;
            }
            obj.excerpt = rebuildExcerpt + '...';
        }
    }
}
//Runtime function to hours & minutes. 
function setRuntime(obj) {
    if (obj.runtime !== null && obj.runtime !== 0) {
        function convertRuntime(num){
            let h = Math.floor(num/60);
            let m = num%60;
            return(h+"h"+" " +m+"m").toString();
        }
        obj.runtime = convertRuntime(obj.runtime);

    } else {
        obj.runtime = '';
    }
}
//Movie genres for homepage and single movies. 
function setGenres(obj){
    if(obj.genres){
        let genresNames = ''; 
        genresNames = '' + obj.genres.map((genre)=>{
            let genreName = genresList.find(x => x.id === genre).name; 
            return (`${genresNames} ${genreName}`);
        });
        obj.genres = genresNames;

    } else if(obj.singleMovieGenres){
        let genresNames = '';
        genresNames = '' + obj.singleMovieGenres.map((genre) => {
            let genreName = genre.name;
            return (`${genresNames} ${genreName}`);
        });

        //split the commas.
        obj.singleMovieGenres = genresNames.split(',');
    }
}

//Taking in dates, dates will be parse in ParseDate.js.
function setDate(obj) {
    if (obj.date !== null && obj.date !== "") {     
        const releaseDate = obj.date;
        obj.date = `${releaseDate}`;
    }else{
        //else date is in original format.
        // eslint-disable-next-line no-self-assign
        obj.date = obj.date;
    } 

}


//function for setting backround image poster.
function setImage(obj) {
    if (obj.bgimg === null && obj.poster != null) {
        obj.poster = iconPath + obj.poster;
        obj.bgimg = rateIconPath + 'default_bgposter.png';
    } else if (obj.bgimg != null && obj.poster === null) {
        obj.bgimg = iconPath1280 + obj.bgimg;
        obj.poster = rateIconPath + 'default_poster.png';
    } else if (obj.bgimg === null && obj.poster === null) {
        obj.poster = rateIconPath + 'default_poster.png';
        obj.bgimg = rateIconPath + 'default_bgposter.png';
    } else if(obj.bgimg === null && obj.poster === null){
        obj.bgimg = iconPathoriginal + obj.bgimg;
        obj.poster = rateIconPath + 'default_poster.png';
    }else {
        obj.poster = iconPath + obj.poster;
        obj.bgimg = iconPath1280 + obj.bgimg;
    }
}

//Returning streaming providers icons.
function setProviderIcon(obj){
    if(obj.providericon === null){
        obj.providericon = iconPathoriginal + obj.providericon; 
    }else{
        obj.providericon = iconPathoriginal + obj.providericon;
    }
}

//Returns movie taglines. 
function setTagline(obj) {
    if (obj.tagline !== null) {
        // eslint-disable-next-line no-self-assign
        return obj.tagline;
    } else {
        obj.tagline = '';
    }
}

//Converts movie ratings into percert.
function setRatePercentage(obj) {
    let ratePercentage = obj.rate * 10;
    if (obj.rate !== null) {
        if (ratePercentage > 0) {
            obj.rate = Math.round(ratePercentage) + '%';
        } else {
            obj.rate = '';
        }
    }
}

//Returns popularity ratings
function setPopularity(obj) {
    let ratePopularity = obj.x;
    if (obj.x !== null) {
        if (ratePopularity > 0) {
            obj.x = ratePopularity;
        } else {
            obj.x = '';
        }
    }
}

//Returns all functions into a single package.
function movieMaker(mdAPI) {
    mdAPI = filterMD(mdAPI);
    mdAPI.forEach((item, index) => {
        setDate(item);
        setImage(item);
        setGenres(item);
        setExcerpt(item);
        setRuntime(item);
        setTagline(item);
        setRatePercentage(item);
        setPopularity(item);
        setProviderIcon(item);
        return mdAPI[index];
    });
    return mdAPI;
}

export default movieMaker;