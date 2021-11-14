// import s from './MovieDetailsPageView.module.css';
import {useState, useEffect} from 'react';
import {Switch, Route, Link, useParams, useRouteMatch, useHistory, useLocation} from 'react-router-dom';
import {fetchMovieById} from '../../api/api';
import PendingLoader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';
import NotFoundImage from '../../images/imageNotFound.jpg';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';

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
            <button type="button" onClick={onGoBack}>Go back</button>
            <div>
                <img src={movie.poster_path ? `${imgPath}${movie.poster_path}` : NotFoundImage} alt={movie.title} height='300'></img>
            </div>
            <div>
                <h1>{movie.title} ({movie.release_date.slice(0,4)})</h1>
                <p>User Score: {movie.vote_average*10}%</p>

                <h2>Overview</h2>
                <p>{movie.overview}</p>

                <h2>Genres</h2>
                <ul>{movie.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                ))}</ul>
            </div>
            <ul>Additional information
                <li>
                    <Link to={{
                        pathname: `${url}/cast`,
                        state: {from : currentLocation},
                    }}>Cast</Link>                                        
                </li>
                <li>                    
                    <Link to={{
                        pathname: `${url}/reviews`,
                        state: {from : currentLocation},
                    }}>Reviews</Link>                                       
                </li>
            </ul>

            <Switch>
                <Route path={`${url}/cast`}>
                    <Cast movieId={movieId}/>
                </Route>
                
                <Route path={`${url}/reviews`}>
                    <Reviews movieId={movieId}/>
                </Route>
            </Switch>
            </>
        )}
        </>
    );
}

export default MovieDetailsPageView;
