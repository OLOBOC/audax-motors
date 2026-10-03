import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import SellCarPage from './pages/SellCarPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { COMPANY_INFO } from './data/vehicles';
import { storageService } from './services/storageService';
import { MessageCircle } from 'lucide-react';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [vehicles, setVehicles] = useState(() => storageService.getVehicles());
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => storageService.isAuthenticated());
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalVehicle, setModalVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync state with browser URL & reactive storage events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      checkPathVehicle(path);
    };

    window.addEventListener('popstate', handlePopState);
    checkPathVehicle(window.location.pathname || '/');

    const unsubscribe = storageService.subscribe((detail) => {
      if (detail.entity === 'vehicles' || detail.entity === 'all') {
        const fresh = storageService.getVehicles();
        setVehicles(fresh);
        if (window.location.pathname.startsWith('/vehiculo/')) {
          checkPathVehicle(window.location.pathname, fresh);
        }
      }
      if (detail.entity === 'auth' || detail.entity === 'all') {
        setIsAdminAuthenticated(storageService.isAuthenticated());
      }
    });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      unsubscribe();
    };
  }, []);

  const checkPathVehicle = (path, list = null) => {
    if (path.startsWith('/vehiculo/')) {
      const slug = path.replace('/vehiculo/', '');
      const pool = list || storageService.getVehicles();
      const found = pool.find((v) => v.slug === slug || v.id === slug);
      if (found) {
        setSelectedVehicle(found);
      }
    }
  };

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    checkPathVehicle(path);
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    navigate(`/vehiculo/${vehicle.slug}`);
  };

  const handleOpenContactModal = (vehicle = null) => {
    setModalVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsModalOpen(false);
    setModalVehicle(null);
  };

  // Render active page
  const renderContent = () => {
    if (currentPath.startsWith('/vehiculo/')) {
      return (
        <VehicleDetailPage
          vehicle={selectedVehicle}
          onBack={() => navigate('/vehiculos')}
          onOpenContactModal={handleOpenContactModal}
        />
      );
    }

    switch (currentPath) {
      case '/vehiculos':
        return <VehiclesPage vehicles={vehicles} onSelectVehicle={handleSelectVehicle} />;
      case '/vende-tu-coche':
        return <SellCarPage />;
      case '/quienes-somos':
        return <AboutPage navigate={navigate} />;
      case '/contacto':
        return <ContactPage />;
      case '/':
      default:
        return (
          <HomePage
            vehicles={vehicles}
            navigate={navigate}
            onSelectVehicle={handleSelectVehicle}
          />
        );
    }
  };

  // Admin Route Interceptor (Protected with login)
  if (currentPath.startsWith('/admin')) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLoginPage
          onLoginSuccess={() => {
            setIsAdminAuthenticated(true);
            navigate('/admin');
          }}
          onBackToPublic={() => navigate('/')}
        />
      );
    }

    let initialTab = 'dashboard';
    if (currentPath.includes('/vehiculos')) initialTab = 'vehicles';
    if (currentPath.includes('/solicitudes')) initialTab = 'requests';
    if (currentPath.includes('/contactos')) initialTab = 'contacts';
    if (currentPath.includes('/configuracion')) initialTab = 'settings';

    return (
      <AdminLayout
        initialTab={initialTab}
        onNavigatePublic={navigate}
        onLogout={() => {
          storageService.logout();
          setIsAdminAuthenticated(false);
          navigate('/admin');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#08080A] text-[#E4E6EB] selection:bg-[#C5A880] selection:text-black">
      {/* Top Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Floating WhatsApp Quick Action */}
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/80 hover:scale-110 transition-all flex items-center justify-center border border-emerald-400/40 group"
        aria-label="Abrir chat de WhatsApp de Audax Motors"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 text-xs font-bold uppercase tracking-wider">
          ¿En qué te ayudamos?
        </span>
      </a>

      {/* Interactive Contact Modal */}
      <ContactModal
        vehicle={modalVehicle}
        isOpen={isModalOpen}
        onClose={handleCloseContactModal}
      />

      {/* Global Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}
