// import s from './MoviesInput,module.css';
import {useState} from 'react';

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
                type='text' 
                autoComplete='off' 
                value={movieName} 
                placeholder='Type a movie'            
                onChange={handleNameChange}>
            </input>
            <button type='submit'>Search</button>
        </form>
    );
}

export default MoviesInput;
