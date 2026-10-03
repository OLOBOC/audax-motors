import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Car, Inbox, MessageSquare, Settings, 
  ExternalLink, LogOut, Menu, X, Lock
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import AdminDashboardPage from './AdminDashboardPage';
import AdminVehiclesPage from './AdminVehiclesPage';
import AdminPurchaseRequestsPage from './AdminPurchaseRequestsPage';
import AdminContactsPage from './AdminContactsPage';
import AdminSettingsPage from './AdminSettingsPage';

export default function AdminLayout({ onNavigatePublic, onLogout, initialTab = 'dashboard' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(() => storageService.getSession());
  const [counts, setCounts] = useState({ requests: 0, contacts: 0 });

  const updateCounts = () => {
    const reqs = storageService.getPurchaseRequests().filter((r) => r.status === 'Nueva').length;
    const cons = storageService.getContacts().filter((c) => c.status === 'Nuevo').length;
    setCounts({ requests: reqs, contacts: cons });
  };

  useEffect(() => {
    updateCounts();
    const unsub = storageService.subscribe(() => {
      updateCounts();
    });
    return unsub;
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vehicles', label: 'Vehículos & Stock', icon: Car },
    { id: 'requests', label: 'Solicitudes Tasación', icon: Inbox, count: counts.requests },
    { id: 'contacts', label: 'Mensajes Web', icon: MessageSquare, count: counts.contacts },
    { id: 'settings', label: 'Configuración & IA', icon: Settings }
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToVehicle = (vehicle) => {
    onNavigatePublic(`/vehiculo/${vehicle.slug}`);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'vehicles':
        return <AdminVehiclesPage onNavigateToVehicle={handleNavigateToVehicle} />;
      case 'requests':
        return <AdminPurchaseRequestsPage />;
      case 'contacts':
        return <AdminContactsPage onNavigateToVehicle={handleNavigateToVehicle} />;
      case 'settings':
        return <AdminSettingsPage />;
      case 'dashboard':
      default:
        return (
          <AdminDashboardPage
            onNavigateTab={handleSelectTab}
            onNavigateToVehicle={handleNavigateToVehicle}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-[#E4E6EB] flex flex-col selection:bg-[#C5A880] selection:text-black">
      
      {/* ─── ADMIN TOPBAR ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#0B0C12]/95 backdrop-blur-md border-b border-[#1E202E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and Brand Title */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSelectTab('dashboard')}
                className="flex items-center gap-3 text-left group"
              >
                {/* Logo image only — no AudaxLogo component to avoid text duplication */}
                <img
                  src="/img/logo_audax.png"
                  alt="Audax Motors"
                  className="h-8 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(197,168,128,0.3)]"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="flex flex-col justify-center leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black font-display text-white tracking-[0.15em] uppercase">AUDAX</span>
                    <span className="text-sm font-black font-display tracking-[0.15em] uppercase" style={{background: 'linear-gradient(135deg, #F5E3C3 0%, #C5A880 50%, #A07C50 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>MOTORS</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Lock className="w-2.5 h-2.5 text-[#C5A880]" />
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C5A880]">Panel de Gestión</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTab(item.id)}
                    className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#181A28] text-white shadow-sm border border-[#2B2E42]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A880]' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                    {item.count > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-extrabold animate-pulse">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: User Profile & Quick Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Public site link */}
              <button
                type="button"
                onClick={() => onNavigatePublic('/vehiculos')}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 font-semibold"
              >
                <span>Web Pública</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-2 pl-2 border-l border-[#1E202E]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C5A880]/30 to-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] font-black text-xs flex items-center justify-center font-display">
                  CR
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-white text-xs font-bold leading-tight">Christian Rey</div>
                  <div className="text-[10px] text-[#C5A880] leading-none">Audax Motors</div>
                </div>
              </div>

              {/* Logout button */}
              <button
                type="button"
                onClick={onLogout}
                title="Cerrar sesión"
                className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigatePublic('/')}
                className="p-2 rounded-lg bg-white/5 text-gray-300 text-xs"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#1E202E] bg-[#0E0F16] p-4 space-y-2 animate-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between ${
                    isActive ? 'bg-[#181A28] text-white border border-[#2B2E42]' : 'text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#C5A880]" />
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2 border-t border-[#1C1E2A] flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigatePublic('/')}
                className="text-xs text-gray-300 font-semibold flex items-center gap-1.5"
              >
                <span>Ir a la Web Pública</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="text-xs text-red-400 font-semibold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ─── MAIN ADMIN CONTENT ───────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {renderActiveTabContent()}
      </main>

      {/* ─── ADMIN FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-[#161824] py-4 bg-[#090A0F] text-center text-[11px] text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Audax Motors Gestión · Versión 1.2 Demo</span>
          <span className="text-gray-400">Instalaciones oficiales: Nave 6, La Pedrera · Gijón, Asturias</span>
        </div>
      </footer>

    </div>
  );
}
