# 🚗 Audax Motors — Web Oficial (v1.0.0)

Plataforma web moderna y responsiva para **Audax Motors**, compraventa de vehículos de ocasión, deportivos y seminuevos con sede en **Gijón, Asturias**.

---

## 🛠️ Tecnologías utilizadas

- **React 18** + **Vite**: Arquitectura rápida y modular.
- **Tailwind CSS**: Estilos modernos con paleta oscura y toques dorados (`#C5A880`).
- **Lucide React**: Iconografía minimalista de alta resolución.
- **Enrutamiento dinámico**: Manejo de rutas nativo con sincronización de URL para catálogo y fichas de detalle.

---

## 📂 Estructura del proyecto

```text
audax-motors/
├── public/
│   ├── cars/              # Fotografías reales de vehículos e inventario
│   └── logo.jpg           # Identidad visual de Audax Motors
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Navbar.jsx     # Barra de navegación principal y responsive
│   │   ├── Footer.jsx     # Pie de página con información legal y contacto
│   │   ├── VehicleCard.jsx# Tarjeta de presentación de cada vehículo
│   │   ├── ContactModal.jsx # Modal interactivo de solicitud de información
│   │   └── AudaxLogo.jsx  # Componente del logotipo
│   ├── pages/             # Vistas de la aplicación
│   │   ├── HomePage.jsx   # Portada, vehículos destacados y valores
│   │   ├── VehiclesPage.jsx # Catálogo con filtros interactivos
│   │   ├── VehicleDetailPage.jsx # Ficha técnica y galería de cada coche
│   │   ├── SellCarPage.jsx # Formulario interactivo de tasación de vehículos
│   │   ├── AboutPage.jsx  # Historia, fotos del equipo y entregas
│   │   └── ContactPage.jsx # Ubicación en Gijón, horarios y formulario
│   ├── data/
│   │   └── vehicles.js    # Base de datos de inventario y datos de contacto
│   ├── App.jsx            # Enrutador principal y layout global
│   ├── main.jsx           # Punto de entrada de React
│   └── index.css          # Configuración global de estilos y fuentes
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Puesta en marcha local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Construir para producción**:
   ```bash
   npm run build
   ```

---

## 🌿 Estrategia de ramas y versiones

- **`main`**: Versión estable (`v1.0.0-prueba`).
- **Tag `v1.0.0`**: Punto de guardado permanente de esta versión inicial.
- **`dev`**: Rama de desarrollo activa para realizar pruebas y nuevos cambios con total seguridad.
