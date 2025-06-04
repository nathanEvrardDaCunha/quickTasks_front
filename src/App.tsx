import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Login from './features/login/Login';
import Register from './features/register/Register';
import Today from './features/today/Today';
import { NotFound } from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
        path: '/today',
        element: (
            <ProtectedRoute>
                <Today />
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
