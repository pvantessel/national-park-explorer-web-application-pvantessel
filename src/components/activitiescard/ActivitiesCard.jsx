import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import noImageAvailable from '../../assets/images/noImageAvailable.jpg';

function ActivitiesCard({ imageUrl, classNameCard, linkUrl, activity }) {

    const backgroundImg = imageUrl || noImageAvailable;

    return (
        <div className={classNameCard} style={{ backgroundImage: `url(${backgroundImg})` }}>
            <Link to={linkUrl}>
                <h2>{activity}</h2>
            </Link>
        </div>
    );
}

ActivitiesCard.propTypes = {
    activity: PropTypes.string.isRequired,
    linkUrl: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    classNameCard: PropTypes.string.isRequired,
};

export default ActivitiesCard;