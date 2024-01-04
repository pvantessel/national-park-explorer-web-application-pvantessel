import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';
import stateAbbreviations from "../../constants/stateAbbreviations.jsx";

// eslint-disable-next-line react/prop-types
function ParkCard({classNameCard, classNameText, linkUrl, park}) {

    const backgroundImg = park.imageUrl || noImageAvailable;

    return (
        <div className={classNameCard} style={{backgroundImage: `url(${backgroundImg})`}}>
            <div className={classNameText}>
                <Link to={linkUrl}><h2>{park.fullName}</h2></Link>
                {park.states && (<h4>( {stateAbbreviations[park.states.split(',')[0]] || 'Unknown'} )</h4>)}
            </div>
        </div>
    );
}

ParkCard.propTypes = {
    park: PropTypes.object.isRequired,
}

export default ParkCard;