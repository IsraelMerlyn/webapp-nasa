# 🚀 Dashboard Interactivo: NASA Asteroids NeoWs

Este proyecto es una prueba técnica para el rol de Ingeniero Front-End. Es un dashboard interactivo construido como una **PWA (Progressive Web App)** que visualiza datos en tiempo real sobre asteroides cercanos a la Tierra, consumiendo la API pública de la NASA (Near Earth Object Web Service).

## 🛠️ Enfoque Adoptado y Arquitectura

Para este desarrollo, se optó por un enfoque moderno y modular utilizando **Vue 3 (Composition API)** y **Vite**. 

* **Responsividad y UX (Mobile-First PWA):** Se implementó un sistema de *Layouts*. En resoluciones de escritorio, la navegación se maneja mediante un *Sidebar* tradicional. En dispositivos móviles, el layout se transforma dinámicamente en un *Bottom Navigation Bar*, homologando la experiencia nativa de una aplicación móvil.
* **Modularidad (Composables):** Toda la lógica de negocio y llamadas a la API se encapsuló en el composable `useNasaData.js`, separando estrictamente la obtención de datos de la capa de presentación (UI).
* **Visualización:** Se utilizó `Chart.js` mediante `vue-chartjs` para renderizar los datos masivos de manera eficiente.

## ⚙️ Instrucciones de Configuración y Ejecución

1. Clonar el repositorio:
   \`\`\`bash
   git clone https://github.com/TU_USUARIO/nasa-asteroids-dashboard.git
   \`\`\`
2. Instalar dependencias:
   \`\`\`bash
   cd nasa-asteroids-dashboard
   npm install
   \`\`\`
3. Configurar variables de entorno:
   Renombra el archivo `.env.example` a `.env` y coloca tu API Key de la NASA (o usa DEMO_KEY para pruebas).
   \`\`\`env
   VITE_NASA_KEY=tu_api_key_aqui
   \`\`\`
4. Ejecutar el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

## 🧠 Suposiciones y Problemas Conocidos
* **Manejo de Tasa de Peticiones (Rate Limit):** La API de la NASA usando `DEMO_KEY` tiene un límite de peticiones. Se implementó un manejo de errores amigable (*"Problemas de comunicación con Houston"*) para notificar al usuario si se excede este límite o la red falla.
* **Accesibilidad (A11y):** Se asumió la navegación por teclado completa. Se integraron etiquetas `aria-label`, `role="alert"` en el manejo de errores y `aria-live` para anunciar el estado de carga (Spinners) a los lectores de pantalla.

## 🔗 Demostración en Vivo
[Enlace a Vercel / Netlify aquí]

## 📸 Capturas de Pantalla
*(Añadir aquí las imágenes del dashboard en Desktop y Mobile)*