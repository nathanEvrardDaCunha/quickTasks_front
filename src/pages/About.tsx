import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Section from '../components/ui/Section';
import Heading from '../components/ui/Heading';
import Card from '../components/ui/Card';
import './about.scss';

export default function About() {
    return (
        <>
            <Header />

            <Main variant="default" style={{ gap: 0 }}>
                <section className="about-hero">
                    <div className="about-hero__content">
                        <Heading variant="h1" markup="h1">
                            About QuickTasks
                        </Heading>
                        <Heading variant="p" markup="p">
                            Empowering individuals to achieve more through smart
                            task management
                        </Heading>
                    </div>
                </section>

                <section className="about-mission">
                    <div className="about-mission__content">
                        <Heading variant="h2" markup="h2">
                            Our Mission
                        </Heading>
                        <Heading variant="p" markup="p">
                            At QuickTasks, we believe that everyone should have
                            access to powerful task management tools. Our
                            mission is to provide a simple, intuitive, and free
                            solution that helps people stay organized and
                            accomplish their goals.
                        </Heading>
                    </div>
                </section>

                <section className="about-values">
                    <div className="about-values__grid">
                        <Card variant="column" style={{ gap: 16 }}>
                            <Heading variant="h3" markup="h3">
                                Simplicity
                            </Heading>
                            <Heading variant="p" markup="p">
                                We believe in keeping things simple and
                                user-friendly. Our interface is designed to be
                                intuitive and easy to use, without unnecessary
                                complexity.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <Heading variant="h3" markup="h3">
                                Accessibility
                            </Heading>
                            <Heading variant="p" markup="p">
                                We're committed to making task management
                                accessible to everyone. That's why QuickTasks is
                                and will always be free to use.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <Heading variant="h3" markup="h3">
                                Privacy
                            </Heading>
                            <Heading variant="p" markup="p">
                                Your privacy is our priority. We implement
                                robust security measures to protect your data
                                and maintain your trust.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <Heading variant="h3" markup="h3">
                                Cross-Platform
                            </Heading>
                            <Heading variant="p" markup="p">
                                Access your tasks anywhere, anytime. Our
                                responsive design ensures a seamless experience
                                across all devices, from desktop to mobile.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <Heading variant="h3" markup="h3">
                                Innovation
                            </Heading>
                            <Heading variant="p" markup="p">
                                We continuously improve our platform with new
                                features and optimizations while maintaining its
                                simplicity and ease of use.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <Heading variant="h3" markup="h3">
                                Inclusivity
                            </Heading>
                            <Heading variant="p" markup="p">
                                We design with everyone in mind. Our interface
                                is optimized for visual accessibility, including
                                colorblind-friendly color schemes to ensure
                                everyone can use QuickTasks effectively.
                            </Heading>
                        </Card>
                    </div>
                </section>

                <section className="about-story">
                    <div className="about-story__content">
                        <Heading variant="h2" markup="h2">
                            Our Story
                        </Heading>
                        <Heading variant="p" markup="p">
                            QuickTasks started with a simple idea: everyone
                            deserves access to great task management tools. What
                            began as a personal project has grown into a
                            platform that helps people worldwide stay organized
                            and productive.
                        </Heading>
                        <Heading variant="p" markup="p">
                            Today, we're proud to offer a robust, free task
                            management solution that empowers individuals to
                            take control of their tasks and achieve their goals
                            efficiently.
                        </Heading>
                    </div>
                </section>
            </Main>

            <Footer />
        </>
    );
}
