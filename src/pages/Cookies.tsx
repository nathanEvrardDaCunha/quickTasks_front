import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Section from '../components/ui/Section';
import Heading from '../components/ui/Heading';
import Card from '../components/ui/Card';
import './cookies.scss';

export default function Cookies() {
    return (
        <>
            <Header />

            <Main variant="default" style={{ gap: 0 }}>
                <section className="cookies-hero">
                    <div className="cookies-hero__content">
                        <Heading variant="h1" markup="h1">
                            Cookie Policy
                        </Heading>
                        <Heading variant="p" markup="p">
                            We use only essential cookies to provide you with
                            the best possible experience
                        </Heading>
                    </div>
                </section>

                <section className="cookies-content">
                    <div className="cookies-grid">
                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                Our Cookie Usage
                            </Heading>
                            <Heading variant="p" markup="p">
                                QuickTasks uses only one essential cookie:
                            </Heading>
                            <ul className="cookies-list">
                                <li>
                                    <strong>refreshToken:</strong> An HttpOnly
                                    cookie used solely for maintaining your
                                    secure session and automatic login
                                    functionality
                                </li>
                            </ul>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                What We Don't Use
                            </Heading>
                            <Heading variant="p" markup="p">
                                We do not use any:
                            </Heading>
                            <ul className="cookies-list">
                                <li>Marketing or advertising cookies</li>
                                <li>Analytics cookies</li>
                                <li>Third-party cookies</li>
                                <li>Tracking cookies</li>
                            </ul>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                Cookie Security
                            </Heading>
                            <Heading variant="p" markup="p">
                                Our refreshToken cookie is:
                            </Heading>
                            <ul className="cookies-list">
                                <li>
                                    HttpOnly - Cannot be accessed by JavaScript
                                </li>
                                <li>Secure - Only transmitted over HTTPS</li>
                                <li>
                                    SameSite - Protected against CSRF attacks
                                </li>
                            </ul>
                        </Card>

                        <Card
                            variant="column"
                            style={{ gap: 24, gridColumn: '1 / -1' }}
                        >
                            <Heading variant="h2" markup="h2">
                                Cookie Control
                            </Heading>
                            <Heading variant="p" markup="p">
                                Since we only use essential cookies for
                                authentication, there are no cookie preferences
                                to manage. The refreshToken cookie is
                                automatically removed when you log out of your
                                account.
                            </Heading>
                        </Card>
                    </div>
                </section>
            </Main>

            <Footer />
        </>
    );
}
