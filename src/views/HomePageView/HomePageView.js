import s from './HomePageView.module.css';
import {useState, useEffect} from 'react';
import {Link, useLocation } from 'react-router-dom';
import {fetchPopularMovies} from '../../api/api';
import PendingLoader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';

function HomePageView() {
    const location = useLocation();    
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        setStatus('pending');

        fetchPopularMovies()
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
            });
    }, []);
          
    return (
        <>
        {status === 'pending' && <PendingLoader />}

        {(status === 'rejected' || error) && <NotFound text={`There are no trending movies`}/>}

        {status === 'resolved' && (
            <>
            <h1 className={s.title}>Trending today</h1>
            <ul className={s.list}>
                {movies.map(({id, title}) => (
                    <li key={id} className={s.list__item}>
                        <Link to={{
                            pathname: `/movies/${id}`,
                            state: { from: location },
                        }}>{title}</Link>
                    </li>
                ))}
            </ul>
            </>
        )}
        </>
    );
}

export default HomePageView;
