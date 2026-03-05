<template>
  <MainLayout>
    <div class="dashboard-wrapper">
      <header class="header-section">
        <h1>Centro de Monitoreo JOSUE VASQUEZ</h1>
        <p>Observación de objetos cercanos a la Tierra</p>
        
        <div class="filtros" role="search">
          <label for="fechaInicio">Desde:</label>
          <input type="date" id="fechaInicio" v-model="fechaInicio">
          
          <label for="fechaFin">Hasta:</label>
          <input type="date" id="fechaFin" v-model="fechaFin" :max="maxFechaFin">
          
          <button @click="buscarAsteroides" :disabled="isLoading">
            {{ isLoading ? 'Buscando...' : 'Escanear Sector' }}
          </button>
        </div>
      </header>

      <div v-if="isLoading" class="estado-carga" aria-live="polite">
        <span class="spinner"></span> Estableciendo conexión con la red espacial...
      </div>
      
      <div v-else-if="error" class="estado-error" role="alert">
        ⚠️ {{ error }}
      </div>

      <section v-else class="grafico-section">
        <div class="chart-wrapper">
          <h2>Frecuencia de Aproximación por Día</h2>
          <BarChart :datosCrudos="conteoPorDia" />
        </div>
        <div class="chart-wrapper">
          <h2>Distribución de Peligrosidad</h2>
          <DoughnutChart :datosCrudos="asteroidesData" />
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import MainLayout from '../layout/MainLayout.vue';
import BarChart from '../components/BarChart.vue';
import DoughnutChart from '../components/DoughnutChart.vue';
import { useNasaData } from "../API/useNasaData.js";

const { asteroidesData, conteoPorDia, isLoading, error, fetchAsteroides } = useNasaData();

const fechaInicio = ref('2026-03-01');
const fechaFin = ref('2026-03-05');

const maxFechaFin = computed(() => {
  if (!fechaInicio.value) return null;
  const fecha = new Date(fechaInicio.value);
  fecha.setDate(fecha.getDate() + 7);
  return fecha.toISOString().split('T')[0];
});

const buscarAsteroides = async () => {
  await fetchAsteroides(fechaInicio.value, fechaFin.value);
};

onMounted(() => {
  buscarAsteroides();
});
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-section h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #0b3d91;
  margin: 0;
}

.header-section p {
  color: #5f6368;
  margin: 0 0 1rem 0;
}

.filtros {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  align-items: center;
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-radius: 12px;
}

input[type="date"], button {
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

input[type="date"]:focus {
  outline: none;
  border-color: #0b3d91;
  box-shadow: 0 0 0 3px rgba(11, 61, 145, 0.1);
}

button {
  background-color: #0b3d91;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 6px rgba(11, 61, 145, 0.2);
}

button:hover:not(:disabled) {
  background-color: #0e4cba;
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(11, 61, 145, 0.3);
}

button:disabled {
  background-color: #b0c4de;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}

.grafico-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.chart-wrapper {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
}

.chart-wrapper h2 {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.75rem;
}

@media (min-width: 900px) {
  .grafico-section {
    flex-direction: row;
    align-items: stretch;
  }
  .chart-wrapper {
    flex: 1;
    min-width: 0;
  }
}

.estado-carga, .estado-error {
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  border-radius: 16px;
  font-weight: 500;
}

.estado-carga {
  background-color: rgba(11, 61, 145, 0.03);
  color: #0b3d91;
  border: 1px dashed rgba(11, 61, 145, 0.1);
}

.estado-error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px dashed rgba(198, 40, 40, 0.2);
}
</style>