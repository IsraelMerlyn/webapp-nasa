<template>
  <MainLayout>
    <div class="amenazas-wrapper">
      <header class="header-section">
        <h1>Registro de Amenazas Espaciales </h1>
        <p>Listado de asteroides potencialmente peligrosos para la Tierra</p>
      </header>
      <div class="buscador-container" role="search">
        <label for="buscarAsteroide" class="sr-only">Buscar por nombre</label>
        <input 
          type="search" 
          id="buscarAsteroide" 
          v-model="terminoBusqueda" 
          placeholder="🔍 Buscar asteroide por nombre..."
          class="input-buscador"
        />
      </div>

      <div v-if="isLoading" class="tabla-contenedor" aria-hidden="true">
        <table aria-label="Cargando tabla de asteroides">
          <thead>
            <tr>
              <th>Nombre del Asteroide</th>
              <th>Diámetro Máx (km)</th>
              <th>Velocidad (km/h)</th>
              <th>Nivel de Alerta</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in 5" :key="n">
              <td><div class="skeleton-text"></div></td>
              <td><div class="skeleton-text short"></div></td>
              <td><div class="skeleton-text short"></div></td>
              <td><div class="skeleton-badge"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else-if="error" class="estado-error" role="alert">
        ⚠️ {{ error }}
      </div>

      <div v-else class="tabla-contenedor">
        <table aria-label="Tabla de asteroides peligrosos">
          <thead>
            <tr>
              <th scope="col">Nombre del Asteroide</th>
              <th scope="col">Diámetro Máx (km)</th>
              <th scope="col">Velocidad (km/h)</th>
              <th scope="col">Nivel de Alerta</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(asteroide, index) in asteroidesPeligrosos" :key="index">
              <td data-label="Nombre"><strong>{{ asteroide.nombre }}</strong></td>
              <td data-label="Diámetro">{{ formatearNumero(asteroide.diametroMaximo) }}</td>
              <td data-label="Velocidad">{{ formatearNumero(asteroide.velocidadKmH) }}</td>
              <td data-label="Nivel de Alerta">
                <span class="badge-peligro">Crítico</span>
              </td>
            </tr>
            <tr v-if="asteroidesPeligrosos.length === 0">
              <td colspan="4" class="estado-vacio">No se detectaron amenazas en este periodo. ¡Estamos a salvo!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import MainLayout from '../layout/MainLayout.vue';
import { useNasaData } from '../API/useNasaData';

const { asteroidesData, isLoading, error, fetchAsteroides } = useNasaData();

const terminoBusqueda = ref('');

onMounted(() => {
  const hoy = new Date();
  const hace7Dias = new Date();
  hace7Dias.setDate(hoy.getDate() - 7);
  
  const fechaFin = hoy.toISOString().split('T')[0];
  const fechaInicio = hace7Dias.toISOString().split('T')[0];
  
  fetchAsteroides(fechaInicio, fechaFin);
});

const asteroidesPeligrosos = computed(() => {
  return asteroidesData.value.filter(ast => {
    const esPeligro = ast.esPeligroso === true;
    const coincideBusqueda = ast.nombre.toLowerCase().includes(terminoBusqueda.value.toLowerCase());
    return esPeligro && coincideBusqueda;
  });
});

const formatearNumero = (numero) => {
  return Number(numero).toLocaleString('es-MX', { maximumFractionDigits: 2 });
};
</script>

<style scoped>

.amenazas-wrapper { display: flex; flex-direction: column; gap: 2rem; max-width: 1200px; margin: 0 auto; }
.header-section { background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.03); }
.header-section h1 { margin-top: 0; color: #0b3d91; }
.header-section p { color: #5f6368; font-size: 1.1rem; margin-bottom: 0; }

.tabla-contenedor { background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.03); overflow-x: auto; }
table { width: 100%; border-collapse: collapse; text-align: left; }
th, td { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f0f0f0; }
th { background-color: rgba(11, 61, 145, 0.03); color: #0b3d91; font-weight: 700; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; }
.badge-peligro { background-color: #ffebee; color: #c62828; padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.85rem; font-weight: 700; border: 1px solid rgba(198, 40, 40, 0.2); }
.estado-vacio { text-align: center; color: #2e7d32; font-weight: 600; padding: 3rem; background: rgba(46, 125, 50, 0.05); }

.skeleton-text {
  height: 20px;
  width: 80%;
  border-radius: 4px;
}
.skeleton-text.short {
  width: 50%;
}
.skeleton-badge {
  height: 24px;
  width: 60px;
  border-radius: 4px;
}
.skeleton-text, .skeleton-badge {
  background: #e2e8f0;
  background-image: linear-gradient(90deg, #e2e8f0 0px, #f8fafc 40px, #e2e8f0 80px);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@media (max-width: 768px) {
  table, thead, tbody, th, td, tr { display: block; }
  thead tr { position: absolute; top: -9999px; left: -9999px; }
  tr { border: 1px solid #ccc; margin-bottom: 1rem; border-radius: 8px; }
  td { border: none; border-bottom: 1px solid #eee; position: relative; padding-left: 50%; text-align: right; }
  td:before { position: absolute; top: 1rem; left: 1rem; width: 45%; padding-right: 10px; white-space: nowrap; content: attr(data-label); text-align: left; font-weight: bold; color: #666; }
}
.buscador-container { margin-top: 1.5rem; }
.input-buscador {
  width: 100%;
  max-width: 400px;
  padding: 0.8rem 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}
.input-buscador:focus {
  outline: none;
  border-color: #0b3d91;
  box-shadow: 0 0 0 3px rgba(11, 61, 145, 0.1);
}
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0; }
</style>