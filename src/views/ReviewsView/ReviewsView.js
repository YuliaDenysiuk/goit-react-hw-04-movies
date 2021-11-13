// import s from './ReviewsView.module.css';
import {useState, useEffect} from 'react';
import {fetchMovieReviews} from '../../api/api';
import PendingLoader from '../../components/Loader/Loader';
import NotFoundView from '../NotFoundView/NotFoundView';

function ReviewsView({movieId}) {
    const [reviews, setReviews] = useState(null);   
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        setStatus('pending');

        fetchMovieReviews(movieId)
            .then(reviews => {
                setReviews(reviews.results);
                if (reviews.results.length === 0) {
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
    },[movieId]);

    return (
        <>
        {status === 'pending' && <PendingLoader />}

        {(status === 'rejected' || error) && <NotFoundView text={`We don't have any reviews for this movie`}/>}

        {status === 'resolved' && (
            <ul>
            {reviews.map(({id, author, content}) => (
                <li key={id}>
                    <h3>Author: {author}</h3>
                    <p>{content}</p>
                </li>
            ))}
        </ul>
        )}
        </>
    );
}

export default ReviewsView;
