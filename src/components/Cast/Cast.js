import s from './Cast.module.css';
import { useState, useEffect } from 'react';
import { fetchMovieCast } from '../../api/api';
import PendingLoader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import NotFoundImage from '../../images/imageNotFound.jpg';

function Cast({ movieId }) {
  const [actors, setActors] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const imgPath = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    setStatus('pending');

    fetchMovieCast(movieId)
      .then(actors => {
        setActors(actors.cast);
        if (actors.cast.length === 0) {
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
  }, [movieId]);

  return (
    <>
      {status === 'pending' && <PendingLoader />}

      {(status === 'rejected' || error) && (
        <NotFound text={`We don't know no one actor of this movie`} />
      )}

      {status === 'resolved' && (
        <ul className={s.actors}>
          {actors.map(({ id, name, profile_path }) => (
            <li className={s.actors__item} key={id}>
              <img 
                className={s.actors__image}
                src={profile_path ? `${imgPath}${profile_path}` : NotFoundImage}
                alt={name}
              ></img>
              <p className={s.actors__name}>{name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Cast;
