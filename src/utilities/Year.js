import React from 'react';

const years = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

const makeYearOptions = (years) => {
    return years.map((yearGroup, i) => {
        return (
            <option key={i} value={yearGroup}>{yearGroup}</option>
        )
    });
}

const Year = (props) => {

    const handleChangeYear = (e) => {
        e.preventDefault();
        const loc = e.target.value;
        props.handleChangeYear(loc);
    }

    return (
        <div className="year">
            <form>
                <label htmlFor="selectyear"></label>
                <select name="selectyear"
                    className="selection"
                    id="selectyear"
                    onChange={handleChangeYear}
                    defaultValue={2022}>
                    {makeYearOptions(years, props.year)}
                </select>
            </form>
        </div>
    );
};

export default Year;