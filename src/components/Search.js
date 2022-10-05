import React, {useState} from 'react';


const Search = ({ handleSearch}) => {
    const [val, setVal] = useState();
    const handleFormKeySubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(e.target.value);
        }
    }

    const handleSearchBarOnChange = (e) => {
        e.preventDefault();
        handleSearch(e.target.value);
    }

    return (
        <section className="searchbox-wrap">
            <form>
                <label htmlFor="search" className="sr-only"></label>
                <input type="textarea"
                    id="search"
                    name="search"
                    className="searchbox"
                    placeholder="Enter movie title to start search.."
                    value={val} 
                    onKeyPress={handleFormKeySubmit}
                    onChange={handleSearchBarOnChange}
                    />
                <button id="reset-button-input-field" onClick={() => setVal(() => "")}>x</button>
            </form>
        </section>
    )
}
export default Search;


               