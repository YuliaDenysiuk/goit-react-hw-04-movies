import s from './MovieDetailsPageView.module.css';
import {useState, useEffect, lazy, Suspense} from 'react';
import {Switch, Route, Link, useParams, useRouteMatch, useHistory, useLocation} from 'react-router-dom';
import {fetchMovieById} from '../../api/api';
import PendingLoader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';
import NotFoundImage from '../../images/imageNotFound.jpg';

const Cast = lazy(() => import('../../components/Cast/Cast.js' /* webpackChunkName: "cast" */));
const Reviews = lazy(() => import('../../components/Reviews/Reviews.js' /* webpackChunkName: "reviews" */));

function MovieDetailsPageView() {
    const {movieId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const [movie, setMovie] = useState(null);   
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [currentLocation, setCurrentLocation] = useState(null);
    
    const imgPath = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        fetchMovieById(movieId)
        .then(movie => {
            setMovie(movie);
            setStatus('resolved');
            setError(null);
            setCurrentLocation(location.state.from);
        })
        .catch(error => {
            setError(error.message);
            setStatus('rejected');
        })
    }, [location, movieId]);

    const onGoBack = () => {
        history.push(currentLocation);
    }

    return (        
        <>
        {status === 'pending' && <PendingLoader />}

        {(status === 'rejected' || error) && <NotFound />}

        {status === 'resolved' && (
            <>
            <button className={s.movie__button} type="button" onClick={onGoBack}>Go back</button>
            <div className={s.movie}>                
                <div>
                    <img className={s.movie__image} src={movie.poster_path ? `${imgPath}${movie.poster_path}` : NotFoundImage} alt={movie.title}></img>
                </div>
                <div>
                    <h1 className={s.movie__title}>{movie.title} ({movie.release_date.slice(0,4)})</h1>
                    <p className={s.movie__text}>User Score: {movie.vote_average*10}%</p>

                    <h2 className={s.movie__heading}>Overview</h2>
                    <p className={s.movie__text}>{movie.overview}</p>

                    <h2 className={s.movie__heading}>Genres</h2>
                    <ul className={s.movie__genres}>{movie.genres.map(genre => (
                        <li className={s.movie__genre} key={genre.id}>{genre.name}</li>
                    ))}</ul>
                </div>
            </div>
            <ul className={s.movie__list}>Additional information
                <li className={s.movie__item}>
                    <Link to={{
                        pathname: `${url}/cast`,
                        state: {from : currentLocation},
                    }}>Cast</Link>                                        
                </li>
                <li className={s.movie__item}>                    
                    <Link to={{
                        pathname: `${url}/reviews`,
                        state: {from : currentLocation},
                    }}>Reviews</Link>                                       
                </li>
            </ul>

            <Suspense fallback={<PendingLoader />}>
                <Switch>
                    <Route path={`${url}/cast`}>
                        <Cast movieId={movieId}/>
                    </Route>
                    
                    <Route path={`${url}/reviews`}>
                        <Reviews movieId={movieId}/>
                    </Route>
                </Switch>
            </Suspense>
            </>
        )}
        </>
    );
}

export default MovieDetailsPageView;
