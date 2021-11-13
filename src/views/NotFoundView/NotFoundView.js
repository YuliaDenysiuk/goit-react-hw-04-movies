// import s from './NotFoundView.module.css';

function NotFoundView({text}) {
    return <div>{text}</div>;
}

NotFoundView.defaultProps = {
    text: 'Not found',
};

export default NotFoundView;
