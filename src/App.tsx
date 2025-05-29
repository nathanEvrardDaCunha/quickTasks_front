import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Login from './features/login/Login';
import Register from './features/register/Register';
import Today from './features/today/Today';

// In index.html:
// TO-DO: Add all generic meta tag.
// TO-DO: Add robot meta tag.
// TO-DO: Add all OG meta tag.
// TO-DO: Add all Twitter meta tag.
// TO-DO: Add website icon.

const queryClient = new QueryClient();

// The "/today" route should required being connected and having a accessToken (which will be validated on the server side).

// TO-CONSIDER: Add reset password during login ?
// TO-DO: Add Not Found Page
// TO-DO: Add Logout Page
// TO-DO: Form (register/login/logout) should redirect to the next page

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/today', element: <Today /> },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
