import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Section from '../components/ui/Section';
import Heading from '../components/ui/Heading';
import Card from '../components/ui/Card';
import Form from '../components/form/Form';
import Input from '../components/form/Input';
import Textarea from '../components/form/Textarea';
import Label from '../components/form/Label';
import Button from '../components/ui/Button';
import { FiMail, FiGithub, FiTwitter } from 'react-icons/fi';
import './contact.scss';

export default function Contact() {
    // This is a demo form - in a real app, you'd handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <>
            <Header />

            <Main variant="default" style={{ gap: 0 }}>
                <section className="contact-hero">
                    <div className="contact-hero__content">
                        <Heading variant="h1" markup="h1">
                            Get in Touch
                        </Heading>
                        <Heading variant="p" markup="p">
                            Have questions? We're here to help!
                        </Heading>
                    </div>
                </section>

                <section className="contact-content">
                    <div className="contact-grid">
                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                Contact Information
                            </Heading>

                            <div className="contact-info">
                                <div className="contact-info__item">
                                    <FiMail />
                                    <Heading variant="p" markup="p">
                                        quick.task.corp@gmail.com
                                    </Heading>
                                </div>
                                <div className="contact-info__item">
                                    <FiGithub />
                                    <Heading variant="p" markup="p">
                                        nathanEvrardDaCunha/todo-list_front
                                    </Heading>
                                </div>
                            </div>

                            <div className="contact-hours">
                                <Heading variant="h3" markup="h3">
                                    Support Hours
                                </Heading>
                                <Heading variant="p" markup="p">
                                    Monday - Friday
                                </Heading>
                                <Heading variant="p" markup="p">
                                    9:00 AM - 5:00 PM EST
                                </Heading>
                            </div>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                Send us a Message
                            </Heading>

                            <Form action={handleSubmit}>
                                <Section variant="column" style={{ gap: 4 }}>
                                    <Label htmlFor="name" style="default">
                                        Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                    />
                                </Section>

                                <Section variant="column" style={{ gap: 4 }}>
                                    <Label htmlFor="email" style="default">
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                    />
                                </Section>

                                <Section variant="column" style={{ gap: 4 }}>
                                    <Label htmlFor="message" style="default">
                                        Message
                                    </Label>
                                    <Textarea
                                        name="message"
                                        id="message"
                                        required
                                    />
                                </Section>

                                <Button type="submit" variant="default">
                                    Send Message
                                </Button>
                            </Form>
                        </Card>
                    </div>
                </section>
            </Main>

            <Footer />
        </>
    );
}
