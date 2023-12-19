import './NotFound.css';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <section>
            <div className="notfound-container">
                <div className="notfound-content-container">
                    <h2>Sorry, the web page you try to visit does not exist 🥹</h2>
                    <p><Link to="/">Take me back to the HomePage.</Link></p>
                </div>
            </div>


        </section>
    );
}

export default NotFound;