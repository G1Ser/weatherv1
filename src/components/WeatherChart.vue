<template>
  <div class="chart-container">
    <template v-if="!isLoading">
      <div class="chart-header">
        <div v-for="cast in casts" :key="cast.date" class="header-item">
          <p>{{ cast.week }}</p>
          <p>{{ cast.date }}</p>
          <SvgIcon :name="cast.icon" size="48px" />
          <p>{{ cast.weather }}</p>
        </div>
      </div>
      <div ref="chartRef" class="chart-body" />
    </template>
    <template v-else>
      <div class="skeleton-chart">
        <div class="skeleton-header">
          <div v-for="i in 4" :key="i" class="skeleton-header-item">
            <SkeletonItem style="height: 16px; width: 50px" />
            <SkeletonItem style="height: 14px; width: 70px; margin-top: 8px" />
            <SkeletonItem style="height: 48px; width: 48px; margin-top: 8px; border-radius: 50%" />
            <SkeletonItem style="height: 16px; width: 60px; margin-top: 8px" />
          </div>
        </div>
        <div class="skeleton-body">
          <SkeletonItem style="height: 100%; width: 100%" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { ECharts } from 'echarts/core';
import { init, use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { debounce } from 'lodash-es';
import SvgIcon from '@/components/SvgIcon.vue';
import SkeletonItem from '@/components/SkeletonItem.vue';
import type { WeatherChartDataType } from '@/types/gmap';

use([LineChart, GridComponent, CanvasRenderer]);

export default {
  name: 'WeatherChart',
  components: {
    SvgIcon,
    SkeletonItem,
  },
  props: {
    casts: {
      type: Array as PropType<WeatherChartDataType[]>,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null as ECharts | null,
      handleResize: null as (() => void) | null,
    };
  },
  watch: {
    casts: {
      handler() {
        this.$nextTick(() => {
          this.initChart();
        });
      },
      deep: true,
    },
  },
  created() {
    this.handleResize = debounce(() => {
      this.chartInstance?.resize();
    }, 300);
  },
  mounted() {
    if (this.handleResize) {
      window.addEventListener('resize', this.handleResize);
    }
  },
  beforeUnmount() {
    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize);
    }
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  methods: {
    initChart() {
      if (this.$refs.chartRef) {
        if (!this.chartInstance) {
          this.chartInstance = init(this.$refs.chartRef as HTMLElement);
        }
        this.renderChart();
      }
    },
    renderChart() {
      if (!this.chartInstance || !this.casts || this.casts.length === 0) return;

      const option = {
        grid: {
          left: '12.5%',
          right: '12.5%',
          top: '15%',
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
  width: 100%;
  height: 200px;
}

.skeleton-chart {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.skeleton-header {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
}

.skeleton-header-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skeleton-body {
  width: 100%;
  height: 200px;
}
</style>
