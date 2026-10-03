import React, { useState, useMemo } from 'react';
import { 
  Search, MessageCircle, Phone, Mail, Clock, CheckCircle2, 
  Trash2, Car, ExternalLink, User, X
} from 'lucide-react';
import { storageService } from '../../services/storageService';

export default function AdminContactsPage({ onNavigateToVehicle }) {
  const [contacts, setContacts] = useState(() => storageService.getContacts());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [notification, setNotification] = useState('');

  const refreshList = () => {
    const list = storageService.getContacts();
    setContacts(list);
    if (selectedContact) {
      const updated = list.find((c) => c.id === selectedContact.id);
      setSelectedContact(updated || null);
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const statusOptions = ['Nuevo', 'Contactado', 'En negociación', 'Cerrado'];

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Nuevo':
        return 'bg-blue-950/70 text-blue-300 border-blue-500/40 animate-pulse';
      case 'Contactado':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/40';
      case 'En negociación':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/40';
      case 'Cerrado':
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const searchStr = `${c.id} ${c.name} ${c.phone} ${c.email} ${c.message} ${c.vehicle?.brand || ''} ${c.vehicle?.model || ''}`.toLowerCase();
      if (searchTerm && !searchStr.includes(searchTerm.toLowerCase())) return false;
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      return true;
    });
  }, [contacts, searchTerm, statusFilter]);

  const handleStatusChange = (id, newStatus) => {
    storageService.updateContactStatus(id, newStatus);
    refreshList();
    showNotification(`Contacto ${id} actualizado a "${newStatus}".`);
  };

  const handleOpenDetails = (contact) => {
    setSelectedContact(contact);
    setInternalNotes(contact.notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedContact) {
      storageService.updateContactNotes(selectedContact.id, internalNotes);
      refreshList();
      showNotification('Notas guardadas.');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`¿Eliminar consulta ${id}?`)) {
      storageService.deleteContact(id);
      setSelectedContact(null);
      refreshList();
      showNotification('Consulta eliminada.');
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
          Mensajes & Contactos de Clientes
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Consultas recibidas desde la web y fichas de vehículos, con enlace directo al coche que les interesa.
        </p>
      </div>

      {/* Filters and search */}
      <div className="bg-[#0E0F16] border border-[#1E202E] rounded-3xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, teléfono, email o mensaje..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141622] border border-[#232637] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#C5A880]"
            />
          </div>

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
                {tab === 'all' ? 'Todos' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1 border-t border-[#181A26]">
          <span>
            Mostrando <strong className="text-white">{filteredContacts.length}</strong> de <strong className="text-white">{contacts.length}</strong> mensajes
          </span>
          <span className="text-[10px] text-[#C5A880]">
            ⚡ Contacta en un clic por WhatsApp con el vehículo ya vinculado
          </span>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-[#0E0F16] border border-[#1E202E] rounded-3xl overflow-hidden shadow-xl">
        {filteredContacts.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-2">
            <p className="text-sm font-semibold">No hay mensajes con estos filtros.</p>
            <p className="text-xs text-gray-500">Cualquier mensaje enviado a través del modal de coche o formulario de contacto aparecerá aquí.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#181A26]">
            {filteredContacts.map((contact) => {
              const formattedDate = new Date(contact.createdAt).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              const cleanPhone = (contact.phone || '').replace(/\s+/g, '');
              const whatsappLink = `https://wa.me/34${cleanPhone}?text=${encodeURIComponent(
                `Hola ${contact.name}, te contacto desde Audax Motors en relación a tu consulta${contact.vehicle ? ` sobre el ${contact.vehicle.brand} ${contact.vehicle.model}` : ''}. ¿En qué podemos ayudarte?`
              )}`;

              return (
                <div
                  key={contact.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#121420] transition-colors"
                >
                  {/* Left: Info */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[#1B1E2D] text-[#C5A880] font-mono text-[11px] font-bold border border-[#2B2E42]">
                        {contact.id}
                      </span>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formattedDate}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(contact.status)}`}>
                        {contact.status}
                      </span>

                      {contact.vehicle && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#C5A880]/15 text-[#C5A880] text-[10px] font-bold border border-[#C5A880]/30 flex items-center gap-1">
                          <Car className="w-3 h-3" />
                          Interesado en: {contact.vehicle.brand} {contact.vehicle.model}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm">{contact.name}</span>
                      <span className="text-gray-400 text-xs">({contact.phone || 'Sin teléfono'})</span>
                      {contact.email && <span className="text-gray-500 text-xs">• {contact.email}</span>}
                    </div>

                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      "{contact.message}"
                    </p>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2.5 flex-wrap self-end md:self-center">
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${getStatusBadgeStyle(contact.status)}`}
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st} className="bg-[#121420] text-white">
                          {st}
                        </option>
                      ))}
                    </select>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Contactar por WhatsApp"
                      className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}?subject=${encodeURIComponent(`Audax Motors - Tu consulta sobre ${contact.vehicle ? `${contact.vehicle.brand} ${contact.vehicle.model}` : 'nuestros vehículos'}`)}`}
                        title="Enviar correo"
                        className="p-2 rounded-xl bg-[#181A28] text-white hover:bg-[#222538] border border-[#272A3E] transition-colors"
                      >
                        <Mail className="w-4 h-4 text-[#C5A880]" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleOpenDetails(contact)}
                      className="px-3 py-2 rounded-xl bg-[#C5A880] hover:bg-[#D8BC94] text-black font-extrabold text-xs uppercase tracking-wider transition-colors"
                    >
                      Ver Mensaje
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DETAIL MODAL FOR CONTACT */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedContact(null)} />

          <div className="relative w-full max-w-xl bg-[#0D0E16] border border-[#232638] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            
            <div className="flex items-start justify-between border-b border-[#1E202E] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#1B1E2D] text-[#C5A880] font-mono text-xs font-bold border border-[#2B2E42]">
                    {selectedContact.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeStyle(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                </div>
                <h2 className="text-xl font-black font-display text-white mt-1">
                  Consulta de {selectedContact.name}
                </h2>
                <div className="text-xs text-gray-400 mt-0.5">
                  Recibida el {new Date(selectedContact.createdAt).toLocaleString('es-ES')}
                </div>
              </div>

              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vehicle Interested in */}
            {selectedContact.vehicle && (
              <div className="p-4 rounded-2xl bg-[#12141F] border border-[#C5A880]/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880] block">
                  Vehículo de Interés
                </span>
                <div className="text-white font-bold text-sm flex items-center justify-between">
                  <span>{selectedContact.vehicle.brand} {selectedContact.vehicle.model}</span>
                  <span className="text-[#C5A880]">{selectedContact.vehicle.price}</span>
                </div>
              </div>
            )}

            {/* Message Body */}
            <div className="p-4 rounded-2xl bg-[#12141F] border border-[#202334] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Mensaje del Cliente
              </span>
              <p className="text-xs text-gray-200 leading-relaxed whitespace-pre-line bg-[#0A0B10] p-3 rounded-xl border border-[#181A24]">
                {selectedContact.message}
              </p>
            </div>

            {/* Client Contact Info */}
            <div className="p-4 rounded-2xl bg-[#12141F] border border-[#202334] space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Teléfono</span>
                  <strong className="text-white text-sm">{selectedContact.phone}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Email</span>
                  <strong className="text-white text-sm">{selectedContact.email || 'No aportado'}</strong>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={`https://wa.me/34${(selectedContact.phone || '').replace(/\s+/g, '')}?text=${encodeURIComponent(
                    `Hola ${selectedContact.name}, te contacto desde Audax Motors en relación a tu consulta${selectedContact.vehicle ? ` sobre el ${selectedContact.vehicle.brand} ${selectedContact.vehicle.model}` : ''}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${(selectedContact.phone || '').replace(/\s+/g, '')}`}
                  className="px-4 py-2 rounded-xl bg-[#1D2030] hover:bg-[#272B40] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span>Llamar</span>
                </a>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Notas internas
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Añade notas sobre el seguimiento de este cliente..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-xl bg-[#1E2132] text-[#C5A880] text-xs font-bold"
                >
                  Guardar
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1E202E]">
              <button
                type="button"
                onClick={() => handleDelete(selectedContact.id)}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar consulta</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="px-5 py-2 rounded-xl bg-[#181A26] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#222536]"
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
