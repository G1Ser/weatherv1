<template>
  <div class="home-container">
    <main class="weather-info">
      <p>近期天气</p>
      <WeatherChart v-if="casts" :casts="casts" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WeatherChart from '@/components/WeatherChart.vue';
import { formatWeatherCasts } from '@/utils/gmap';
import { getWeather } from '@/api/gmap';

export default {
  name: 'Home',
  components: {
    WeatherChart,
  },
  data() {
    return {
      casts: null,
    };
  },
  computed: {
    ...mapGetters('IP', ['localGeocode']),
  },
  watch: {
    async localGeocode(newVal) {
      if (!newVal) return;
      const weatherInfo = await getWeather(newVal, 'all');
      this.casts = formatWeatherCasts(weatherInfo.forecasts[0].casts);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  color: var(--text-color);
}
.chart-container {
  width: 100%;
  height: 400px;
  padding: 10px;
  background-color: var(--secondary-color);
  border-radius: 10px;
}
</style>
