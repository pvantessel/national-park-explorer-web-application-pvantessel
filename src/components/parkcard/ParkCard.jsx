import {Link} from 'react-router-dom';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';
import stateAbbreviations from "../../constants/stateAbbreviations.jsx";

// eslint-disable-next-line react/prop-types
function ParkCard({className, linkUrl, park}) {

    const backgroundImg = park.imageUrl || noImageAvailable;
    // console.log('Background Image:', backgroundImg);

    return (
        <div className={className} style={{backgroundImage: `url(${backgroundImg})`}}>
            <div>
                <Link to={linkUrl}><h2>{park.fullName}</h2></Link>
                {park.states && ( <h4>( {stateAbbreviations[park.states.split(',')[0]] || 'Unknown'} )</h4> )}
            </div>
        </div>
    );
}

export default ParkCard;
