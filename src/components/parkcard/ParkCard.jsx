import {Link} from "react-router-dom";

function ParkCard({className, linkUrl, park}) {
    return (

        <div className={className} >
            <div>
                <Link to={linkUrl}><h4>{park.fullName}</h4></Link>
            </div>
        </div>
    );
}

export default ParkCard;
