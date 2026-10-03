import { storageService } from './storageService';

/**
 * Servicio de Generación de Anuncios con IA para Audax Motors
 * 
 * Soporta API Real de Google Gemini (gemini-1.5-flash) mediante variable de entorno
 * VITE_GEMINI_API_KEY o configurada dinámicamente desde el panel de administración.
 * Incluye generador algorítmico contextual de respaldo si no hay clave configurada.
 */

function getApiKey() {
  const envKey = import.meta.env?.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim().length > 0) return envKey.trim();
  const settings = storageService.getSettings();
  if (settings?.geminiApiKey && settings.geminiApiKey.trim().length > 0) {
    return settings.geminiApiKey.trim();
  }
  return null;
}

export const aiService = {
  hasRealApiKey() {
    return !!getApiKey();
  },

  async generateVehicleListing(vehicleData, promptNotes = '') {
    const apiKey = getApiKey();

    const brand = vehicleData.brand || '';
    const model = vehicleData.model || '';
    const version = vehicleData.version || '';
    const year = vehicleData.year || '';
    const mileage = vehicleData.mileage || '';
    const fuel = vehicleData.fuel || '';
    const gearbox = vehicleData.gearbox || '';
    const power = vehicleData.power || '';
    const price = vehicleData.price ? `${Number(vehicleData.price).toLocaleString('es-ES')} €` : '';

    const contextText = `
Vehículo: ${brand} ${model} ${version}
Año: ${year}
Kilómetros: ${mileage} km
Combustible: ${fuel}
Cambio: ${gearbox}
Potencia: ${power}
Precio: ${price}
Notas / Detalles aportados por el profesional:
${promptNotes || 'Sin notas adicionales, generar el mejor anuncio profesional para este vehículo.'}
    `.trim();

    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `Eres el redactor comercial experto de Audax Motors, una prestigiosa boutique de compraventa de vehículos seminuevos y de ocasión en Gijón, Asturias.
Tu objetivo es redactar un anuncio comercial extraordinario y riguroso para la web y redes sociales.
Debes devolver ÚNICAMENTE un objeto JSON válido (sin markdown, sin comillas triples \`\`\`json) con esta estructura exacta:
{
  "title": "Título comercial directo y atractivo (ej. BMW 320d Touring M Sport 190 CV Automático)",
  "tagline": "Subtítulo o punchline comercial de 1 frase (máx 15 palabras)",
  "description": "Texto comercial completo para la web (2 párrafos bien redactados destacando sensaciones al volante, fiabilidad, estado de chapa/mecánica revisada en taller propio en Gijón y garantía de 12 meses)",
  "equipment": ["Lista de 6 a 8 puntos clave de equipamiento y puntos fuertes"],
  "instagramPost": "Texto completo y atractivo para Instagram con emojis acordes, desglose técnico, llamada a la acción hacia WhatsApp (672 944 379) y hashtags locales (#AudaxMotors #Gijon #Asturias #CochesOcasión #CochesAsturias etc.)"
}

Datos del vehículo:
${contextText}`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1200
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            // Clean up possible markdown code blocks if Gemini returns ```json ... ```
            const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            return {
              isRealApi: true,
              source: 'Google Gemini 1.5 Flash (API Oficial)',
              ...parsed
            };
          }
        } else {
          console.warn('Gemini API returned error status:', response.status);
        }
      } catch (err) {
        console.warn('Error connecting to Gemini API, falling back to smart local automotive copywriter:', err);
      }
    }

    // Smart Local Automotive Copywriter Fallback
    // Generates tailored content based on the actual inputs so the demo never fails
    return this.generateSmartLocalListing(vehicleData, promptNotes);
  },

  generateSmartLocalListing(vehicleData, promptNotes = '') {
    const brand = vehicleData.brand || 'Vehículo';
    const model = vehicleData.model || 'Seleccionado';
    const version = vehicleData.version || '';
    const year = vehicleData.year || '2020';
    const mileage = vehicleData.mileage ? `${Number(vehicleData.mileage).toLocaleString('es-ES')} km` : 'Pocos kilómetros';
    const fuel = vehicleData.fuel || 'Gasolina';
    const gearbox = vehicleData.gearbox || 'Manual';
    const power = vehicleData.power || '';
    const price = vehicleData.price ? `${Number(vehicleData.price).toLocaleString('es-ES')} €` : 'Consultar';

    const lowerNotes = promptNotes.toLowerCase();
    const hasMSport = lowerNotes.includes('m sport') || lowerNotes.includes('amg') || lowerNotes.includes('s line') || lowerNotes.includes('fr');
    const hasTecho = lowerNotes.includes('techo') || lowerNotes.includes('panorámico');
    const hasCuero = lowerNotes.includes('cuero') || lowerNotes.includes('piel');
    const hasITV = lowerNotes.includes('itv');

    const equipmentList = [
      hasMSport ? 'Paquete deportivo exterior e interior de diseño exclusivo' : 'Acabado superior con detalles estéticos cuidados',
      `Motorización ${fuel} ${power ? `con ${power} de potencia` : ''} de excelente rendimiento`,
      gearbox.toLowerCase().includes('auto') ? 'Transmisión automática de tacto suave y respuesta inmediata' : 'Caja de cambios manual de gran precisión y tacto directo',
      hasTecho ? 'Techo panorámico practicable con apertura eléctrica' : 'Faros de tecnología avanzada con excelente visibilidad nocturna',
      hasCuero ? 'Tapicería en cuero de alta calidad con sujeción ergonómica' : 'Interior confortable y ergonómico con acabados premium',
      'Sistema multimedia con conectividad Bluetooth y volante multifunción',
      hasITV ? 'ITV recién pasada y libro de mantenimientos al día' : 'Historial de mantenimiento verificado',
      'Revisión integral en taller propio de Audax Motors en Gijón y garantía de 12 meses'
    ];

    const title = `${brand} ${model} ${version ? version : ''} ${power ? `(${power})` : ''}`.trim();
    const tagline = hasMSport
      ? `Deportividad, tecnología y máxima distinción con revisión certificada en taller propio`
      : `Equilibrio perfecto entre confort, fiabilidad y elegancia con entrega inmediata`;

    const description = `Impecable unidad de ${brand} ${model}${version ? ` (${version})` : ''}, matriculada en el año ${year} y con tan solo ${mileage}. Un automóvil que combina un diseño atemporal con un comportamiento dinámico extraordinario y un consumo altamente eficiente.\n\nEn Audax Motors cada vehículo es seleccionado con el máximo rigor técnico. Ha superado una exhaustiva revisión mecánica en nuestro taller propio de La Pedrera (Gijón), garantizando el estado óptimo de mecánica, chapa e interiores. Se entrega con cambio de titularidad incluido y 12 meses de garantía profesional para tu total tranquilidad.`;

    const instagramPost = `✨ NUEVA ENTRADA EN AUDAX MOTORS ✨

🚗 ${brand} ${model} ${version}
📅 Año: ${year}
🛣️ Kilometraje: ${mileage}
⛽ Combustible: ${fuel}
⚙️ Transmisión: ${gearbox} ${power ? `(${power})` : ''}
💰 Precio: ${price}

💎 DESTACADOS:
${equipmentList.slice(0, 5).map(e => `✔️ ${e}`).join('\n')}

📍 Disponible en nuestras instalaciones de Gijón (Asturias) bajo cita previa.
🛡️ Revisado en taller propio y con 12 meses de garantía incluida.
🔄 Aceptamos tu vehículo actual como parte de pago.

📲 Más información por WhatsApp directo: 672 944 379
🌐 Catálogo completo en: audaxmotors.es

#AudaxMotors #Gijon #Asturias #${brand.replace(/\s+/g, '')} #CochesAsturias #CochesOcasión #Seminuevos #CompraventaCoches #EntregaInmediata`;

    return {
      isRealApi: false,
      source: 'Motor Inteligente Audax Copywriter (Añade VITE_GEMINI_API_KEY para Google Gemini en vivo)',
      title,
      tagline,
      description,
      equipment: equipmentList,
      instagramPost
    };
  }
};
