import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

function PendingLoader() {
    return <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={80}
        width={80}      
    />;    
}

export default PendingLoader;
