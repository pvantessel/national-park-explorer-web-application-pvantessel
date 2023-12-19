import {Link} from "react-router-dom";

function HomePageCard({ backgroundImg, title, linkUrl, className }) {
    return (
        <div className={className} style={{ backgroundImage: `url(${backgroundImg})`}}>
            <div>
                <Link to={linkUrl}><h2>{title}</h2></Link>
            </div>
        </div>
    );
}

export default HomePageCard;
