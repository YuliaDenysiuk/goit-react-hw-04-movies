// import s from './MoviesPageView.module.css';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {fetchMovies} from '../../api/api';
import MoviesInput from '../../components/MoviesInput/MoviesInput';
import PendingLoader from '../../components/Loader/Loader';
import NotFoundView from '../NotFoundView/NotFoundView';

function MoviesPageView() {
    const [movie, setMovie] = useState('');
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);
    const [state, setState] = useState('idle');

    const addMovieName = (name) => {
        setMovie(name);
    };

    useEffect(() => {
        if(movie === '') {
            return;
        }

        setState('pending');

        fetchMovies(movie)
            .then(movies => {           
                setMovies(movies.results);
                if (movies.results.length === 0) {
                    setState('rejected');
                    return;
                }
                setState('resolved');
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setState('rejected');
            })
    }, [movie]);

    return (
        <>
        <MoviesInput onSubmit={addMovieName}/>

        {state === 'pending' && <PendingLoader />}

        {(state === 'rejected' || error) && <NotFoundView />}
        
        {state === 'resolved' && (
            <ul>
                {movies.map(({id, title}) => (
                    <li key={id}>
                        <Link to='/'>{title}</Link>
                    </li>
                ))}
            </ul>
        )}
        </>
    );
}

export default MoviesPageView;
