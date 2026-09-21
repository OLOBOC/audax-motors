import React, { useState, useMemo } from 'react';
import { VEHICLES } from '../data/vehicles';
import VehicleCard from '../components/VehicleCard';
import { Search, Filter, RotateCcw, SlidersHorizontal, Car } from 'lucide-react';

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
      // Search
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
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
          Catálogo Oficial
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Vehículos Disponibles
        </h1>
        <p className="text-sm text-[#8E92A4] max-w-2xl">
          Explora nuestro stock de vehículos revisados en Gijón. Cada unidad cuenta con inspección previa exhaustiva y verificación de estado.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-[#101118] border border-[#1E202B] rounded-2xl p-5 shadow-xl space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#7E8295] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por marca, modelo o versión (ej. Audi RS3, BMW M4, Porsche)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#161722] border border-[#262837] text-white text-xs placeholder-[#565A6E] focus:outline-none focus:border-[#C5A880] transition-colors"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          
          {/* Brand */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#73778A] mb-1">
              Marca
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#161722] border border-[#262837] text-white focus:outline-none focus:border-[#C5A880]"
            >
              <option value="all">Todas las marcas</option>
              {brands.filter(b => b !== 'all').map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#73778A] mb-1">
              Precio Máximo
            </label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#161722] border border-[#262837] text-white focus:outline-none focus:border-[#C5A880]"
            >
              <option value="all">Cualquier precio</option>
              <option value="55000">Hasta 55.000 €</option>
              <option value="70000">Hasta 70.000 €</option>
              <option value="90000">Hasta 90.000 €</option>
              <option value="150000">Hasta 150.000 €</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#73778A] mb-1">
              Año
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#161722] border border-[#262837] text-white focus:outline-none focus:border-[#C5A880]"
            >
              <option value="all">Cualquier año</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          {/* Fuel */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#73778A] mb-1">
              Combustible
            </label>
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#161722] border border-[#262837] text-white focus:outline-none focus:border-[#C5A880]"
            >
              <option value="all">Todos</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Diésel">Diésel</option>
            </select>
          </div>

          {/* Gearbox */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#73778A] mb-1">
              Cambio
            </label>
            <select
              value={selectedGearbox}
              onChange={(e) => setSelectedGearbox(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#161722] border border-[#262837] text-white focus:outline-none focus:border-[#C5A880]"
            >
              <option value="all">Cualquiera</option>
              <option value="Automático">Automático</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

        </div>

        {/* Counter and Reset */}
        <div className="pt-2 border-t border-[#1C1E29] flex items-center justify-between text-xs">
          <div className="text-[#8E92A4]">
            Mostrando <span className="text-white font-bold">{filteredVehicles.length}</span> de <span className="text-white">{VEHICLES.length}</span> vehículos
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] hover:text-white font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
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
        <div className="py-20 text-center rounded-3xl bg-[#0F1017] border border-[#1F212D] space-y-4">
          <Car className="w-12 h-12 text-[#565A6E] mx-auto" />
          <h3 className="text-xl font-bold font-display text-white">
            No se encontraron vehículos con estos criterios
          </h3>
          <p className="text-xs text-[#8E92A4] max-w-sm mx-auto">
            Prueba a flexibilizar tus filtros de búsqueda o restablecerlos para ver todo el inventario disponible.
          </p>
          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-[#1C1E2A] hover:bg-[#252838] text-[#EAD5B5] border border-[#C5A880]/30 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Ver todos los coches
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
