import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, UploadCloud, Trash2, CheckCircle2, Star, 
  Image as ImageIcon, Copy, Check, ArrowRight, Loader2, Info, Eye
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { storageService } from '../../services/storageService';

export default function VehicleFormModal({ isOpen, onClose, onSave, vehicleToEdit = null }) {
  const isEdit = !!vehicleToEdit;

  const defaultTags = [
    'Destacado',
    'Oferta',
    'Recién llegado',
    'Oportunidad',
    'Nuevo stock',
    'Entrega Inmediata',
    'Certificado Audax',
    'Camper Homologada',
    'Ocasión Garantizada'
  ];

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    version: '',
    price: '',
    monthlyPrice: '',
    year: '2020',
    mileage: '',
    fuel: 'Diésel',
    gearbox: 'Manual',
    power: '150 CV',
    doors: 5,
    seats: 5,
    color: 'Gris Metalizado',
    traction: 'Tracción delantera',
    status: 'Disponible',
    badge: 'Recién llegado',
    featured: false,
    tagline: '',
    equipment: [],
    description: '',
    mainImage: '',
    gallery: []
  });

  const [equipmentInput, setEquipmentInput] = useState('');
  const [customTagInput, setCustomTagInput] = useState('');

  // AI Generator state
  const [aiNotes, setAiNotes] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [copiedInstagram, setCopiedInstagram] = useState(false);
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'specs' | 'photos' | 'ai'

  // Initialize data on open
  useEffect(() => {
    if (vehicleToEdit) {
      setFormData({
        brand: vehicleToEdit.brand || '',
        model: vehicleToEdit.model || '',
        version: vehicleToEdit.version || '',
        price: vehicleToEdit.price || '',
        monthlyPrice: vehicleToEdit.monthlyPrice || '',
        year: vehicleToEdit.year || '2020',
        mileage: vehicleToEdit.mileage || '',
        fuel: vehicleToEdit.fuel || 'Diésel',
        gearbox: vehicleToEdit.gearbox || 'Manual',
        power: vehicleToEdit.power || '',
        doors: vehicleToEdit.doors || 5,
        seats: vehicleToEdit.seats || 5,
        color: vehicleToEdit.color || '',
        traction: vehicleToEdit.traction || 'Tracción delantera',
        status: vehicleToEdit.status || (vehicleToEdit.isSold ? 'Vendido' : 'Disponible'),
        badge: vehicleToEdit.badge || 'Recién llegado',
        featured: !!vehicleToEdit.featured,
        tagline: vehicleToEdit.tagline || '',
        equipment: Array.isArray(vehicleToEdit.equipment) ? vehicleToEdit.equipment : [],
        description: vehicleToEdit.description || '',
        mainImage: vehicleToEdit.mainImage || '',
        gallery: Array.isArray(vehicleToEdit.gallery) ? vehicleToEdit.gallery : (vehicleToEdit.mainImage ? [vehicleToEdit.mainImage] : [])
      });
      setAiNotes('');
      setAiResult(null);
    } else {
      setFormData({
        brand: '',
        model: '',
        version: '',
        price: '',
        monthlyPrice: '',
        year: '2019',
        mileage: '',
        fuel: 'Diésel',
        gearbox: 'Automático',
        power: '150 CV',
        doors: 5,
        seats: 5,
        color: 'Gris Metalizado',
        traction: 'Tracción delantera',
        status: 'Disponible',
        badge: 'Recién llegado',
        featured: false,
        tagline: '',
        equipment: [
          'Climatizador automático bizona',
          'Llantas de aleación',
          'Faros LED con sensor de luces y lluvia',
          'Sistema multimedia con pantalla táctil y Bluetooth',
          'Control de crucero y limitador de velocidad',
          'Revisión completa en taller propio Audax Motors',
          '12 meses de garantía profesional incluida'
        ],
        description: '',
        mainImage: '',
        gallery: []
      });
      setAiNotes('');
      setAiResult(null);
    }
  }, [vehicleToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle Photo upload
  const handlePhotoUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const readPromises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readPromises).then((newImages) => {
        setFormData((prev) => {
          const updatedGallery = [...prev.gallery, ...newImages];
          return {
            ...prev,
            gallery: updatedGallery,
            mainImage: prev.mainImage || newImages[0] || ''
          };
        });
      });
    }
  };

  const handleSetMainPhoto = (img) => {
    setFormData((prev) => ({ ...prev, mainImage: img }));
  };

  const handleRemovePhoto = (imgToRemove) => {
    setFormData((prev) => {
      const updatedGallery = prev.gallery.filter((img) => img !== imgToRemove);
      let newMain = prev.mainImage;
      if (prev.mainImage === imgToRemove) {
        newMain = updatedGallery[0] || '';
      }
      return {
        ...prev,
        gallery: updatedGallery,
        mainImage: newMain
      };
    });
  };

  // Add Equipment item
  const handleAddEquipment = (e) => {
    e?.preventDefault();
    if (equipmentInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        equipment: [...prev.equipment, equipmentInput.trim()]
      }));
      setEquipmentInput('');
    }
  };

  const handleRemoveEquipment = (index) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));
  };

  // Generate Ad with AI
  const handleGenerateAI = async () => {
    setAiLoading(true);
    try {
      const result = await aiService.generateVehicleListing(formData, aiNotes);
      setAiResult(result);
    } catch (err) {
      console.error('Error generating AI listing:', err);
    } finally {
      setAiLoading(false);
    }
  };

  // Apply AI result to Form
  const handleApplyAiToForm = () => {
    if (!aiResult) return;
    setFormData((prev) => ({
      ...prev,
      tagline: aiResult.tagline || prev.tagline,
      description: aiResult.description || prev.description,
      equipment: Array.isArray(aiResult.equipment) && aiResult.equipment.length > 0 ? aiResult.equipment : prev.equipment
    }));
  };

  // Copy Instagram Post
  const handleCopyInstagram = () => {
    if (aiResult?.instagramPost && navigator.clipboard) {
      navigator.clipboard.writeText(aiResult.instagramPost);
      setCopiedInstagram(true);
      setTimeout(() => setCopiedInstagram(false), 2000);
    }
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure fallback placeholder image if none uploaded
    const finalMainImage = formData.mainImage || (formData.gallery && formData.gallery[0]) || '/img/honda/civic_1.png';
    const finalGallery = formData.gallery.length > 0 ? formData.gallery : [finalMainImage];

    onSave({
      ...formData,
      price: Number(formData.price || 0),
      mileage: Number(formData.mileage || 0),
      year: Number(formData.year || 2020),
      mainImage: finalMainImage,
      gallery: finalGallery
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0D0E15] border border-[#232638] rounded-3xl shadow-2xl shadow-black overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#1E202E] flex items-center justify-between bg-[#11131C]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A880]">
              {isEdit ? 'Editar Inventario' : 'Nuevo Vehículo'}
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white mt-0.5">
              {isEdit ? `${formData.brand} ${formData.model}` : 'Añadir Vehículo al Stock'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-[#1E202E] flex gap-2 overflow-x-auto bg-[#0E0F16]">
          {[
            { id: 'general', label: '1. Datos Principales' },
            { id: 'specs', label: '2. Ficha Técnica' },
            { id: 'photos', label: '3. Fotografías' },
            { id: 'ai', label: '✨ 4. Redactor IA' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#C5A880] text-white bg-[#151724]'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ─── TAB 1: DATOS GENERALES ───────────────────────────────────── */}
          {activeTab === 'general' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Marca *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Ej. BMW, Mercedes, Honda..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="Ej. 320d Touring, CLA Coupé..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Versión / Acabado
                  </label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="Ej. M Sport 190 CV Automático"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Año *
                  </label>
                  <input
                    type="number"
                    required
                    min="1990"
                    max="2026"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Kilómetros *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    placeholder="Ej. 89000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Precio Venta (€) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ej. 24500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Cuota mensual aprox.
                  </label>
                  <input
                    type="text"
                    value={formData.monthlyPrice}
                    onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                    placeholder="Ej. 280 €/mes*"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Status and Commercial Badges */}
              <div className="p-4 rounded-2xl bg-[#131520] border border-[#222538] space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-1.5">
                  <Star className="w-4 h-4" />
                  <span>Estado del Vehículo & Etiquetas Comerciales</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Estado en el Concesionario *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A28] border border-[#282B40] text-white text-xs font-bold focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Disponible">🟢 DISPONIBLE (A la venta en la web)</option>
                      <option value="Reservado">🟡 RESERVADO (Mantiene ficha pero marcado como reservado)</option>
                      <option value="Vendido">🔴 VENDIDO (Conserva ficha pero muestra vendido y no disponible)</option>
                    </select>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Los vehículos vendidos se conservan en la base de datos y en el stock público sin borrarse.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Etiqueta Comercial Independiente
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#181A28] border border-[#282B40] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                      >
                        {defaultTags.map((tag) => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="O etiqueta propia..."
                        value={customTagInput}
                        onChange={(e) => {
                          setCustomTagInput(e.target.value);
                          if (e.target.value) setFormData({ ...formData, badge: e.target.value });
                        }}
                        className="w-36 px-3 py-2 rounded-xl bg-[#181A28] border border-[#282B40] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-200">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#C5A880] focus:ring-0 bg-[#181A28] border-[#2A2D42]"
                    />
                    <span className="font-semibold">Destacar en la Portada / Inicio de la Web Pública</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Subtítulo / Punchline Comercial
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Ej. Silueta coupé de máxima distinción con paquete AMG Line y acabados deportivos"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Descripción Comercial para la Web
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Redacta la descripción del vehículo o usa la pestaña 'Redactor IA' para generarla automáticamente..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880] resize-none"
                />
              </div>
            </div>
          )}

          {/* ─── TAB 2: ESPECIFICACIONES TÉCNICAS ─────────────────────────── */}
          {activeTab === 'specs' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Combustible
                  </label>
                  <select
                    value={formData.fuel}
                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="Diésel">Diésel</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Eléctrico">Eléctrico</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Transmisión
                  </label>
                  <select
                    value={formData.gearbox}
                    onChange={(e) => setFormData({ ...formData, gearbox: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automático">Automático</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Potencia
                  </label>
                  <input
                    type="text"
                    value={formData.power}
                    onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                    placeholder="Ej. 182 CV"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Tracción
                  </label>
                  <input
                    type="text"
                    value={formData.traction}
                    onChange={(e) => setFormData({ ...formData, traction: e.target.value })}
                    placeholder="Ej. Tracción delantera, 4x4..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Color Carrocería
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="Ej. Negro Metalizado"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Puertas
                  </label>
                  <input
                    type="number"
                    value={formData.doors}
                    onChange={(e) => setFormData({ ...formData, doors: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Plazas
                  </label>
                  <input
                    type="number"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Dynamic Equipment list */}
              <div className="space-y-3 pt-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Equipamiento y Extras Destacados
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={equipmentInput}
                    onChange={(e) => setEquipmentInput(e.target.value)}
                    placeholder="Añadir elemento (ej. Faros LED, Asientos calefactables, Cámara trasera...)"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddEquipment();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddEquipment}
                    className="px-4 py-2.5 rounded-xl bg-[#1C1F2E] hover:bg-[#25293D] text-white text-xs font-bold transition-colors"
                  >
                    Añadir
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {formData.equipment.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#12141E] border border-[#1F2231] text-xs text-gray-200"
                    >
                      <span className="truncate pr-2">• {item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEquipment(index)}
                        className="text-gray-500 hover:text-red-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 3: FOTOGRAFÍAS ────────────────────────────────────────── */}
          {activeTab === 'photos' && (
            <div className="space-y-5 animate-in fade-in">
              {/* Dropzone */}
              <div className="border-2 border-dashed border-[#262837] hover:border-[#C5A880]/50 rounded-2xl p-8 text-center bg-[#11131E] transition-colors relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-10 h-10 text-[#C5A880] mx-auto mb-2" />
                <div className="text-sm font-bold text-white">
                  Haz clic o arrastra fotografías aquí
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Sube las fotos exteriores, interiores y de detalle del coche.
                </div>
              </div>

              {/* Photo gallery preview */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Fotos seleccionadas ({formData.gallery.length})
                </div>

                {formData.gallery.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#11131E] border border-[#1E202E] text-center text-xs text-gray-500">
                    No hay fotos subidas todavía. Si no subes ninguna, se asignará una foto de muestra oficial del stock.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {formData.gallery.map((img, idx) => {
                      const isMain = formData.mainImage === img;
                      return (
                        <div
                          key={idx}
                          className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 bg-black group ${
                            isMain ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30' : 'border-[#1F2231]'
                          }`}
                        >
                          <img src={img} alt={`Foto ${idx}`} className="w-full h-full object-cover" />

                          {/* Main badge */}
                          {isMain && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#C5A880] text-black font-extrabold text-[9px] uppercase tracking-wider">
                              Portada
                            </span>
                          )}

                          {/* Hover Controls */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            {!isMain && (
                              <button
                                type="button"
                                onClick={() => handleSetMainPhoto(img)}
                                className="px-2 py-1 rounded bg-black/80 text-[#C5A880] text-[10px] font-bold border border-[#C5A880]/40"
                              >
                                Hacer Portada
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(img)}
                              className="p-1.5 rounded bg-red-600/80 text-white hover:bg-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── TAB 4: REDACTOR INTELIGENTE CON IA ───────────────────────── */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#C5A880]/15 via-[#C5A880]/5 to-transparent border border-[#C5A880]/30 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#C5A880]">
                  <Sparkles className="w-4 h-4" />
                  <span>Asistente Comercial con IA para Audax Motors</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Introduce datos rápidos o notas del vehículo y la IA generará el anuncio completo para la web pública y el texto formateado listo para publicar en Instagram.
                </p>
              </div>

              {/* Quick Input Notes */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300">
                  Notas rápidas del profesional (opcional)
                </label>
                <textarea
                  rows="3"
                  value={aiNotes}
                  onChange={(e) => setAiNotes(e.target.value)}
                  placeholder="Ej. BMW 320d 2018, 120.000 km, Automático, M Sport, Techo solar, Muy cuidado, ITV recién pasada..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141622] border border-[#242738] text-white text-xs focus:outline-none focus:border-[#C5A880] resize-none"
                />
              </div>

              {/* Generate Button */}
              <div>
                <button
                  type="button"
                  disabled={aiLoading}
                  onClick={handleGenerateAI}
                  className="w-full py-3.5 px-4 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {aiLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generando anuncio con IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>✨ Generar Anuncio con IA Ahora</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Results Presentation */}
              {aiResult && (
                <div className="space-y-4 pt-2 border-t border-[#1E202E] animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      {aiResult.source}
                    </span>
                    <button
                      type="button"
                      onClick={handleApplyAiToForm}
                      className="px-3.5 py-1.5 rounded-lg bg-[#C5A880] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D8BC94] transition-colors flex items-center gap-1.5"
                    >
                      <span>Aplicar al Vehículo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Generated Title & Tagline */}
                  <div className="p-4 rounded-2xl bg-[#12141F] border border-[#202334] space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                      Título y Subtítulo Generados
                    </div>
                    <div className="text-white font-bold text-sm">{aiResult.title}</div>
                    <div className="text-gray-300 text-xs italic">{aiResult.tagline}</div>
                  </div>

                  {/* Generated Web Description */}
                  <div className="p-4 rounded-2xl bg-[#12141F] border border-[#202334] space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                      Descripción Comercial Web
                    </div>
                    <p className="text-gray-200 text-xs leading-relaxed whitespace-pre-line">
                      {aiResult.description}
                    </p>
                  </div>

                  {/* Generated Instagram Post with Copy Button */}
                  <div className="p-4 rounded-2xl bg-[#12141F] border border-[#202334] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                        Publicación Preparada para Instagram
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyInstagram}
                        className="px-3 py-1 rounded-md bg-[#1C1F2E] hover:bg-[#25293D] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
                      >
                        {copiedInstagram ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar texto</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-gray-300 text-xs font-sans leading-relaxed whitespace-pre-line bg-[#0A0B10] p-3.5 rounded-xl border border-[#1A1D2B]">
                      {aiResult.instagramPost}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form Footer Actions */}
          <div className="pt-4 border-t border-[#1E202E] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#181A26] hover:bg-[#222534] text-gray-300 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isEdit ? 'Guardar Cambios' : 'Guardar y Publicar en Stock'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
