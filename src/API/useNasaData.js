import { ref } from 'vue';

// Declaracion de variables
const cacheAsteroides = ref(null);
const cacheConteo = ref(null);
const ultimaFechaInicio = ref(null);
const ultimaFechaFin = ref(null);

export function useNasaData() {
  const isLoading = ref(false);
  const error = ref(null);
  
  const asteroidesData = ref([]);
  const conteoPorDia = ref({});

  // consumo de la API amenazas
  const fetchAsteroides = async (fechaInicio, fechaFin) => {
    // Funcion para almacenar cache
    if (cacheAsteroides.value && ultimaFechaInicio.value === fechaInicio && ultimaFechaFin.value === fechaFin) {
      asteroidesData.value = cacheAsteroides.value;
      conteoPorDia.value = cacheConteo.value;
      return; 
    }

    isLoading.value = true;
    error.value = null;

    try {
      const apiKey = import.meta.env.VITE_NASA_KEY || 'bYM07DbUngSsu4IPdQwd0zchPYGNPl0VXChjDaFM';
      
      // fetch que trae todo la data de la api
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${fechaInicio}&end_date=${fechaFin}&api_key=${apiKey}`);
      
      if (!response.ok) throw new Error('Error al conectar con la red de monitoreo espacial');

      const data = await response.json();
      const objetosCercanos = data.near_earth_objects;
      
      let todosLosAsteroides = [];
      let conteoTemporal = {};

      for (const fecha in objetosCercanos) {
        conteoTemporal[fecha] = objetosCercanos[fecha].length;
        todosLosAsteroides = [...todosLosAsteroides, ...objetosCercanos[fecha]];
      }

      // mapeamos la data
      const dataMapeada = todosLosAsteroides.map(ast => ({
        nombre: ast.name,
        diametroMaximo: ast.estimated_diameter.kilometers.estimated_diameter_max,
        velocidadKmH: ast.close_approach_data[0].relative_velocity.kilometers_per_hour,
        esPeligroso: ast.is_potentially_hazardous_asteroid
      }));

      // funcion que visualiza el total de la data
      asteroidesData.value = dataMapeada;
      conteoPorDia.value = conteoTemporal;

      // Guardamos en caché para la próxima navegación
      cacheAsteroides.value = dataMapeada;
      cacheConteo.value = conteoTemporal;
      ultimaFechaInicio.value = fechaInicio;
      ultimaFechaFin.value = fechaFin;

    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { asteroidesData, conteoPorDia, isLoading, error, fetchAsteroides };
}