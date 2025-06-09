import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';
import Button from '../components/ui/Button';
import './home.scss';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <Header />

            <Main variant={'default'} style={{ gap: 0 }}>
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero__content">
                        <h1>Organize Your Life with Ease</h1>
                        <p>
                            The most intuitive task management solution to help
                            you stay focused and productive.
                        </p>
                        <Link to={'/register'}>
                            <Button type="button" variant="dark-outline">
                                Get Started Free
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features">
                    <div className="features__grid">
                        <div className="features__item">
                            <img
                                src="https://picsum.photos/seed/feature1/300/200"
                                alt="Task Organization"
                            />
                            <div className="features__item-content">
                                <h3>Smart Task Organization</h3>
                                <p>
                                    Keep your tasks organized with our intuitive
                                    interface. Categorize, organize, and track
                                    your progress effortlessly.
                                </p>
                            </div>
                        </div>
                        <div className="features__item">
                            <div className="features__item-content">
                                <h3>Boost Your Productivity</h3>
                                <p>
                                    Access powerful productivity tools to help
                                    you make the most of your time and achieve
                                    your goals.
                                </p>
                            </div>
                            <img
                                src="https://picsum.photos/seed/feature2/300/200"
                                alt="Productivity Tools"
                            />
                        </div>
                        <div className="features__item">
                            <img
                                src="https://picsum.photos/seed/feature3/300/200"
                                alt="Collaboration"
                            />
                            <div className="features__item-content">
                                <h3>Personal Focus</h3>
                                <p>
                                    Enjoy a distraction-free environment
                                    designed to prioritize your own tasks and
                                    progress with ease.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="testimonials">
                    <h2 className="testimonials__title">What Our Users Say</h2>
                    <div className="testimonials__grid">
                        <div className="testimonials__item">
                            <p>
                                "This todo app has completely transformed how I
                                manage my daily tasks. It's simple yet
                                powerful!"
                            </p>
                            <div className="testimonials__item-author">
                                <img
                                    src="https://picsum.photos/seed/user1/100/100"
                                    alt="Sarah Johnson"
                                />
                                <div>
                                    <h4>Sarah Johnson</h4>
                                    <p>Freelance Designer</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonials__item">
                            <p>
                                "The best task management solution I've ever
                                used. It helps me stay organized and focused."
                            </p>
                            <div className="testimonials__item-author">
                                <img
                                    src="https://picsum.photos/seed/user2/100/100"
                                    alt="Michael Chen"
                                />
                                <div>
                                    <h4>Michael Chen</h4>
                                    <p>Product Manager</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonials__item">
                            <p>
                                "A game-changer for our team's productivity. We
                                couldn't imagine working without it now!"
                            </p>
                            <div className="testimonials__item-author">
                                <img
                                    src="https://picsum.photos/seed/user3/100/100"
                                    alt="Emma Davis"
                                />
                                <div>
                                    <h4>Emma Davis</h4>
                                    <p>Team Lead</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta">
                    <div className="cta__content">
                        <h2>Ready to Get Started?</h2>
                        <p>
                            Join thousands of users who have already transformed
                            their productivity with our todo app.
                        </p>
                        <Link to={'/register'}>
                            <Button type="button" variant="dark-outline">
                                Sign Up Now - It's Free!
                            </Button>
                        </Link>
                    </div>
                </section>
            </Main>

            <Footer />
        </>
    );
}

export default Home;
