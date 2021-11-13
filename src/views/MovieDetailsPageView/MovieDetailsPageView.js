// import s from './MovieDetailsPageView.module.css';
import {useState, useEffect} from 'react';
import {Switch, Route, Link, useParams, useRouteMatch, useHistory, useLocation} from 'react-router-dom';
import {fetchMovieById} from '../../api/api';
import PendingLoader from '../../components/Loader/Loader';
import NotFoundView from '../NotFoundView/NotFoundView';
import CastView from '../CastView/CastView';
import ReviewsView from '../ReviewsView/ReviewsView';

function MovieDetailsPageView() {
    const {movieId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const [movie, setMovie] = useState(null);   
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    
    const imgPath = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        fetchMovieById(movieId)
        .then(movie => {
            setMovie(movie);
            setStatus('resolved');
            setError(null);
        })
        .catch(error => {
            setError(error.message);
            setStatus('rejected');
        })
    }, [movieId]);

    const onGoBack = () => {
        history.push(location?.state?.from);
    }

    return (        
        <>
        {status === 'pending' && <PendingLoader />}

        {(status === 'rejected' || error) && <NotFoundView />}

        {status === 'resolved' && (
            <>
            <button type="button" onClick={onGoBack}>Go back</button>
            <div>
                <img src={`${imgPath}${movie.poster_path}`} alt={movie.title} height='300'></img>
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
                    <Link to={`${url}/cast`}>Cast</Link>                                        
                </li>
                <li>                    
                    <Link to={`${url}/reviews`}>Reviews</Link>                                       
                </li>
            </ul>

            <Switch>
                <Route path={`${url}/cast`}>
                    <CastView movieId={movieId}/>
                </Route>
                
                <Route path={`${url}/reviews`}>
                    <ReviewsView movieId={movieId}/>
                </Route>
            </Switch>
            </>
        )}
        </>
    );
}

export default MovieDetailsPageView;
