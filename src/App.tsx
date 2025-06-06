import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Login from './features/login/Login';
import Register from './features/register/Register';
import Today from './features/today/Today';
import { NotFound } from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';
import ResetPassword from './features/reset-password/ResetPassword';
import UserDashboard from './features/user/UserDashboard';

const queryClient = new QueryClient();

// Need to check on the HTML side to see for each page if they have h1, h2, h3 and h4 properly set to display a coherent content structure

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
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
