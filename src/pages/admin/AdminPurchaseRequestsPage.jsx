import React, { useState, useMemo } from 'react';
import { 
  Search, MessageCircle, Phone, Mail, Calendar, Gauge, Fuel, 
  CheckCircle2, Clock, X, ChevronRight, FileText, Image as ImageIcon, 
  Trash2, User, Car, AlertCircle
} from 'lucide-react';
import { storageService } from '../../services/storageService';

export default function AdminPurchaseRequestsPage() {
  const [requests, setRequests] = useState(() => storageService.getPurchaseRequests());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [notification, setNotification] = useState('');

  const refreshList = () => {
    const list = storageService.getPurchaseRequests();
    setRequests(list);
    if (selectedRequest) {
      const updated = list.find((r) => r.id === selectedRequest.id);
      setSelectedRequest(updated || null);
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Status options
  const statusOptions = ['Nueva', 'Contactada', 'Valorando', 'Aceptada', 'Rechazada', 'Cerrada'];

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Nueva':
        return 'bg-blue-950/70 text-blue-300 border-blue-500/40 animate-pulse';
      case 'Contactada':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/40';
      case 'Valorando':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/40';
      case 'Aceptada':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40';
      case 'Rechazada':
        return 'bg-red-950/70 text-red-300 border-red-500/40';
      case 'Cerrada':
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const searchStr = `${r.id} ${r.name} ${r.phone} ${r.email} ${r.brand} ${r.model}`.toLowerCase();
      if (searchTerm && !searchStr.includes(searchTerm.toLowerCase())) return false;
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      return true;
    });
  }, [requests, searchTerm, statusFilter]);

  // Handle Status change
  const handleStatusChange = (id, newStatus) => {
    storageService.updatePurchaseRequestStatus(id, newStatus);
    refreshList();
    showNotification(`Solicitud ${id} actualizada a "${newStatus}".`);
  };

  // Open Details Modal
  const handleOpenDetails = (request) => {
    setSelectedRequest(request);
    setInternalNotes(request.notes || '');
  };

  // Save Notes
  const handleSaveNotes = () => {
    if (selectedRequest) {
      storageService.updatePurchaseRequestNotes(selectedRequest.id, internalNotes);
      refreshList();
      showNotification('Notas internas guardadas.');
    }
  };

  // Delete Request
  const handleDeleteRequest = (id) => {
    if (window.confirm(`¿Seguro que deseas eliminar la solicitud ${id}?`)) {
      storageService.deletePurchaseRequest(id);
      setSelectedRequest(null);
      refreshList();
      showNotification('Solicitud eliminada.');
    }
  };

  return (
    <div className="space-y-6">

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black font-display text-white">
          Solicitudes de Tasación y Compra ("Comprar coches")
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Clientes que quieren vender su vehículo a Audax Motors. Toda la información enviada por el cliente se conserva íntegra aquí.
        </p>
      </div>

      {/* Filters and search */}
      <div className="bg-[#0E0F16] border border-[#1E202E] rounded-3xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, teléfono, email, marca o modelo..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141622] border border-[#232637] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-1.5 bg-[#141622] p-1 rounded-xl border border-[#232637] overflow-x-auto">
            {['all', ...statusOptions].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  statusFilter === tab
                    ? 'bg-[#C5A880] text-black font-bold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'Todas' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1 border-t border-[#181A26]">
          <span>
            Mostrando <strong className="text-white">{filteredRequests.length}</strong> de <strong className="text-white">{requests.length}</strong> solicitudes
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">
            ✓ Guarda datos del vehículo, fotos, contacto y notas internas
          </span>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-[#0E0F16] border border-[#1E202E] rounded-3xl overflow-hidden shadow-xl">
        {filteredRequests.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-2">
            <p className="text-sm font-semibold">No hay solicitudes con estos criterios.</p>
            <p className="text-xs text-gray-500">Cuando un cliente rellene el formulario de tasación en la web, aparecerá aquí automáticamente.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#181A26]">
            {filteredRequests.map((req) => {
              const formattedDate = new Date(req.createdAt).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              const cleanPhone = (req.phone || '').replace(/\s+/g, '');
              const whatsappLink = `https://wa.me/34${cleanPhone}?text=${encodeURIComponent(
                `Hola ${req.name}, te contacto desde Audax Motors en relación a la solicitud de tasación de tu ${req.brand} ${req.model} (${req.year}).`
              )}`;

              return (
                <div
                  key={req.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#121420] transition-colors"
                >
                  {/* Left: Request ID, Date, Client & Car */}
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[#1B1E2D] text-[#C5A880] font-mono text-[11px] font-bold border border-[#2B2E42]">
                        {req.id}
                      </span>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formattedDate}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(req.status)}`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="text-white font-bold text-sm flex items-center gap-2">
                      <span>{req.brand} {req.model}</span>
                      <span className="text-gray-400 font-normal text-xs">({req.year})</span>
                    </div>

                    <div className="text-xs text-gray-300 flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-gray-400">
                        <User className="w-3.5 h-3.5 text-[#C5A880]" />
                        <strong className="text-white font-medium">{req.name}</strong>
                      </span>
                      <span>•</span>
                      <span>{req.mileage} km</span>
                      <span>•</span>
                      <span>{req.fuel}</span>
                      {req.photos && req.photos.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-[#C5A880] flex items-center gap-1 text-[11px]">
                            <ImageIcon className="w-3 h-3" /> {req.photos.length} foto(s)
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Quick Status selector & Action Buttons */}
                  <div className="flex items-center gap-2.5 flex-wrap self-end md:self-center">
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${getStatusBadgeStyle(req.status)}`}
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st} className="bg-[#121420] text-white">
                          {st}
                        </option>
                      ))}
                    </select>

                    {/* WhatsApp button */}
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Contactar al cliente por WhatsApp"
                      className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    {/* Call button */}
                    <a
                      href={`tel:${cleanPhone}`}
                      title="Llamar al cliente"
                      className="p-2 rounded-xl bg-[#181A28] text-white hover:bg-[#222538] border border-[#272A3E] transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#C5A880]" />
                    </a>

                    {/* View details drawer */}
                    <button
                      type="button"
                      onClick={() => handleOpenDetails(req)}
                      className="px-3 py-2 rounded-xl bg-[#C5A880] hover:bg-[#D8BC94] text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <span>Ver Ficha</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DETAIL MODAL / DRAWER FOR SELECTED REQUEST */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedRequest(null)} />

          <div className="relative w-full max-w-2xl bg-[#0D0E16] border border-[#232638] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#1E202E] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#1B1E2D] text-[#C5A880] font-mono text-xs font-bold border border-[#2B2E42]">
                    {selectedRequest.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-display text-white mt-1.5">
                  Tasación: {selectedRequest.brand} {selectedRequest.model}
                </h2>
                <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recibida el {new Date(selectedRequest.createdAt).toLocaleString('es-ES')}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vehicle Data Grid */}
            <div className="p-4 rounded-2xl bg-[#12141F] border border-[#202334] space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-1.5">
                <Car className="w-4 h-4" />
                <span>Datos del Vehículo Aportados por el Cliente</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Marca</span>
                  <strong className="text-white text-sm">{selectedRequest.brand}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Modelo</span>
                  <strong className="text-white text-sm">{selectedRequest.model}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Año</span>
                  <strong className="text-white text-sm">{selectedRequest.year}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Kilómetros</span>
                  <strong className="text-white text-sm">{Number(selectedRequest.mileage || 0).toLocaleString('es-ES')} km</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Combustible</span>
                  <strong className="text-white text-sm">{selectedRequest.fuel}</strong>
                </div>
              </div>

              {selectedRequest.comments && (
                <div className="pt-2 border-t border-[#1C1E2B]">
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold mb-1">
                    Comentarios y detalles adicionales del cliente
                  </span>
                  <p className="text-xs text-gray-200 bg-[#0A0B10] p-3 rounded-xl border border-[#181A24] leading-relaxed">
                    {selectedRequest.comments}
                  </p>
                </div>
              )}
            </div>

            {/* Photos if provided */}
            {selectedRequest.photos && selectedRequest.photos.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#12141F] border border-[#202334] space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>Fotografías Adjuntas ({selectedRequest.photos.length})</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedRequest.photos.map((photo, i) => (
                    <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-[#202334]">
                      {photo.url ? (
                        <img src={photo.url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-xs p-2 text-center">
                          <FileText className="w-6 h-6 mb-1 text-gray-400" />
                          <span className="truncate max-w-full">{photo.name || `Foto ${i + 1}`}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Client Info & Contact Actions */}
            <div className="p-4 rounded-2xl bg-[#12141F] border border-[#202334] space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>Datos del Propietario</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Nombre</span>
                  <strong className="text-white text-sm">{selectedRequest.name}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Teléfono</span>
                  <strong className="text-white text-sm">{selectedRequest.phone}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Email</span>
                  <strong className="text-white text-sm">{selectedRequest.email || 'No aportado'}</strong>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={`https://wa.me/34${(selectedRequest.phone || '').replace(/\s+/g, '')}?text=${encodeURIComponent(
                    `Hola ${selectedRequest.name}, te contacto desde Audax Motors en relación a la valoración de tu ${selectedRequest.brand} ${selectedRequest.model}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Abrir WhatsApp</span>
                </a>
                <a
                  href={`tel:${(selectedRequest.phone || '').replace(/\s+/g, '')}`}
                  className="px-4 py-2.5 rounded-xl bg-[#1D2030] hover:bg-[#272B40] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span>Llamar por Teléfono</span>
                </a>
              </div>
            </div>

            {/* Change Status & Internal Notes */}
            <div className="p-4 rounded-2xl bg-[#12141F] border border-[#202334] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Estado de la Solicitud
                </span>
                <select
                  value={selectedRequest.status}
                  onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${getStatusBadgeStyle(selectedRequest.status)}`}
                >
                  {statusOptions.map((st) => (
                    <option key={st} value={st} className="bg-[#121420] text-white">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Notas Internas de Cristian (solo visible en el panel)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Ej. Oferta inicial 14.500€. Pendiente de revisión de correa..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="px-4 py-2 rounded-xl bg-[#1E2132] hover:bg-[#292D44] text-[#C5A880] text-xs font-bold transition-colors"
                  >
                    Guardar Nota
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1E202E]">
              <button
                type="button"
                onClick={() => handleDeleteRequest(selectedRequest.id)}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar solicitud</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-5 py-2.5 rounded-xl bg-[#181A26] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222536]"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
