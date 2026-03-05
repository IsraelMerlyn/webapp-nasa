<template>
  <div class="chart-container" aria-label="Gráfico de barras de asteroides">
    <Bar v-if="chartData.datasets.length > 0" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  datosCrudos: {
    type: Object,
    required: true
  }
});


const chartData = computed(() => {
  return {
    labels: Object.keys(props.datosCrudos), 
    datasets: [
      {
        label: 'Asteroides detectados',
        backgroundColor: '#0b3d91', 
        data: Object.values(props.datosCrudos) 
      }
    ]
  };
});


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    tooltip: { enabled: true } 
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 60vh; 
  width: 100%;
}
</style>