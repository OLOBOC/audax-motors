import React, { useState } from 'react';
import { 
  Car, Clock, CheckCircle2, Star, MessageSquare, Inbox, 
  Plus, ArrowRight, ShieldCheck, Sparkles, AlertCircle, Phone, ExternalLink 
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import VehicleFormModal from './VehicleFormModal';

export default function AdminDashboardPage({ onNavigateTab, onNavigateToVehicle }) {
  const [vehicles, setVehicles] = useState(() => storageService.getVehicles());
  const [requests, setRequests] = useState(() => storageService.getPurchaseRequests());
  const [contacts, setContacts] = useState(() => storageService.getContacts());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshData = () => {
    setVehicles(storageService.getVehicles());
    setRequests(storageService.getPurchaseRequests());
    setContacts(storageService.getContacts());
  };

  // Metrics calculation
  const disponibles = vehicles.filter((v) => !v.isSold && v.status !== 'Vendido' && v.status !== 'Reservado').length;
  const reservados = vehicles.filter((v) => v.status === 'Reservado' || v.isReserved).length;
  const vendidos = vehicles.filter((v) => v.isSold || v.status === 'Vendido').length;
  const destacados = vehicles.filter((v) => v.featured || v.badge === 'Destacado').length;
  const nuevasSolicitudes = requests.filter((r) => r.status === 'Nueva').length;
  const nuevosContactos = contacts.filter((c) => c.status === 'Nuevo').length;

  const handleSaveVehicle = (vehicleData) => {
    storageService.addVehicle(vehicleData);
    setIsModalOpen(false);
    refreshData();
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Welcome Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#12141F] via-[#10121C] to-[#0A0B10] border border-[#232638] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Panel de Control Oficial · Audax Motors</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              Bienvenido de nuevo, Christian
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Gestiona el catálogo, actualiza estados al instante, responde solicitudes de tasación y crea anuncios comerciales con IA.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Vehículo</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 6 KEY METRIC CARDS ────────────────────────────────────────── */}
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880] mb-3 flex items-center gap-1.5">
          <span>Resumen de Operaciones</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* 1. Disponibles */}
          <div 
            onClick={() => onNavigateTab('vehicles')}
            className="p-5 rounded-2xl bg-[#0E0F16] border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <Car className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 px-2 py-0.5 rounded">Stock</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white group-hover:text-emerald-400 transition-colors">
              {disponibles}
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-semibold">
              Disponibles
            </div>
          </div>

          {/* 2. Reservados */}
          <div 
            onClick={() => onNavigateTab('vehicles')}
            className="p-5 rounded-2xl bg-[#0E0F16] border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-950/60 px-2 py-0.5 rounded">Señal</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white group-hover:text-amber-400 transition-colors">
              {reservados}
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-semibold">
              Reservados
            </div>
          </div>

          {/* 3. Vendidos */}
          <div 
            onClick={() => onNavigateTab('vehicles')}
            className="p-5 rounded-2xl bg-[#0E0F16] border border-red-500/30 hover:border-red-500/60 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between text-red-400 mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider bg-red-950/60 px-2 py-0.5 rounded">Éxito</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white group-hover:text-red-400 transition-colors">
              {vendidos}
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-semibold">
              Vendidos
            </div>
          </div>

          {/* 4. Destacados */}
          <div 
            onClick={() => onNavigateTab('vehicles')}
            className="p-5 rounded-2xl bg-[#0E0F16] border border-[#C5A880]/30 hover:border-[#C5A880]/60 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between text-[#C5A880] mb-2">
              <Star className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C5A880]/10 px-2 py-0.5 rounded">Portada</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white group-hover:text-[#C5A880] transition-colors">
              {destacados}
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-semibold">
              Destacados
            </div>
          </div>

          {/* 5. Solicitudes Tasación */}
          <div 
            onClick={() => onNavigateTab('requests')}
            className="p-5 rounded-2xl bg-[#0E0F16] border border-blue-500/30 hover:border-blue-500/60 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <Inbox className="w-5 h-5" />
              {nuevasSolicitudes > 0 && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                  {nuevasSolicitudes} nueva(s)
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white group-hover:text-blue-400 transition-colors">
              {requests.length}
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-semibold">
              Tasaciones
            </div>
          </div>

          {/* 6. Nuevos Contactos */}
          <div 
            onClick={() => onNavigateTab('contacts')}
            className="p-5 rounded-2xl bg-[#0E0F16] border border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between text-purple-400 mb-2">
              <MessageSquare className="w-5 h-5" />
              {nuevosContactos > 0 && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                  {nuevosContactos} nuevo(s)
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white group-hover:text-purple-400 transition-colors">
              {contacts.length}
            </div>
            <div className="text-[11px] text-gray-400 mt-1 font-semibold">
              Consultas
            </div>
          </div>

        </div>
      </div>

      {/* ─── TWO COLUMNS: RECENT ACTIVITY ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Recent Tasaciones / Purchase Requests (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0E0F16] border border-[#1E202E] rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1C1E2A] pb-3">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-[#C5A880]" />
              <h2 className="text-base font-bold font-display text-white">
                Últimas Solicitudes de Tasación ("Comprar coches")
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('requests')}
              className="text-xs font-bold text-[#C5A880] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Ver todas ({requests.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {requests.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500">
              No hay solicitudes registradas aún.
            </div>
          ) : (
            <div className="divide-y divide-[#181A26]">
              {requests.slice(0, 4).map((req) => (
                <div key={req.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#C5A880] font-mono">{req.id}</span>
                      <strong className="text-white text-xs font-bold truncate">
                        {req.brand} {req.model} ({req.year})
                      </strong>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5 truncate">
                      Cliente: <span className="text-gray-200">{req.name}</span> · {req.phone}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#181A28] text-gray-300 border border-[#26283B]">
                      {req.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigateTab('requests')}
                      className="px-2.5 py-1 rounded-lg bg-[#C5A880]/15 hover:bg-[#C5A880]/30 text-[#C5A880] text-xs font-bold transition-colors"
                    >
                      Revisar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Inquiries / Contacts (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0E0F16] border border-[#1E202E] rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1C1E2A] pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C5A880]" />
              <h2 className="text-base font-bold font-display text-white">
                Últimos Mensajes Web
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('contacts')}
              className="text-xs font-bold text-[#C5A880] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Ver todos ({contacts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {contacts.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500">
              No hay mensajes recientes.
            </div>
          ) : (
            <div className="divide-y divide-[#181A26]">
              {contacts.slice(0, 4).map((con) => (
                <div key={con.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-xs font-bold">{con.name}</span>
                    <span className="text-[10px] text-gray-500">
                      {new Date(con.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>

                  {con.vehicle && (
                    <div className="text-[11px] text-[#C5A880] font-semibold truncate flex items-center gap-1">
                      <Car className="w-3 h-3" />
                      <span>{con.vehicle.brand} {con.vehicle.model}</span>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 line-clamp-1 italic">
                    "{con.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Modal for adding vehicle */}
      <VehicleFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVehicle}
      />

    </div>
  );
}
