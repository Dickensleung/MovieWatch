import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {APP_FOLDER_NAME} from '../globals/variable';
import Header from '../components/Header';
import Home from '../components/Home';
import PageNotFound from '../components/PageNotFound';
import About from '../components/About';
import WatchLater from '../components/WaterLater';
import SearchPage from '../components/SearchPage';
import Footer from '../components/Footer';
import SingleMovie from '../components/SingleMovie';

const AppRouter = () =>(
    <Router basename={APP_FOLDER_NAME}>
        <Header/>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/" exact><Home/></Route>
                <Route path="/index.html" exact><Home /></Route>
                <Route path="/about" ><About /></Route>
                <Route path="/movie" exact />
                <Route path="/movie/:movieId" component={SingleMovie}><SingleMovie/></Route>
                <Route path="/watchlater" ><WatchLater /></Route>
                <Route path="/searchpage"><SearchPage /></Route>
                <Route><PageNotFound/></Route>
            </Switch>
        </Suspense>
        <Footer/>
    </Router>
)
export default AppRouter;