import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Heading from '../components/ui/Heading';
import Card from '../components/ui/Card';
import './terms.scss';

export default function Terms() {
    return (
        <>
            <Header />

            <Main variant="default" style={{ gap: 0 }}>
                <section className="terms-hero">
                    <div className="terms-hero__content">
                        <Heading variant="h1" markup="h1">
                            Terms of Service
                        </Heading>
                        <Heading variant="p" markup="p">
                            Please read these terms carefully before using our
                            service
                        </Heading>
                    </div>
                </section>

                <section className="terms-content">
                    <div className="terms-grid">
                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                1. Acceptance of Terms
                            </Heading>
                            <Heading variant="p" markup="p">
                                By accessing and using QuickTasks, you agree to
                                be bound by these Terms of Service and all
                                applicable laws and regulations. If you do not
                                agree with any of these terms, you are
                                prohibited from using this service.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                2. User Accounts
                            </Heading>
                            <Heading variant="p" markup="p">
                                You are responsible for maintaining the
                                confidentiality of your account credentials and
                                for all activities under your account. You must
                                immediately notify us of any unauthorized use of
                                your account.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                3. Service Usage
                            </Heading>
                            <Heading variant="p" markup="p">
                                QuickTasks is provided "as is" and is intended
                                for personal task management. You agree not to
                                misuse our service or help anyone else do so.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                4. Data Ownership
                            </Heading>
                            <Heading variant="p" markup="p">
                                You retain all rights to your data. You grant us
                                a license to host, store, and share your content
                                as needed to provide the service.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                5. Service Modifications
                            </Heading>
                            <Heading variant="p" markup="p">
                                We reserve the right to modify or discontinue
                                the service temporarily or permanently at any
                                time. We will provide notice when possible.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 24 }}>
                            <Heading variant="h2" markup="h2">
                                6. Termination
                            </Heading>
                            <Heading variant="p" markup="p">
                                We may terminate or suspend your account at any
                                time for violations of these terms. You may
                                delete your account at any time through the user
                                dashboard.
                            </Heading>
                        </Card>
                    </div>
                </section>
            </Main>

            <Footer />
        </>
    );
}
