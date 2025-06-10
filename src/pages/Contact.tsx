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
import Status from '../components/composed/Status';
import { FiMail, FiGithub } from 'react-icons/fi';
import { apiClient } from '../hooks/ApiClient';
import { useState } from 'react';
import type { ResponseSuccess, ResponseError } from '../types/responseTypes';
import './contact.scss';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<{
        type: 'success' | 'error' | 'pending' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (formData: FormData) => {
        try {
            setStatus({ type: 'pending', message: 'Sending your message...' });

            const data = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                message: formData.get('message') as string,
            };

            const response = await apiClient.contact<ResponseSuccess>(data);

            setStatus({
                type: 'success',
                message: response.message || 'Message sent successfully!',
            });

            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            const errorData = error as ResponseError;
            setStatus({
                type: 'error',
                message:
                    errorData.cause ||
                    'Failed to send message. Please try again.',
            });
        }
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

                            <div>
                                {status.type === 'success' && (
                                    <Status variant="success">
                                        {status.message}
                                    </Status>
                                )}

                                {status.type === 'error' && (
                                    <Status variant="error">
                                        {status.message}
                                    </Status>
                                )}

                                {status.type === 'pending' && (
                                    <Status variant="pending">
                                        {status.message}
                                    </Status>
                                )}
                            </div>

                            <Form action={handleSubmit}>
                                <Section variant="column" style={{ gap: 4 }}>
                                    <Label htmlFor="name" style="default">
                                        Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
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
                                        value={formData.email}
                                        onChange={handleChange}
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
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </Section>

                                <Button
                                    type="submit"
                                    variant="default"
                                    disabled={status.type === 'pending'}
                                >
                                    {status.type === 'pending'
                                        ? 'Sending...'
                                        : 'Send Message'}
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
