// import s from './NotFound.module.css';

function NotFound({text}) {
    return <div>{text}</div>;
}

NotFound.defaultProps = {
    text: 'Not found',
};

export default NotFound;
