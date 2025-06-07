import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import Main from '../layouts/Main';

// Add section showcasing the service

function Home() {
    return (
        <>
            <Header />

            <Main>
                <h1>Home Page</h1>
            </Main>

            <Footer />
        </>
    );
}

export default Home;
