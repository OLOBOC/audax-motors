import { VEHICLES } from '../data/vehicles';

const STORAGE_KEYS = {
  VEHICLES: 'audax_vehicles_data_v1',
  PURCHASE_REQUESTS: 'audax_purchase_requests_v1',
  CONTACTS: 'audax_contacts_v1',
  AUTH: 'audax_auth_session_v1',
  SETTINGS: 'audax_settings_v1',
};

const EVENT_DATA_CHANGED = 'audax-data-changed';

function emitDataChange(entity) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_DATA_CHANGED, { detail: { entity } }));
  }
}

// Initial seed purchase requests for realistic demo presentation
const INITIAL_PURCHASE_REQUESTS = [
  {
    id: 'SOL-101',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4h ago
    status: 'Nueva',
    brand: 'Audi',
    model: 'A3 Sportback S-Line',
    year: '2020',
    mileage: '74000',
    fuel: 'Diésel',
    name: 'David Fernández',
    phone: '654 321 987',
    email: 'david.fdez@gmail.com',
    comments: 'Coche nacional, único dueño. Mantenimientos siempre en concesionario oficial Audi Tartiere Auto. ITV pasada en mayo.',
    photos: [],
    notes: 'Interesado en tasación rápida. Posible permuta por Mercedes CLA.'
  },
  {
    id: 'SOL-102',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(), // Yesterday
    status: 'Valorando',
    brand: 'Volkswagen',
    model: 'Golf GTI MK7.5 Performance',
    year: '2019',
    mileage: '62000',
    fuel: 'Gasolina',
    name: 'Marcos Menéndez',
    phone: '612 876 543',
    email: 'm.menendez@outlook.es',
    comments: 'Techo solar, llantas 19 Brescia, escape homologado. Muy mimado.',
    photos: [],
    notes: 'Pendiente de prueba mecánica en elevador el próximo jueves.'
  }
];

// Initial seed contacts for realistic demo presentation
const INITIAL_CONTACTS = [
  {
    id: 'CON-201',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2h ago
    status: 'Nuevo',
    name: 'Alejandro Suárez',
    phone: '689 123 456',
    email: 'alejandro.suarez@empresa.com',
    message: 'Buenas tardes. Me interesa mucho el Mercedes CLA AMG Line. ¿Sería posible concertar una cita previa este sábado por la mañana para verlo en la nave?',
    vehicle: {
      id: 'mercedes-benz-cla-amg',
      brand: 'Mercedes-Benz',
      model: 'CLA Coupé AMG Line',
      price: '24.500 €',
      slug: 'mercedes-benz-cla-amg'
    },
    notes: ''
  },
  {
    id: 'CON-202',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'Contactado',
    name: 'Laura García',
    phone: '670 998 877',
    email: 'laura.garcia@gmail.com',
    message: 'Hola, quería información sobre la furgoneta camper Ducato. ¿Tiene placa solar y calefacción estacionaria homologada en ficha técnica?',
    vehicle: {
      id: 'fiat-camper-van-autocaravana',
      brand: 'Camper',
      model: 'Ducato Camper Van',
      price: '39.900 €',
      slug: 'fiat-camper-van-autocaravana'
    },
    notes: 'Respondido por WhatsApp confirmando ficha técnica homologada.'
  }
];

