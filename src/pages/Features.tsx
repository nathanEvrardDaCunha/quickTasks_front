import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Heading from '../components/ui/Heading';
import Card from '../components/ui/Card';
import {
    FiCheckSquare,
    FiFilter,
    FiRefreshCw,
    FiCloud,
    FiLock,
    FiEdit3,
} from 'react-icons/fi';
import './features.scss';

export default function Features() {
    return (
        <>
            <Header />

            <Main variant="default" style={{ gap: 0 }}>
                <section className="features-hero">
                    <div className="features-hero__content">
                        <Heading variant="h1" markup="h1">
                            Powerful Features for Effortless Task Management
                        </Heading>
                        <Heading variant="p" markup="p">
                            Discover all the tools you need to stay organized
                            and productive
                        </Heading>
                    </div>
                </section>

                <section className="features-grid-parent">
                    <section className="features-grid">
                        <Card variant="column" style={{ gap: 16 }}>
                            <div className="feature-icon">
                                <FiCheckSquare />
                            </div>
                            <Heading variant="h3" markup="h3">
                                Task Creation & Management
                            </Heading>
                            <Heading variant="p" markup="p">
                                Create, update, and organize your tasks with
                                ease. Add titles, descriptions, deadlines, and
                                mark tasks as complete when done.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <div className="feature-icon">
                                <FiFilter />
                            </div>
                            <Heading variant="h3" markup="h3">
                                Smart Filtering
                            </Heading>
                            <Heading variant="p" markup="p">
                                Filter tasks by status, deadline, or project.
                                Find exactly what you need when you need it.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <div className="feature-icon">
                                <FiRefreshCw />
                            </div>
                            <Heading variant="h3" markup="h3">
                                Custom Sorting
                            </Heading>
                            <Heading variant="p" markup="p">
                                Sort your tasks by title, description, deadline,
                                or creation date in ascending or descending
                                order.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <div className="feature-icon">
                                <FiCloud />
                            </div>
                            <Heading variant="h3" markup="h3">
                                Cloud Storage
                            </Heading>
                            <Heading variant="p" markup="p">
                                Your tasks are securely stored in the cloud,
                                accessible from any device at any time.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <div className="feature-icon">
                                <FiLock />
                            </div>
                            <Heading variant="h3" markup="h3">
                                Secure Access
                            </Heading>
                            <Heading variant="p" markup="p">
                                Your data is protected with secure
                                authentication and encrypted storage.
                            </Heading>
                        </Card>

                        <Card variant="column" style={{ gap: 16 }}>
                            <div className="feature-icon">
                                <FiEdit3 />
                            </div>
                            <Heading variant="h3" markup="h3">
                                Easy Editing
                            </Heading>
                            <Heading variant="p" markup="p">
                                Update task details anytime with our intuitive
                                editing interface.
                            </Heading>
                        </Card>
                    </section>
                </section>

                <section className="features-detail">
                    <div className="features-detail__content">
                        <Heading variant="h2" markup="h2">
                            Persistent Storage
                        </Heading>
                        <Heading variant="p" markup="p">
                            Your tasks are automatically saved to our secure
                            database, ensuring you never lose important
                            information. Access your tasks from any device,
                            anytime.
                        </Heading>
                    </div>
                </section>

                <section className="features-detail features-detail--reverse">
                    <div className="features-detail__content">
                        <Heading variant="h2" markup="h2">
                            Always Online, Always Available
                        </Heading>
                        <Heading variant="p" markup="p">
                            Stay connected to your tasks wherever you go. Our
                            cloud-based system ensures your data is always
                            synchronized and up-to-date across all your devices.
                        </Heading>
                    </div>
                </section>
            </Main>

            <Footer />
        </>
    );
}
