import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Heading from '../components/ui/Heading';
import Card from '../components/ui/Card';
import './privacy.scss';

export default function Privacy() {
    return (
        <>
            <Header />

            <Main variant="default" style={{ gap: 0 }}>
                <section className="privacy-hero">
                    <div className="privacy-hero__content">
                        <Heading variant="h1" markup="h1">
                            Privacy Policy
                        </Heading>
                        <Heading variant="p" markup="p">
                            We value your privacy and are committed to
                            protecting your personal data
                        </Heading>
                    </div>
                </section>

                <section className="privacy-content">
                    <div className="privacy-grid">
                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                Information We Collect
                            </Heading>
                            <Heading variant="p" markup="p">
                                We collect minimal information necessary to
                                provide you with our task management service:
                            </Heading>
                            <ul className="privacy-list">
                                <li>
                                    Email address for account creation and
                                    communication
                                </li>
                                <li>
                                    Task data that you create and store in the
                                    application
                                </li>
                                <li>
                                    Basic usage information to improve our
                                    service
                                </li>
                            </ul>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                How We Protect Your Data
                            </Heading>
                            <Heading variant="p" markup="p">
                                Your security is our priority. We implement
                                various security measures:
                            </Heading>
                            <ul className="privacy-list">
                                <li>
                                    Password hashing using industry-standard
                                    algorithms
                                </li>
                                <li>
                                    Secure HTTPS connections for all data
                                    transfers
                                </li>
                                <li>Regular security audits and updates</li>
                            </ul>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                Your Rights
                            </Heading>
                            <Heading variant="p" markup="p">
                                You have complete control over your data:
                            </Heading>
                            <ul className="privacy-list">
                                <li>Access your personal data</li>
                                <li>Update or correct your information</li>
                                <li>Delete your account and associated data</li>
                            </ul>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                Data Retention
                            </Heading>
                            <Heading variant="p" markup="p">
                                We keep your data only as long as necessary:
                            </Heading>
                            <ul className="privacy-list">
                                <li>
                                    Account data is retained until you delete
                                    your account
                                </li>
                                <li>
                                    Task data remains available as long as you
                                    maintain your account
                                </li>
                                <li>
                                    Deleted data is permanently removed from our
                                    systems
                                </li>
                            </ul>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                Contact Us About Privacy
                            </Heading>
                            <Heading variant="p" markup="p">
                                If you have any questions about our privacy
                                practices or would like to exercise your data
                                rights, please contact our privacy team at
                                privacy@quicktasks.com
                            </Heading>
                        </Card>
                    </div>
                </section>
            </Main>

            <Footer />
        </>
    );
}
