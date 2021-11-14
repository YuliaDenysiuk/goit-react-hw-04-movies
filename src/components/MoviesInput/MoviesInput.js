import s from './MoviesInput.module.css';
import {useState} from 'react';
import PropTypes from 'prop-types';

function MoviesInput({onSubmit}) {
    const [movieName, setMovieName] = useState('');
    
    const handleNameChange = (e) => {
        setMovieName(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(movieName);
        reset();
    }

    const reset = () => {
        setMovieName('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                className={s.input}
                type='text' 
                autoComplete='off' 
                value={movieName} 
                placeholder='Type a movie'            
                onChange={handleNameChange}>
            </input>
            <button className={s.input__button} type='submit'>Search</button>
        </form>
    );
}

MoviesInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default MoviesInput;
