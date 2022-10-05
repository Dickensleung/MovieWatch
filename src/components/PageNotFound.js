import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
    return(
        <main>
            <section className='page-not-found'>
                <h1>404.. Opps, Page is not here.</h1>
                <p><NavLink to="/">Click Here to HOME page.</NavLink></p>
            </section>
        </main>
    );
}
export default PageNotFound; 