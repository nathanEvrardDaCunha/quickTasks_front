import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Section from '../components/ui/Section';
import Heading from '../components/ui/Heading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import './pricing.scss';

export default function Pricing() {
    return (
        <>
            <Header />

            <Main variant="default" style={{ gap: 0 }}>
                <section className="pricing-hero">
                    <div className="pricing-hero__content">
                        <Heading variant="h1" markup="h1">
                            Simple, Free Forever
                        </Heading>
                        <Heading variant="p" markup="p">
                            No hidden fees, no credit card required. Start
                            organizing your tasks today.
                        </Heading>
                    </div>
                </section>

                <section className="pricing-card">
                    <Card variant="column" style={{ gap: 24 }}>
                        <div className="pricing-card__header">
                            <Heading variant="h2" markup="h2">
                                Free Plan
                            </Heading>
                            <div className="pricing-card__price">
                                <span className="amount">$0</span>
                                <span className="period">/forever</span>
                            </div>
                        </div>

                        <ul className="pricing-card__features">
                            <li>
                                <FiCheck /> Unlimited Tasks
                            </li>
                            <li>
                                <FiCheck /> Task Categories
                            </li>
                            <li>
                                <FiCheck /> Filtering & Sorting
                            </li>
                            <li>
                                <FiCheck /> Cloud Storage
                            </li>
                            <li>
                                <FiCheck /> Secure Access
                            </li>
                            <li>
                                <FiCheck /> Cross-device Sync
                            </li>
                        </ul>

                        <Link to="/register">
                            <Button
                                type="button"
                                variant="default"
                                style={{ width: '100%' }}
                            >
                                Get Started Now
                            </Button>
                        </Link>
                    </Card>
                </section>

                <section className="pricing-faq">
                    <div className="pricing-faq__content">
                        <Heading variant="h2" markup="h2">
                            Frequently Asked Questions
                        </Heading>

                        <div className="faq-grid">
                            <Card variant="column" style={{ gap: 16 }}>
                                <Heading variant="h3" markup="h3">
                                    Is it really free?
                                </Heading>
                                <Heading variant="p" markup="p">
                                    Yes! QuickTasks is completely free to use.
                                    We believe in providing a great task
                                    management solution accessible to everyone.
                                </Heading>
                            </Card>

                            <Card variant="column" style={{ gap: 16 }}>
                                <Heading variant="h3" markup="h3">
                                    Will it stay free?
                                </Heading>
                                <Heading variant="p" markup="p">
                                    Absolutely! Our core features will always
                                    remain free. We're committed to maintaining
                                    a free, high-quality task management
                                    solution.
                                </Heading>
                            </Card>

                            <Card variant="column" style={{ gap: 16 }}>
                                <Heading variant="h3" markup="h3">
                                    Any usage limits?
                                </Heading>
                                <Heading variant="p" markup="p">
                                    No artificial limits! Create as many tasks
                                    as you need and use all features without
                                    restrictions.
                                </Heading>
                            </Card>

                            <Card variant="column" style={{ gap: 16 }}>
                                <Heading variant="h3" markup="h3">
                                    How do you support the service?
                                </Heading>
                                <Heading variant="p" markup="p">
                                    We keep our operations lean and efficient to
                                    provide this service free of charge while
                                    maintaining high quality and reliability.
                                </Heading>
                            </Card>
                        </div>
                    </div>
                </section>
            </Main>

            <Footer />
        </>
    );
}
