<template>
  <div class="layout-container">
    <aside class="desktop-sidebar">
      <div class="sidebar-header">
        <div class="logo-box">🚀</div>
        <h2>NASA - JOSUEVASQUEZ</h2>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/" active-class="activo" exact>
          <span class="icon"></span>
          <span class="text">Panel</span>
        </router-link>
        
        <router-link to="/amenazas" active-class="activo">
          <span class="icon"></span>
          <span class="text">Amenazas</span>
        </router-link>

       <router-link to="/planetas" active-class="activo" exact>
          <span class="icon"></span>
          <span class="text">Explorar Planetas</span>
        </router-link>
      </nav>

      <!-- Botón de instalar PWA para Desktop -->
      <div class="sidebar-install" v-if="isInstallable">
        <button @click="promptInstall" class="btn-instalar">
          <span class="icon">⬇️</span> Instalar App
        </button>
      </div>
    </aside>

    <main class="main-content">
      <!-- Banner para Instalar PWA en móvil (Flotante top) -->
      <div v-if="isInstallable" class="mobile-install-banner">
        <p>Instala la App para una mejor experiencia</p>
        <button @click="promptInstall" class="btn-instalar-small">Instalar</button>
      </div>

      <slot></slot> 
    </main>

    <nav class="mobile-bottom-nav">
      <router-link to="/" active-class="activo" exact>
        <div class="nav-item-content">
          <span class="icon">📊</span>
          <span class="text">Inicio</span>
        </div>
      </router-link>
      
      <router-link to="/amenazas" active-class="activo">
        <div class="nav-item-content">
          <span class="icon">☄️</span>
          <span class="text">Alertas</span>
        </div>
      </router-link>
      <router-link to="/planetas" active-class="activo">
        <div class="nav-item-content">
          <span class="icon">🌌</span>
          <span class="text">Planetas</span>
        </div>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const deferredPrompt = ref(null);
const isInstallable = ref(false);

const handleBeforeInstallPrompt = (e) => {
  e.preventDefault();
  deferredPrompt.value = e;
  isInstallable.value = true;
};

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
});

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
});

const promptInstall = async () => {
  if (!deferredPrompt.value) return;
  deferredPrompt.value.prompt();
  const { outcome } = await deferredPrompt.value.userChoice;
  if (outcome === 'accepted') {
    isInstallable.value = false;
  }
  deferredPrompt.value = null; // ya no se puede reusar, esperar a que repita si falla
};
</script>

<style scoped>
/* VARIABLES CSS */
:root {
  --nasa-blue: #0b3d91; 
  --nasa-light-bg: #f4f7f6; /* Fondo grisáceo limpio tipo dashboard */
  --text-muted: #8aa6d6; /* Celeste apagado para lo inactivo */
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--nasa-light-bg);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* =========================================
   ESCRITORIO: SIDEBAR FONDO AZUL
========================================= */
.desktop-sidebar {
  width: 280px;
  background-color: var(--nasa-blue);
  color: rgb(95, 95, 95);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.logo-box {
  background: white; 
  color: var(--nasa-blue);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  text-decoration: none;
  color: var(--text-muted); /* Inactivo celeste */
  border-radius: 12px;
  font-weight: 500;
  transition: var(--transition-smooth);
}

/* EFECTO HOVER */
.sidebar-nav a:hover:not(.activo) {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

/* SE PINTA DE BLANCO AL HACER CLIC (ACTIVO) */
.sidebar-nav a.activo {
  background-color: white;
  color: var(--nasa-blue);
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transform: scale(1.02);
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-muted);
  font-size: 0.85rem;
  text-align: center;
}

/* =========================================
   PWA INSTALL STYLES
========================================= */
.sidebar-install {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-instalar {
  width: 100%;
  padding: 0.85rem;
  background-color: white;
  color: var(--nasa-blue);
  border: none;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-instalar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
}

.mobile-install-banner {
  display: none;
}

/* =========================================
   CONTENIDO PRINCIPAL
========================================= */
.main-content {
  flex: 1;
  padding: 2.5rem;
  height: 100vh;
  overflow-y: auto;
}

.mobile-bottom-nav {
  display: none;
}

/* =========================================
   MEDIA QUERY: LA MAGIA MÓVIL (PWA)
========================================= */
@media (max-width: 768px) {
  .desktop-sidebar {
    display: none;
  }

  .main-content {
    padding: 1rem;
    padding-bottom: 90px;
  }

  /* =========================================
   PWA MOBILE BANNER
  ========================================= */
  .mobile-install-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--nasa-blue);
    color: white;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 10px rgba(11, 61, 145, 0.2);
  }

  .mobile-install-banner p {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .btn-instalar-small {
    background: white;
    color: var(--nasa-blue);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  /* FONDO DEL LAYOUT DEL MENÚ EN AZUL */
  .mobile-bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75px;
    background-color: var(--nasa-blue); /* El fondo ahora es azul NASA */
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .mobile-bottom-nav a {
    text-decoration: none;
    color: var(--text-muted); /* Íconos inactivos en celeste apagado */
    flex: 1;
    display: flex;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }

  .nav-item-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    padding: 0.5rem 1.2rem;
    border-radius: 16px;
    transition: var(--transition-smooth);
  }

  .mobile-bottom-nav a .icon {
    font-size: 1.3rem;
    transition: transform 0.3s ease;
  }

  .mobile-bottom-nav a .text {
    font-size: 0.75rem;
    font-weight: 500;
  }

  /* SE PINTA DE BLANCO AL HACER CLIC (ESTILO PÍLDORA) */
  .mobile-bottom-nav a.activo .nav-item-content {
    background-color: white; 
    color: var(--nasa-blue); 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .mobile-bottom-nav a.activo .icon {
    transform: translateY(-2px) scale(1.1);
  }

  .mobile-bottom-nav a:active .nav-item-content {
    transform: scale(0.92);
  }
}
</style>