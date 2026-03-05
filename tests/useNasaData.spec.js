import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNasaData } from '../src/API/useNasaData.js';

describe('useNasaData composable', () => {
  beforeEach(() => {
    // Limpiamos los mocks antes de cada test
    vi.restoreAllMocks();
  });

  it('debería inicializar con los valores correctos', () => {
    const { asteroidesData, conteoPorDia, isLoading, error } = useNasaData();
    
    expect(asteroidesData.value).toEqual([]);
    expect(conteoPorDia.value).toEqual({});
    expect(isLoading.value).toBe(false);
    expect(error.value).toBe(null);
  });

  it('debería actualizar el estado de carga y datos al llamar a fetchAsteroides', async () => {
    // Mockeamos la respuesta de la API fake
    const mockData = {
      near_earth_objects: {
        '2026-03-01': [
          {
            name: 'Asteroide Test 1',
            estimated_diameter: { kilometers: { estimated_diameter_max: 1.5 } },
            close_approach_data: [{ relative_velocity: { kilometers_per_hour: '50000' } }],
            is_potentially_hazardous_asteroid: true
          }
        ]
      }
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const { asteroidesData, conteoPorDia, fetchAsteroides, isLoading } = useNasaData();

    const fetchPromise = fetchAsteroides('2026-03-01', '2026-03-01');
    expect(isLoading.value).toBe(true);

    await fetchPromise;

    expect(isLoading.value).toBe(false);
    expect(asteroidesData.value.length).toBe(1);
    expect(asteroidesData.value[0].nombre).toBe('Asteroide Test 1');
    expect(conteoPorDia.value['2026-03-01']).toBe(1);
  });

  it('debería manejar errores de la API', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false
    });

    const { error, fetchAsteroides, isLoading } = useNasaData();

    // Usamos otra fecha para evitar el hit de caché del test anterior
    await fetchAsteroides('2020-01-01', '2020-01-01');

    expect(isLoading.value).toBe(false);
    expect(error.value).toBe('Error al conectar con la red');
  });
});
