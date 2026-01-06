<template>
  <div class="city-container">
    <header class="city-header">
      <div class="header-left">
        <span class="city-name">{{ cityName }}</span>
        <span v-if="currentWeather" class="weather-summary">
          {{ currentWeather.temperature }}℃ {{ currentWeather.weather }}
        </span>
      </div>
      <div class="header-right"></div>
    </header>

    <div v-if="showLimitAlert" class="limit-alert">
      <div class="alert-content">
        <p>收藏夹已满（最多10个），请先删除一些城市。</p>
        <button @click="showLimitAlert = false">关闭</button>
      </div>
    </div>

    <main class="weather-info">
      <p>近期天气</p>
      <WeatherChart :is-loading="isLoading" :casts="casts" />
    </main>
  </div>
</template>

<script lang="ts">
import WeatherChart from '@/components/WeatherChart.vue';
import { formatWeatherCasts } from '@/utils/gmap';
import type { WeatherChartDataType } from '@/types/gmap';
import { getWeather } from '@/api/gmap';

interface FavoriteCity {
  adcode: string;
  name: string;
}

export default {
  name: 'City',
  components: {
    WeatherChart,
  },
  data() {
    return {
      cityName: '',
      casts: [] as WeatherChartDataType[],
      isLoading: true,
      currentWeather: null as any,
      showLimitAlert: false,
    };
  },
  computed: {
    adcode(): string {
      return this.$route.params.adcode;
    },
  },
  created() {
    this.fetchCityData();
  },
  methods: {
    async fetchCityData() {
      this.isLoading = true;
      try {
        // Fetch base weather for current conditions
        const baseInfo = await getWeather(this.adcode, 'base');
        if (baseInfo.lives && baseInfo.lives.length > 0) {
          const live = baseInfo.lives[0] as any;
          this.cityName = live.city;
          this.currentWeather = live;
        }

        // Fetch forecast
        const forecastInfo = await getWeather(this.adcode, 'all');
        if (forecastInfo.forecasts && forecastInfo.forecasts.length > 0) {
          this.casts = formatWeatherCasts(forecastInfo.forecasts[0].casts);
          // Fallback for city name if base info failed
          if (!this.cityName) {
            const forecast = forecastInfo.forecasts[0] as any;
            this.cityName = forecast.city;
          }
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.city-container {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  color: var(--text-color);
}

.city-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 10px;
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 15px;
}

.city-name {
  font-size: 32px;
  font-weight: bold;
}

.weather-summary {
  font-size: 18px;
  opacity: 0.8;
}

.limit-alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .alert-content {
    background: var(--secondary-color);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);

    p {
      margin-bottom: 15px;
    }

    button {
      padding: 5px 15px;
      background: var(--primary-color);
      border: none;
      color: white;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }
    }
  }
}

.weather-info {
  & > p {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>
