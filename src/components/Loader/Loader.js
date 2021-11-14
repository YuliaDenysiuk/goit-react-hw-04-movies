import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

function PendingLoader() {
    return <Loader
        type="ThreeDots"
        color="#1b7bc9"
        height={80}
        width={80}      
    />;    
}

export default PendingLoader;
