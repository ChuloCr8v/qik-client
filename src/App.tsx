import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './app/AppRoutes';
import { AuthProvider } from './features/auth/AuthProvider';
import { PopupProvider } from './context/PopupContext';

export default function App() {
  return (
    <BrowserRouter>
      <PopupProvider>
        <AuthProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: { fontSize: '12px', fontWeight: '600', borderRadius: '12px' }
            }}
          />
          <AppRoutes />
        </AuthProvider>
      </PopupProvider>
    </BrowserRouter>
  );
}
