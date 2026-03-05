<template>
  <div class="chart-container" aria-label="Gráfico de proporción de peligro">
    <Doughnut v-if="chartData.datasets.length > 0" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registramos los módulos para el gráfico de dona
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  datosCrudos: {
    type: Array,
    required: true
  }
});

// Calculamos cuántos son peligrosos y cuántos no
const chartData = computed(() => {
  const peligrosos = props.datosCrudos.filter(ast => ast.esPeligroso).length;
  const seguros = props.datosCrudos.length - peligrosos;

  return {
    labels: ['Peligrosos', 'Seguros'],
    datasets: [{
      backgroundColor: ['#c62828', '#2e7d32'], // Rojo para peligro, Verde para seguro
      data: [peligrosos, seguros]
    }]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>