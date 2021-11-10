import s from './Navigation.module.css';
import {NavLink} from 'react-router-dom';

function Navigation() {
    return <nav>
        <NavLink exact="true" to="/" className={s.link} activeclassname={s.activeLink}>Homes</NavLink>
        <NavLink to="/movies" className={s.link} activeclassname={s.activeLink}>Movies</NavLink>
    </nav>
}

export default Navigation;
