<template>
  <div class="city-container">
    <header class="city-header">
      <template v-if="!isLoading">
        <span class="city-name">{{ lives.city }}</span>
        <span class="weather-summary">
          {{ lives.temperature }}℃ {{ lives.weather }} {{ lives.winddirection }}{{ lives.windpower }}级
          {{ lives.humidity }}%
        </span>
      </template>
      <template v-else>
        <SkeletonItem style="height: 45px; width: 100px" />
        <SkeletonItem style="height: 25px; width: 185px" />
      </template>
    </header>

    <main class="weather-info">
      <p>近期天气</p>
      <WeatherChart :is-loading="isLoading" :casts="casts" />
    </main>
  </div>
</template>

<script lang="ts">
import WeatherChart from '@/components/WeatherChart.vue';
import SkeletonItem from '@/components/SkeletonItem.vue';
import { formatWeatherCasts } from '@/utils/gmap';
import type { WeatherChartDataType, WeatherLivesType } from '@/types/gmap';
import { getWeather } from '@/api/gmap';

export default {
  name: 'City',
  components: {
    WeatherChart,
    SkeletonItem,
  },
  data() {
    return {
      lives: {} as WeatherLivesType,
      casts: [] as WeatherChartDataType[],
      isLoading: true,
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
        getWeather(this.adcode, 'base').then(res => {
          this.lives = res.lives[0];
          // 存入当前城市信息
          this.$store.commit('City/SET_ADCODE', this.lives.adcode);
          this.$store.commit('City/SET_CITYNAME', this.lives.city);
        });
        getWeather(this.adcode, 'all').then(res => {
          this.casts = formatWeatherCasts(res.forecasts[0].casts);
        });
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
  align-items: baseline;
  gap: 15px;
  margin-bottom: 30px;
  padding: 0 10px;
}

.city-name {
  font-size: 32px;
  font-weight: bold;
}

.weather-summary {
  font-size: 18px;
  opacity: 0.8;
}

.weather-info {
  p {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>
