import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// In index.html:
// TO-DO: Add all generic meta tag.
// TO-DO: Add robot meta tag.
// TO-DO: Add all OG meta tag.
// TO-DO: Add all Twitter meta tag.
// TO-DO: Add website icon.

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
