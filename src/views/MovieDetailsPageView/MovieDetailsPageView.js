// import s from './MovieDetailsPageView.module.css';
import {Route, Link} from 'react-router-dom';
import CastView from '../CastView/CastView';
import ReviewsView from '../ReviewsView/ReviewsView';

function MovieDetailsPageView() {
    return (
        <ul>
            <li>
                <Link>
                    <Route>
                        <CastView />
                    </Route>
                </Link>
            </li>
            <li>
                <Link>
                    <Route>
                        <ReviewsView />
                    </Route>
                </Link>
            </li>
        </ul>

    )
}

export default MovieDetailsPageView;
