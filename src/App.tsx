import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// In index.html:
// TO-DO: Add all generic meta tag.
// TO-DO: Add robot meta tag.
// TO-DO: Add all OG meta tag.
// TO-DO: Add all Twitter meta tag.
// TO-DO: Add website icon.

const queryClient = new QueryClient();

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
]);

// TO-CONSIDER: Add react query dev tools ?

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
