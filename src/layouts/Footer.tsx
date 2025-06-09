import { Link } from 'react-router-dom';
import './footer.scss';

export function Footer() {
    return (
        <footer className="container__footer">
            <div className="footer__branding">
                <Link to={'/'}>
                    <img
                        src="/src/assets/favicon_io/android-chrome-192x192.png"
                        srcSet="/src/assets/favicon_io/android-chrome-192x192.png, /src/assets/favicon_io/android-chrome-512x512.png 2x"
                        alt="QuickTasks Business Icon"
                        className="footer__icon"
                        tabIndex={0}
                    />
                </Link>
                <p className="footer__copyright">
                    © 2025 QuickTasks. All rights reserved.
                </p>
            </div>

            <nav className="footer__navigation">
                <div className="footer__links">
                    <h3>Product</h3>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/features">Features</Link>
                        </li>
                        <li>
                            <Link to="/pricing">Pricing</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer__links">
                    <h3>Company</h3>
                    <ul>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer__links">
                    <h3>Legal</h3>
                    <ul>
                        <li>
                            <Link to="/privacy">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/terms">Terms of Service</Link>
                        </li>
                        <li>
                            <Link to="/cookies">Cookie Policy</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </footer>
    );
}
