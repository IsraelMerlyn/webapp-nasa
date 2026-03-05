<template>
  <div class="layout-container">
    <aside class="desktop-sidebar">
      <nav>
        <h2>NASA Dash</h2>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/about">Info</router-link>
      </nav>
    </aside>

    <main class="main-content">
      <slot></slot> </main>

    <nav class="mobile-bottom-nav">
      <router-link to="/">
        <span class="icon">📊</span>
        <span>Inicio</span>
      </router-link>
      <router-link to="/about">
        <span class="icon">ℹ️</span>
        <span>Info</span>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
/* Disposición general */
.layout-container {
  display: flex;
  min-height: 100vh;
  background-color: #f4f7f6;
}

/* Sidebar para Escritorio */
.desktop-sidebar {
  width: 250px;
  background-color: #0b3d91;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* Ocultar Bottom Nav  */
.mobile-bottom-nav {
  display: none;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* estilos para movil */
@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }

  .desktop-sidebar {
    display: none;
  }

  .main-content {
    padding: 1rem;
    padding-bottom: 80px; 
  }

  /* estilo vil */
  .mobile-bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: white;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
  }
  
  .mobile-bottom-nav a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #666;
    font-size: 0.8rem;
  }
}
</style>