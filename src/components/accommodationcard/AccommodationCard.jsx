import PropTypes from 'prop-types';

function AccommodationCard({ campgrounds }) {
    return (
        <section className='campgrounds-list'>
            {campgrounds
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((campground) => (
                    <div key={campground.id}>
                        <h5>{campground.name}</h5>
                    </div>
                ))}
        </section>
    );
}

AccommodationCard.propTypes = {
    campgrounds: PropTypes.array.isRequired,
};

export default AccommodationCard;
