import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Today from './pages/Today';

// In index.html:
// TO-DO: Add all generic meta tag.
// TO-DO: Add robot meta tag.
// TO-DO: Add all OG meta tag.
// TO-DO: Add all Twitter meta tag.
// TO-DO: Add website icon.

const queryClient = new QueryClient();

// The "/today" route should required being connected and having a user ID.

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/today', element: <Today /> },
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
