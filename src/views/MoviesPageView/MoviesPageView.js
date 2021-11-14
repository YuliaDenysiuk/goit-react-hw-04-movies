// import s from './MoviesPageView.module.css';
import {useState, useEffect} from 'react';
import {Link, useRouteMatch, useLocation, useHistory} from 'react-router-dom';
import {fetchMoviesByName} from '../../api/api';
import MoviesInput from '../../components/MoviesInput/MoviesInput';
import PendingLoader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';

function MoviesPageView() {
    const {url} = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');

    const addMovieName = (name) => { 
        history.push({
            ...location,
            search: `qwery=${name}`,
        });
    };

    const nameForFetch = new URLSearchParams(location.search).get('qwery');

    useEffect(() => {
        if(nameForFetch === '' || location.search === '') {
            return;
        }

        setStatus('pending');

        fetchMoviesByName(nameForFetch)
            .then(movies => {
                setMovies(movies.results);
                if (movies.results.length === 0) {
                    setStatus('rejected');
                    return;
                }
                setStatus('resolved');
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setStatus('rejected');
            })
    }, [location.search, nameForFetch]);

    return (
        <>
        <MoviesInput onSubmit={addMovieName}/>

        {status === 'pending' && <PendingLoader />}

        {(status === 'rejected' || error) && <NotFound text={`Film is not found, try again`}/>}
        
        {status === 'resolved' && (
            <ul>
                {movies.map(({id, title}) => (
                    <li key={id}>
                        <Link to={{
                            pathname: `${url}/${id}`,
                            state: { from: location },
                        }}>{title}</Link>
                    </li>
                ))}
            </ul>
        )}
        </>
    );
}

export default MoviesPageView;
