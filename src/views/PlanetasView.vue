<template>
  <MainLayout>
    <div class="header-section">
      <h1>Exploración Cósmica </h1>
      <p>Registros visuales del universo (NASA APOD)</p>
    </div>

    <div v-if="isLoading" class="grid-galeria" aria-hidden="true">
      <div v-for="n in 8" :key="n" class="card-apod skeleton-card">
        <div class="skeleton-img"></div>
        <div class="card-content">
          <div class="skeleton-text"></div>
          <div class="skeleton-text short"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="error" class="estado-error" role="alert">⚠️ {{ error }}</div>

    <div v-else class="grid-galeria">
      <router-link 
        v-for="(item, index) in galeria" 
        :key="index" 
        :to="`/planeta/${item.date}`" 
        class="card-apod real-card"
      >
        <img :src="item.thumbnail_url || item.url" :alt="item.title" loading="lazy" class="apod-img" />
        <div class="card-content">
          <h2>{{ item.title }}</h2>
          <span class="fecha">{{ item.date }}</span>
        </div>
      </router-link>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import MainLayout from '../layout/MainLayout.vue';
import { useNasaApod } from '../composables/usePlanetas';

const { galeria, isLoading, error, fetchGaleria } = useNasaApod();

onMounted(() => {
  fetchGaleria();
});
</script>

<style scoped>
.header-section { 
  background: white; 
  padding: 2rem; 
  border-radius: 16px; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02); 
  border: 1px solid rgba(0,0,0,0.03); 
  margin-bottom: 2.5rem;
}
.header-section h1 { margin-top: 0; color: #0b3d91; font-size: 2rem; }
.header-section p { color: #5f6368; font-size: 1.1rem; margin-bottom: 0; }

.grid-galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card-apod {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

.real-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.real-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(11, 61, 145, 0.15);
}

.apod-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-content h2 {
  font-size: 1.1rem;
  color: #0b3d91;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fecha {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

/* =========================================
   SKELETON LOADER
========================================= */
.skeleton-card { pointer-events: none; }

.skeleton-img {
  width: 100%;
  height: 200px;
  background: #e2e8f0;
}

.skeleton-text {
  height: 20px;
  background: #e2e8f0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.skeleton-text.short { width: 50%; }

.skeleton-img, .skeleton-text {
  background-image: linear-gradient(90deg, #e2e8f0 0px, #f8fafc 40px, #e2e8f0 80px);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>