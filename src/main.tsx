import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

//
//
//
// Setup typescript (make it work with docker without hot reload)
//
// Test every functionalities
//
// Rewrite everything to typescript (type of param + type of output)
//
// Test every functionalities
//
//
//

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
