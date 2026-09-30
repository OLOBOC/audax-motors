import React, { useState, useMemo } from 'react';
import { VEHICLES } from '../data/vehicles';
import VehicleCard from '../components/VehicleCard';
import { Search, RotateCcw, Car, Sparkles } from 'lucide-react';

export default function VehiclesPage({ onSelectVehicle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [selectedGearbox, setSelectedGearbox] = useState('all');
  const [maxPrice, setMaxPrice] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Extract unique brands
  const brands = useMemo(() => {
    return ['all', ...Array.from(new Set(VEHICLES.map((v) => v.brand)))];
  }, []);

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((vehicle) => {
      // Search term
      const searchStr = `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.tagline}`.toLowerCase();
      if (searchTerm && !searchStr.includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'all' && vehicle.brand !== selectedBrand) {
        return false;
      }

      // Fuel
      if (selectedFuel !== 'all' && vehicle.fuel !== selectedFuel) {
        return false;
      }

      // Gearbox
      if (selectedGearbox !== 'all' && vehicle.gearbox !== selectedGearbox) {
        return false;
      }

      // Year
      if (selectedYear !== 'all' && vehicle.year !== parseInt(selectedYear, 10)) {
        return false;
      }

      // Max Price
      if (maxPrice !== 'all') {
        const numericMax = parseInt(maxPrice, 10);
        if (vehicle.price > numericMax) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedBrand, selectedFuel, selectedGearbox, selectedYear, maxPrice]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setSelectedFuel('all');
    setSelectedGearbox('all');
    setMaxPrice('all');
    setSelectedYear('all');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedBrand !== 'all' ||
    selectedFuel !== 'all' ||
    selectedGearbox !== 'all' ||
    maxPrice !== 'all' ||
    selectedYear !== 'all';

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Stock Certificado Audax Motors
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Vehículos Disponibles en Gijón
        </h1>
        <p className="text-sm text-gray-300 max-w-2xl">
          Explora nuestro catálogo de automóviles seminuevos y de ocasión con revisión en 150 puntos y garantía de 12 meses.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="glass-panel-gold rounded-2xl p-5 md:p-6 shadow-2xl space-y-4 border border-amber-500/20">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por marca, modelo o versión (ej. Civic, Mercedes AMG, CLA, Peugeot)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          
          {/* Brand */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Marca
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">Todas las marcas</option>
              {brands.filter(b => b !== 'all').map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Precio Máximo
            </label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">Cualquier precio</option>
              <option value="10000">Hasta 10.000 €</option>
              <option value="15000">Hasta 15.000 €</option>
              <option value="20000">Hasta 20.000 €</option>
              <option value="25000">Hasta 25.000 €</option>
              <option value="50000">Hasta 50.000 €</option>
              <option value="90000">Hasta 90.000 €</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Año
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">Cualquier año</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
            </select>
          </div>

          {/* Fuel */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Combustible
            </label>
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">Todos los combustibles</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Diésel">Diésel</option>
            </select>
          </div>

          {/* Gearbox */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Transmisión
            </label>
            <select
              value={selectedGearbox}
              onChange={(e) => setSelectedGearbox(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">Cualquiera</option>
              <option value="Automático">Automático</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

        </div>

        {/* Counter and Reset */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="text-gray-300">
            Mostrando <span className="text-[#D4AF37] font-bold">{filteredVehicles.length}</span> de <span className="text-white font-bold">{VEHICLES.length}</span> unidades en stock
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-white font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer filtros</span>
            </button>
          )}
        </div>

      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-3xl bg-[#0F1017] border border-white/10 space-y-4">
          <Car className="w-12 h-12 text-gray-500 mx-auto" />
          <h3 className="text-xl font-bold font-display text-white">
            No se encontraron vehículos con estos criterios
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Prueba a flexibilizar tus filtros de búsqueda para ver todo el inventario disponible.
          </p>
          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider transition-all"
            >
              Ver Todo el Inventario
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

