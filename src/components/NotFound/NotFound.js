import s from './NotFound.module.css';
import PropTypes from 'prop-types';

function NotFound({text}) {
    return <div className={s.error}>{text}</div>;
}

NotFound.defaultProps = {
    text: 'Not found',
};

NotFound.propTypes = {
    text: PropTypes.string,
};

export default NotFound;
