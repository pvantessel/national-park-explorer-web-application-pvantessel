import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import noImageAvailable from "../../assets/images/noImageAvailable.jpg";

// eslint-disable-next-line react/prop-types
function AccommodationCard({classNameCard, classNameText, campground, linkUrl}) {

    const backgroundImg = campground.imageUrl || noImageAvailable;

    return (
        <div className={classNameCard} style={{backgroundImage: `url(${backgroundImg})`}}>
            <div className={classNameText}>
                <Link to={linkUrl}><h2>{campground.name}</h2></Link>
            </div>
        </div>
    );
}

AccommodationCard.propTypes = {
    campground: PropTypes.object.isRequired,
};

export default AccommodationCard;
