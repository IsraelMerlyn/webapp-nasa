import { ref } from 'vue';

// Caché global para que la carga sea instantánea al regresar a la vista
const apodCache = ref(null);

export function useNasaApod() {
  const isLoading = ref(false);
  const error = ref(null);
  const galeria = ref([]);

  // consumo de la api "NASA APOD"
  const fetchGaleria = async () => {
    if (apodCache.value) {
      galeria.value = apodCache.value;
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const apiKey = import.meta.env.VITE_NASA_KEY || 'bYM07DbUngSsu4IPdQwd0zchPYGNPl0VXChjDaFM';
      // fetch que trae la data usando la estructura exacta de la documentación 
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=10&thumbs=true`);
      
      if (!response.ok) throw new Error('Error al decodificar la transmisión de la NASA');

      const data = await response.json();
      
      galeria.value = data;
      //se guarda en cache para la próxima navegación
      apodCache.value = data; 

    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  // Función para buscar una imagen específica por su fecha (nuestro "ID")
  const getApodByDate = (date) => {
    if (!apodCache.value) return null;
    return apodCache.value.find(item => item.date === date);
  };

  return {
    galeria,
    isLoading,
    error,
    fetchGaleria,
    getApodByDate
  };
}