import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';
import stateAbbreviations from "../../constants/stateAbbreviations.jsx";

function ParkCard({classNameCard, linkUrl, park}) {

    const backgroundImg = park.imageUrl || noImageAvailable;

    return (
        <div className={classNameCard} style={{backgroundImage: `url(${backgroundImg})`}}>
            <div>
                <Link to={linkUrl}><h2>{park.fullName}</h2></Link>
                {park.states && (<h4>( {stateAbbreviations[park.states.split(',')[0]] || 'Unknown'} )</h4>)}
            </div>
        </div>
    );
}

ParkCard.propTypes = {
    park: PropTypes.object.isRequired,
    linkUrl: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    classNameCard: PropTypes.string.isRequired,
}

export default ParkCard;