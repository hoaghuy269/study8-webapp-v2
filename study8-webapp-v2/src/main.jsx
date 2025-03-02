import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import AppRoutes from "./routes/index.jsx";
import "./i18n.js";
import "./index.css";
import {ToastProvider} from "./context/ToastContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ToastProvider>
            <AppRoutes/>
        </ToastProvider>
    </StrictMode>,
)
