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

<script>
import { init, use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { debounce } from 'lodash-es';
import SvgIcon from '@/components/SvgIcon.vue';

use([LineChart, GridComponent, CanvasRenderer]);

export default {
  name: 'WeatherChart',
  components: {
    SvgIcon,
  },
  props: {
    casts: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  watch: {
    casts: {
      handler() {
        this.renderChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.initChart();
    this.handleResize = debounce(() => {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }, 300);
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  methods: {
    initChart() {
      if (this.$refs.chartRef) {
        this.chartInstance = init(this.$refs.chartRef);
        this.renderChart();
      }
    },
    renderChart() {
      if (!this.chartInstance || !this.casts || this.casts.length === 0) return;

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
          data: this.casts.map(c => c.date),
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
            data: this.casts.map(c => c.maxTemp),
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
            data: this.casts.map(c => c.minTemp),
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
      this.chartInstance.setOption(option);
    },
  },
};
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
