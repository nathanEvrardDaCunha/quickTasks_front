import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Login from './features/login/Login';
import Register from './features/register/Register';
import Today from './pages/Today';

// In index.html:
// TO-DO: Add all generic meta tag.
// TO-DO: Add robot meta tag.
// TO-DO: Add all OG meta tag.
// TO-DO: Add all Twitter meta tag.
// TO-DO: Add website icon.

const queryClient = new QueryClient();

// The "/today" route should required being connected and having a user ID.

// TO-CONSIDER: Add reset password during login ?

// TO-DO: Add Not Found Page

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
