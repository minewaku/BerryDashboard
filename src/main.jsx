import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from '~/store/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider, ModalProvider, AuthProvider } from '~/store/context';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
                <ThemeProvider>
                    <ModalProvider>
                        <App />
                        <ToastContainer position="bottom-right" autoClose={3000} />
                    </ModalProvider>
                </ThemeProvider>
            </AuthProvider>
        </PersistGate>
    </Provider>
);
