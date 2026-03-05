<template>
  <MainLayout>
    <router-link to="/" class="btn-regresar">
      ⬅ Volver a la galería
    </router-link>

    <div v-if="registro" class="detalle-container">
      <header class="detalle-header">
        <h1>{{ registro.title }}</h1>
        <p>Fecha de captura: {{ registro.date }}</p>
        <p v-if="registro.copyright">© {{ registro.copyright }}</p>
      </header>

      <div class="contenido-visual">
        <img v-if="registro.media_type === 'image'" :src="registro.hdurl || registro.url" :alt="registro.title" class="img-detalle" />
        <iframe v-else :src="registro.url" class="video-detalle" frameborder="0" allowfullscreen></iframe>
      </div>

      <div class="explicacion">
        <h3>Reporte de la NASA:</h3>
        <p>{{ registro.explanation }}</p>
      </div>
    </div>
    
    <div v-else class="estado-error">
      <h2>Registro clasificado o no encontrado.</h2>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '../layout/MainLayout.vue';
import { useNasaApod } from '../composables/usePlanetas';

const route = useRoute();
const { getApodByDate, fetchGaleria } = useNasaApod();

const registro = ref(null);

onMounted(async () => {
  await fetchGaleria(); // Asegura que la caché esté llena
  registro.value = getApodByDate(route.params.id); // Busca por la fecha de la URL
});
</script>

<style scoped>
.btn-regresar {
  display: inline-block;
  margin-bottom: 2rem;
  text-decoration: none;
  color: #0b3d91;
  font-weight: bold;
}

.detalle-container { 
  display: flex; 
  flex-direction: column; 
  gap: 2rem; 
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.detalle-header h1 {
  color: #0b3d91;
  margin-bottom: 0.5rem;
}

.detalle-header p {
  color: #666;
  font-size: 0.9rem;
}

.contenido-visual {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #f4f7f6;
  border-radius: 12px;
  overflow: hidden;
}

.img-detalle, .video-detalle {
  max-width: 100%;
  max-height: 600px;
  object-fit: contain;
}

.video-detalle {
  width: 100%;
  aspect-ratio: 16/9;
}

.explicacion {
  line-height: 1.8;
  color: #333;
  font-size: 1.1rem;
}

.explicacion h3 {
  color: #0b3d91;
  margin-bottom: 1rem;
}
</style>