export const storageService = {
  // ─── VEHICLES ──────────────────────────────────────────────────────────
  getVehicles() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VEHICLES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading vehicles from localStorage:', e);
    }
    // Initialize with default VEHICLES seed with guaranteed status
    const initialized = VEHICLES.map((v) => ({
      ...v,
      status: v.isSold || v.status === 'Vendido' ? 'Vendido' : v.status || 'Disponible',
      isSold: v.isSold || v.status === 'Vendido',
      isReserved: v.status === 'Reservado',
      createdAt: v.createdAt || new Date().toISOString(),
      updatedAt: v.updatedAt || new Date().toISOString()
    }));
    this.saveVehicles(initialized, false);
    return initialized;
  },

  saveVehicles(vehicles, emit = true) {
    try {
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
      if (emit) emitDataChange('vehicles');
    } catch (e) {
      console.error('Error saving vehicles to localStorage:', e);
    }
  },

  getVehicleById(idOrSlug) {
    const list = this.getVehicles();
    return list.find((v) => v.id === idOrSlug || v.slug === idOrSlug) || null;
  },

  addVehicle(vehicleData) {
    const list = this.getVehicles();
    const id = vehicleData.id || `veh-${Date.now()}`;
    const slug = vehicleData.slug || `${vehicleData.brand}-${vehicleData.model}-${vehicleData.year}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newVehicle = {
      ...vehicleData,
      id,
      slug,
      status: vehicleData.status || 'Disponible',
      isSold: vehicleData.status === 'Vendido',
      isReserved: vehicleData.status === 'Reservado',
      badge: vehicleData.badge || 'Recién llegado',
      priceFormatted: vehicleData.priceFormatted || `${Number(vehicleData.price || 0).toLocaleString('es-ES')} €`,
      mileageFormatted: vehicleData.mileageFormatted || `${Number(vehicleData.mileage || 0).toLocaleString('es-ES')} km`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [newVehicle, ...list];
    this.saveVehicles(updated);
    return newVehicle;
  },

  updateVehicle(id, updates) {
    const list = this.getVehicles();
    const index = list.findIndex((v) => v.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const status = updates.status || existing.status || 'Disponible';

    const updatedVehicle = {
      ...existing,
      ...updates,
      status,
      isSold: status === 'Vendido',
      isReserved: status === 'Reservado',
      priceFormatted: updates.price !== undefined ? `${Number(updates.price).toLocaleString('es-ES')} €` : existing.priceFormatted,
      mileageFormatted: updates.mileage !== undefined ? `${Number(updates.mileage).toLocaleString('es-ES')} km` : existing.mileageFormatted,
      updatedAt: new Date().toISOString()
    };

    list[index] = updatedVehicle;
    this.saveVehicles(list);
    return updatedVehicle;
  },

  deleteVehicle(id) {
    const list = this.getVehicles();
    const filtered = list.filter((v) => v.id !== id);
    this.saveVehicles(filtered);
    return true;
  },

  setVehicleStatus(id, newStatus) {
    return this.updateVehicle(id, { status: newStatus });
  },

  setVehicleBadge(id, newBadge) {
    return this.updateVehicle(id, { badge: newBadge });
  },

  // ─── PURCHASE REQUESTS ("COMPRAR COCHES") ──────────────────────────────
  getPurchaseRequests() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PURCHASE_REQUESTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading purchase requests:', e);
    }
    this.savePurchaseRequests(INITIAL_PURCHASE_REQUESTS, false);
    return INITIAL_PURCHASE_REQUESTS;
  },

  savePurchaseRequests(requests, emit = true) {
    try {
      localStorage.setItem(STORAGE_KEYS.PURCHASE_REQUESTS, JSON.stringify(requests));
      if (emit) emitDataChange('purchase_requests');
    } catch (e) {
      console.error('Error saving purchase requests:', e);
    }
  },

  addPurchaseRequest(formData) {
    const list = this.getPurchaseRequests();
    const count = list.length + 1;
    const newRequest = {
      id: `SOL-${String(count).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'Nueva',
      brand: formData.brand || '',
      model: formData.model || '',
      year: formData.year || '',
      mileage: formData.mileage || '',
      fuel: formData.fuel || 'Gasolina',
      name: formData.name || '',
      phone: formData.phone || '',
      email: formData.email || '',
      comments: formData.comments || '',
      photos: formData.photos || formData.uploadedFiles || [],
      notes: ''
    };
    const updated = [newRequest, ...list];
    this.savePurchaseRequests(updated);
    return newRequest;
  },

  updatePurchaseRequestStatus(id, newStatus) {
    const list = this.getPurchaseRequests();
    const item = list.find((r) => r.id === id);
    if (!item) return null;
    item.status = newStatus;
    item.updatedAt = new Date().toISOString();
    this.savePurchaseRequests(list);
    return item;
  },

  updatePurchaseRequestNotes(id, notes) {
    const list = this.getPurchaseRequests();
    const item = list.find((r) => r.id === id);
    if (!item) return null;
    item.notes = notes;
    item.updatedAt = new Date().toISOString();
    this.savePurchaseRequests(list);
    return item;
  },

  deletePurchaseRequest(id) {
    const list = this.getPurchaseRequests();
    const filtered = list.filter((r) => r.id !== id);
    this.savePurchaseRequests(filtered);
    return true;
  },

  // ─── CONTACTS / INQUIRIES ──────────────────────────────────────────────
  getContacts() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading contacts:', e);
    }
    this.saveContacts(INITIAL_CONTACTS, false);
    return INITIAL_CONTACTS;
  },

  saveContacts(contacts, emit = true) {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
      if (emit) emitDataChange('contacts');
    } catch (e) {
      console.error('Error saving contacts:', e);
    }
  },

  addContact(formData) {
    const list = this.getContacts();
    const count = list.length + 1;
    const newContact = {
      id: `CON-${String(count).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'Nuevo',
      name: formData.name || '',
      phone: formData.phone || '',
      email: formData.email || '',
      message: formData.message || '',
      subject: formData.subject || 'Consulta web',
      vehicle: formData.vehicle || null,
      notes: ''
    };
    const updated = [newContact, ...list];
    this.saveContacts(updated);
    return newContact;
  },

  updateContactStatus(id, newStatus) {
    const list = this.getContacts();
    const item = list.find((c) => c.id === id);
    if (!item) return null;
    item.status = newStatus;
    item.updatedAt = new Date().toISOString();
    this.saveContacts(list);
    return item;
  },

  updateContactNotes(id, notes) {
    const list = this.getContacts();
    const item = list.find((c) => c.id === id);
    if (!item) return null;
    item.notes = notes;
    this.saveContacts(list);
    return item;
  },

  deleteContact(id) {
    const list = this.getContacts();
    const filtered = list.filter((c) => c.id !== id);
    this.saveContacts(filtered);
    return true;
  },

  // ─── AUTHENTICATION SESSION ───────────────────────────────────────────
  getSession() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading auth session:', e);
    }
    return null;
  },

  login(email, password) {
    // Standard credential check for Christian / demo access
    const validEmail = email?.trim().toLowerCase();
    if (
      (validEmail === 'cristian@audaxmotors.es' || validEmail === 'admin@audaxmotors.es' || validEmail === 'admin') &&
      (password === 'audax2026' || password === 'admin' || password === 'audax')
    ) {
      const session = {
        isAuthenticated: true,
        user: {
          name: 'Christian Rey',
          email: validEmail === 'admin' ? 'cristian@audaxmotors.es' : validEmail,
          role: 'Propietario / Administrador'
        },
        token: `session-${Date.now()}-${Math.random().toString(36).substring(2)}`,
        loginAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(session));
      emitDataChange('auth');
      return { success: true, session };
    }
    return { success: false, error: 'Credenciales no válidas. Introduce el email y contraseña autorizados.' };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    emitDataChange('auth');
  },

  isAuthenticated() {
    const session = this.getSession();
    return !!(session && session.isAuthenticated);
  },

  // ─── SETTINGS & API CONFIGURATION ──────────────────────────────────────
  getSettings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading settings:', e);
    }
    return {
      geminiApiKey: '',
      autoRefresh: true,
      customTags: [
        'Destacado',
        'Oferta',
        'Recién llegado',
        'Oportunidad',
        'Nuevo stock',
        'Entrega Inmediata',
        'Certificado Audax',
        'Camper Homologada',
        'Ocasión Garantizada'
      ]
    };
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      emitDataChange('settings');
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },

  // ─── FACTORY RESET UTILITY ─────────────────────────────────────────────
  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.VEHICLES);
    localStorage.removeItem(STORAGE_KEYS.PURCHASE_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    this.getVehicles();
    this.getPurchaseRequests();
    this.getContacts();
    emitDataChange('all');
    return true;
  },

  // ─── REACTIVE LISTENER HELPER ──────────────────────────────────────────
  subscribe(callback) {
    if (typeof window === 'undefined') return () => {};
    const handler = (e) => callback(e.detail);
    window.addEventListener(EVENT_DATA_CHANGED, handler);
    return () => window.removeEventListener(EVENT_DATA_CHANGED, handler);
  }
};
