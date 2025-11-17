<template>
  <div class="chart-container">
    <div class="chart-header">
      <div v-for="cast in casts" :key="cast.date" class="header-item">
        <p>{{ cast.week }}</p>
        <p>{{ cast.date }}</p>
        <SvgIcon :name="cast.icon" size="48px" />
        <p>{{ cast.weather }}</p>
      </div>
    </div>
    <div ref="chartRef" class="chart-body" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  import { init, use } from 'echarts/core';
  import type { ECharts } from 'echarts/core';
  import { LineChart } from 'echarts/charts';
  import { GridComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import { debounce } from 'lodash-es';
  import SvgIcon from '@/components/SvgIcon.vue';
  import type { WeatherChartDataType } from '@/types/gmap';

  use([LineChart, GridComponent, CanvasRenderer]);

  const props = defineProps<{
    casts: WeatherChartDataType[];
  }>();

  const chartRef = ref<HTMLElement>();
  let chartInstance: ECharts;

  const initChart = () => {
    if (chartRef.value) {
      chartInstance = init(chartRef.value);
      renderChart();
    }
  };

  const handleResize = debounce(() => {
    chartInstance?.resize();
  }, 300);

  const renderChart = () => {
    if (!chartInstance || !props.casts || props.casts.length === 0) return;

    const option = {
      grid: {
        left: '12%',
        right: '12%',
        top: '10%',
        bottom: '10%',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: props.casts.map(c => c.date),
        show: false,
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          name: '最高温',
          type: 'line',
          data: props.casts.map(c => c.maxTemp),
          smooth: true,
          itemStyle: {
            color: '#FF5733',
          },
          lineStyle: {
            width: 2,
          },
          symbol: 'circle',
          symbolSize: 6,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}°C',
          },
        },
        {
          name: '最低温',
          type: 'line',
          data: props.casts.map(c => c.minTemp),
          smooth: true,
          itemStyle: {
            color: '#33AFFF',
          },
          lineStyle: {
            width: 2,
          },
          symbol: 'circle',
          symbolSize: 6,
          label: {
            show: true,
            position: 'bottom',
            formatter: '{c}°C',
          },
        },
      ],
    };
    chartInstance.setOption(option);
  };

  onMounted(() => {
    initChart();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    chartInstance?.dispose();
  });

  watch(
    () => props.casts,
    () => {
      renderChart();
    },
    { deep: true }
  );
</script>

<style lang="scss" scoped>
  .chart-container {
    width: 100%;
    height: 400px;
    padding: 10px;
    background-color: var(--secondary-color);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }

  .chart-header {
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding-bottom: 10px;
  }

  .header-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    p {
      margin: 2px 0;
    }
  }

  .chart-body {
    flex: 1;
    width: 100%;
    height: 100%;
  }
</style>
