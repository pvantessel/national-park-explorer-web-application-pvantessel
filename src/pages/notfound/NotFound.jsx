import './NotFound.css';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <main className='notfound-outer-container'>
            <section className='notfound-message'>
                <div className='notfound-message-content'>
                    <h3>Sorry, de webpagina die u probeert te bezoeken bestaat niet 🥹</h3>
                    <h5>Klik <Link to="/">hier</Link> om terug te gaan naar de HomePage.</h5>
                </div>
            </section>
        </main>
    );
}

export default NotFound;