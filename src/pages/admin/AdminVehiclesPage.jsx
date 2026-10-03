import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit3, Trash2, ExternalLink, Star, 
  CheckCircle2, AlertCircle, Clock, ShieldCheck, Tag
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import VehicleFormModal from './VehicleFormModal';

export default function AdminVehiclesPage({ onNavigateToVehicle }) {
  const [vehicles, setVehicles] = useState(() => storageService.getVehicles());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Disponible' | 'Reservado' | 'Vendido'
  const [selectedTagFilter, setSelectedTagFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [notification, setNotification] = useState('');

  const refreshList = () => {
    setVehicles(storageService.getVehicles());
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const searchStr = `${v.brand} ${v.model} ${v.version} ${v.badge}`.toLowerCase();
      if (searchTerm && !searchStr.includes(searchTerm.toLowerCase())) return false;
      if (statusFilter !== 'all') {
        const vStatus = v.status || (v.isSold ? 'Vendido' : 'Disponible');
        if (vStatus !== statusFilter) return false;
      }
      if (selectedTagFilter !== 'all' && v.badge !== selectedTagFilter) return false;
      return true;
    });
  }, [vehicles, searchTerm, statusFilter, selectedTagFilter]);

  // Unique tags for filter
  const allTags = useMemo(() => {
    return Array.from(new Set(vehicles.map((v) => v.badge).filter(Boolean)));
  }, [vehicles]);

  // Quick Status change
  const handleQuickStatusChange = (vehicleId, newStatus) => {
    storageService.setVehicleStatus(vehicleId, newStatus);
    refreshList();
    showNotification(`Estado de vehículo actualizado a "${newStatus}". La web pública ya lo refleja.`);
  };

  // Quick Tag change
  const handleQuickTagChange = (vehicleId, newTag) => {
    storageService.setVehicleBadge(vehicleId, newTag);
    refreshList();
    showNotification(`Etiqueta actualizada a "${newTag}".`);
  };

  // Toggle Featured
  const handleToggleFeatured = (vehicle) => {
    storageService.updateVehicle(vehicle.id, { featured: !vehicle.featured });
    refreshList();
    showNotification(vehicle.featured ? 'Vehículo quitado de destacados de portada' : 'Vehículo fijado en destacados de portada');
  };

  // Open Add modal
  const handleOpenAdd = () => {
    setVehicleToEdit(null);
    setIsModalOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (vehicle) => {
    setVehicleToEdit(vehicle);
    setIsModalOpen(true);
  };

  // Delete
  const handleDelete = (id) => {
    storageService.deleteVehicle(id);
    setDeleteConfirmId(null);
    refreshList();
    showNotification('Vehículo eliminado del inventario.');
  };

  // Save from Modal
  const handleSaveVehicle = (vehicleData) => {
    if (vehicleToEdit) {
      storageService.updateVehicle(vehicleToEdit.id, vehicleData);
      showNotification(`"${vehicleData.brand} ${vehicleData.model}" actualizado con éxito.`);
    } else {
      storageService.addVehicle(vehicleData);
      showNotification(`"${vehicleData.brand} ${vehicleData.model}" añadido al stock y publicado automáticamente.`);
    }
    setIsModalOpen(false);
    refreshList();
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

      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-display text-white">
            Inventario & Stock de Vehículos
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Gestiona coches, cambia precios, añade fotos, asigna estados (Disponible / Reservado / Vendido) y etiquetas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Vehículo</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0E0F16] border border-[#1E202E] rounded-3xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por marca, modelo o versión..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141622] border border-[#232637] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-1.5 bg-[#141622] p-1 rounded-xl border border-[#232637] overflow-x-auto">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'Disponible', label: 'Disponibles' },
              { id: 'Reservado', label: 'Reservados' },
              { id: 'Vendido', label: 'Vendidos' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  statusFilter === tab.id
                    ? 'bg-[#C5A880] text-black font-bold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <select
              value={selectedTagFilter}
              onChange={(e) => setSelectedTagFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#141622] border border-[#232637] text-white text-xs focus:outline-none focus:border-[#C5A880]"
            >
              <option value="all">Todas las etiquetas</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          )}
        </div>

        {/* Counter */}
        <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1 border-t border-[#181A26]">
          <span>
            Mostrando <strong className="text-white">{filteredVehicles.length}</strong> de <strong className="text-white">{vehicles.length}</strong> vehículos registrados
          </span>
          <span className="text-[10px] text-[#C5A880]">
            ⚡ Los cambios se sincronizan en tiempo real con la web pública
          </span>
        </div>
      </div>

      {/* Vehicles Table / Cards */}
      <div className="bg-[#0E0F16] border border-[#1E202E] rounded-3xl overflow-hidden shadow-xl">
        {filteredVehicles.length === 0 ? (
          <div className="py-16 text-center text-gray-400 space-y-2">
            <p className="text-sm font-semibold">No se encontraron vehículos con estos criterios.</p>
            <p className="text-xs text-gray-500">Prueba a limpiar los filtros o añadir un nuevo coche al catálogo.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#181A26]">
            {filteredVehicles.map((vehicle) => {
              const status = vehicle.status || (vehicle.isSold ? 'Vendido' : 'Disponible');

              return (
                <div
                  key={vehicle.id}
                  className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[#121420] transition-colors"
                >
                  {/* Left: Thumbnail & Main Info */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden bg-black border border-white/10 flex-shrink-0">
                      <img
                        src={vehicle.mainImage}
                        alt={vehicle.model}
                        className="w-full h-full object-cover"
                      />
                      {vehicle.featured && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#C5A880] text-black font-extrabold text-[8px] uppercase">
                          Portada
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                          {vehicle.brand}
                        </span>
                        <span className="text-xs font-bold text-white truncate">
                          {vehicle.model}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 truncate">
                        {vehicle.version || vehicle.tagline || 'Sin versión especificada'}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-gray-300 mt-1 flex-wrap">
                        <span>{vehicle.year}</span>
                        <span>•</span>
                        <span>{vehicle.mileageFormatted || `${vehicle.mileage} km`}</span>
                        <span>•</span>
                        <strong className="text-white">{vehicle.priceFormatted || `${vehicle.price} €`}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Status & Commercial Tag Controls */}
                  <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                    {/* Status Selector */}
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                        Estado
                      </span>
                      <select
                        value={status}
                        onChange={(e) => handleQuickStatusChange(vehicle.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          status === 'Disponible'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : status === 'Reservado'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                            : 'bg-red-950/60 text-red-300 border-red-500/40'
                        }`}
                      >
                        <option value="Disponible">🟢 Disponible</option>
                        <option value="Reservado">🟡 Reservado</option>
                        <option value="Vendido">🔴 Vendido</option>
                      </select>
                    </div>

                    {/* Commercial Tag Badge */}
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                        Etiqueta
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#1A1C2A] text-[#C5A880] border border-[#2D3048] inline-block">
                        {vehicle.badge || 'Sin etiqueta'}
                      </span>
                    </div>

                    {/* Featured toggle star */}
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                        Portada
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(vehicle)}
                        title={vehicle.featured ? 'Quitar de portada' : 'Destacar en portada'}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          vehicle.featured
                            ? 'bg-[#C5A880]/20 text-[#C5A880] border-[#C5A880]/50'
                            : 'bg-[#141622] text-gray-500 border-[#232637] hover:text-gray-300'
                        }`}
                      >
                        <Star className="w-4 h-4" fill={vehicle.featured ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end lg:self-center">
                    {/* View in public web */}
                    <button
                      type="button"
                      onClick={() => onNavigateToVehicle(vehicle)}
                      title="Ver en la web pública"
                      className="p-2 rounded-xl bg-[#161824] hover:bg-[#202336] text-gray-300 hover:text-white border border-[#25283B] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(vehicle)}
                      title="Editar ficha"
                      className="p-2 rounded-xl bg-[#161824] hover:bg-[#202336] text-[#C5A880] border border-[#25283B] transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    {deleteConfirmId === vehicle.id ? (
                      <div className="flex items-center gap-1.5 animate-in fade-in">
                        <button
                          type="button"
                          onClick={() => handleDelete(vehicle.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white text-[10px] font-bold"
                        >
                          ¿Confirmar?
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1.5 rounded-lg bg-[#222538] text-gray-300 text-[10px]"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(vehicle.id)}
                        title="Eliminar vehículo"
                        className="p-2 rounded-xl bg-[#161824] hover:bg-red-950/40 text-gray-400 hover:text-red-400 border border-[#25283B] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <VehicleFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVehicle}
        vehicleToEdit={vehicleToEdit}
      />

    </div>
  );
}
