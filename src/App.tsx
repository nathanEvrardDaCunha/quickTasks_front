import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Login from './features/login/Login';
import Register from './features/register/Register';
import Today from './features/today/Today';
import { NotFound } from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';
import ResetPassword from './features/reset-password/ResetPassword';
import UserDashboard from './features/user/UserDashboard';
import UserChangePassword from './features/user/UserChangePassword';
import UserUpdateProfile from './features/user/UserUpdateProfile';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

const queryClient = new QueryClient();

// Need to check on the HTML side to see for each page if they have h1, h2, h3 and h4 properly set to display a coherent content structure

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/features', element: <Features /> },
    { path: '/pricing', element: <Pricing /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/privacy', element: <Privacy /> },
    { path: '/terms', element: <Terms /> },
    { path: '/cookies', element: <Cookies /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/reset-password', element: <ResetPassword /> },
    {
        path: '/today',
        element: (
            <ProtectedRoute>
                <Today />
            </ProtectedRoute>
        ),
    },
    {
        path: '/user',
        element: (
            <ProtectedRoute>
                <UserDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/user-change-password',
        element: (
            <ProtectedRoute>
                <UserChangePassword />
            </ProtectedRoute>
        ),
    },
    {
        path: '/user-update-profile',
        element: (
            <ProtectedRoute>
                <UserUpdateProfile />
            </ProtectedRoute>
        ),
    },
    { path: '*', element: <NotFound /> },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
