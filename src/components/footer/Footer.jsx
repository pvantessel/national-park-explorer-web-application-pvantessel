import './Footer.css';
import facebookIcon from "../../assets/images/icon-facebook.png";
import instagramIcon from "../../assets/images/icon-instagram.png";
import linkedInIcon from "../../assets/images/icon-linkedin.png";

function Footer() {
    return (
        <footer>
            <article className='copyright-text'>
                <div>
                    <p>Copyright © 2024, all rights reserved.</p>
                </div>
            </article>
            <article className='social-media-icons'>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                    <img className='style-icon'  src={facebookIcon} alt="Facebook-icon"/>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                    <img className='style-icon'  src={instagramIcon} alt="Instagram-icon"/>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                    <img className='style-icon'  src={linkedInIcon} alt="LinkedIn-icon"/>
                </a>
            </article>
        </footer>
    );
}

export default Footer;

