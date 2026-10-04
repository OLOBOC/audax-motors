// ============================================================
// AUDAX MOTORS — CONFIGURACIÓN CENTRAL DEL PAQUETE BÁSICO
// Cambia estos datos para adaptar la demo a otro cliente
// ============================================================

export const COMPANY = {
  name: "Audax Motors",
  slogan: "Impulsados por la pasión",
  shortSlogan: "Compraventa de vehículos de ocasión",
  description: "Especialistas en compraventa y gestión integral de vehículos seleccionados en Gijón, Asturias. Pasión automovilística, transparencia y rigor en cada operación.",
  heroHeadline: "Tu concesionario de",
  heroHighlight: "confianza y selección.",
  heroSubtitle: "Compraventa y gestión de vehículos de ocasión con trato directo y revisión honesta en La Pedrera, Gijón.",

  // ─── Datos de contacto ───────────────────────────────────
  phone: "672 944 379",
  phoneRaw: "672944379",
  email: "contacto@audaxmotors.es",
  whatsappUrl: "https://wa.me/34672944379?text=Hola%20Audax%20Motors,%20me%20gustaría%20obtener%20más%20información.",

  // ─── Dirección y horario ─────────────────────────────────
  address: "Camino de las Escuelas 8, La Pedrera, Nave 6, 33390 Gijón, Asturias",
  addressShort: "La Pedrera, Nave 6 · Gijón",
  location: "Gijón, Asturias",
  schedule: "Lunes a Viernes: 09:30 – 20:00 | Sábados con cita previa",
  googleMapsUrl: "https://www.google.com/maps/place/Naves+Gijón/@43.4923465,-5.6930552,206m/data=!3m1!1e3!4m6!3m5!1s0xd36635193e5f735:0x5670ced443439b69",

  // ─── Redes sociales ──────────────────────────────────────
  instagramHandle: "@audaxmotors_",
  instagramUrl: "https://www.instagram.com/audaxmotors_/?hl=es",
  facebookUrl: "",  // Si hay Facebook, añadirlo aquí

  // ─── Métricas de confianza (Hero) ────────────────────────
  trustStats: [
    { value: "+5 Años", label: "En el sector" },
    { value: "Asturias", label: "Nos desplazamos" },
    { value: "100%", label: "Papeleo incluido" },
  ],
};

// ─── Servicios del negocio ────────────────────────────────────
// Edita estos servicios para adaptarlos a otro cliente
export const SERVICES = [
  {
    id: "compra-venta",
    icon: "Car",
    title: "Compraventa de Vehículos",
    description: "Amplia selección de vehículos de ocasión revisados y certificados. Trato directo, precios justos y total transparencia.",
    highlight: "Selección revisada",
  },
  {
    id: "tasacion",
    icon: "Calculator",
    title: "Tasación Gratuita",
    description: "Valoramos tu coche al instante. Oferta real en menos de 24h y pago inmediato al cerrar el trato. Sin complicaciones.",
    highlight: "Oferta en 24h",
  },
  {
    id: "tramitacion",
    icon: "FileText",
    title: "Tramitación Completa",
    description: "Nos encargamos de todo el papeleo: cambio de titularidad en DGT, impuestos y gestión documental incluida.",
    highlight: "Sin burocracia",
  },
  {
    id: "desplazamiento",
    icon: "MapPin",
    title: "Nos Desplazamos a Ti",
    description: "No tienes que mover tu coche. Acudimos donde estés en toda Asturias para valorarlo y cerramos el trato allí mismo.",
    highlight: "Toda Asturias",
  },
];

// ─── Galería de imágenes ─────────────────────────────────────
// Fotos del negocio, instalaciones y vehículos (no catálogo)
export const GALLERY_IMAGES = [
  { src: "/img/showroom_nanobana.jpg", alt: "Exposición Audax Motors", caption: "Nuestra exposición en Gijón" },
  { src: "/img/honda/civic_1.png", alt: "Honda Civic Sport", caption: "Vehículos seleccionados" },
  { src: "/img/mercedes/mercedes_1.png", alt: "Mercedes CLA", caption: "Amplia variedad" },
  { src: "/img/seat/ateca_1.png", alt: "SEAT Ateca FR", caption: "Coches revisados" },
  { src: "/img/opel/insignia_1.png", alt: "Opel Insignia", caption: "Calidad garantizada" },
  { src: "/img/camper/camper_1.png", alt: "Camper Ducato", caption: "Todo tipo de vehículos" },
];

// ─── Testimonios ─────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: "Rodrigo M.",
    location: "Gijón",
    rating: 5,
    date: "Hace 3 semanas",
    comment: "Compré el Honda Civic y la experiencia fue inmejorable. El coche estaba impecable tal y como me dijo Christian por WhatsApp. Revisado a fondo y con el cambio de nombre resuelto en 24h. Trato de 10.",
    tag: "Compra en exposición",
  },
  {
    name: "David G.",
    location: "Oviedo",
    rating: 5,
    date: "Hace 1 mes",
    comment: "Entregué mi coche anterior como parte de pago y me llevé el CLA. Tasación seria, sin regateos absurdos ni letra pequeña. Se nota que conocen la mecánica y cuidan lo que venden.",
    tag: "Tasación y cambio",
  },
  {
    name: "Paula & Nacho",
    location: "Avilés",
    rating: 5,
    date: "Hace 2 meses",
    comment: "Buscábamos una furgoneta fiable para viajar. Nos atendieron un sábado con cita previa en la nave y nos explicaron cada detalle con total cercanía y honestidad. Da muchísima tranquilidad.",
    tag: "Vehículo camperizado",
  },
];
