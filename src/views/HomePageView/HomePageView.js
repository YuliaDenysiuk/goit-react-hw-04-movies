// import s from './HomePageView.module.css';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {fetchPopularMovies} from '../../api/api';
import PendingLoader from '../../components/Loader/Loader';
import NotFoundView from '../NotFoundView/NotFoundView';

function HomePageView() {
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);
    const [state, setState] = useState('idle');

    useEffect(() => {
        setState('pending');

        fetchPopularMovies()
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
            });
    }, []);
          
    return (
        <>
        {state === 'pending' && <PendingLoader />}

        {(state === 'rejected' || error) && <NotFoundView />}

        {state === 'resolved' && (
            <ul>
                {movies.map(({id, title}) => (
                    <li key={id}>
                        <Link to="/">{title}</Link>
                    </li>
                ))}
            </ul>
        )}
        </>
    );
}

export default HomePageView;
