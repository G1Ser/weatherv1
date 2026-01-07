<template>
  <div class="home-container">
    <div class="search-container">
      <input v-model="searchAddress" type="text" class="search-input" placeholder="输入城市名" autocomplete="off" />
      <div v-if="showPopper" class="popper">
        <div v-if="isSearching" class="popper-item">正在搜索...</div>
        <template v-else>
          <div
            v-for="result in searchResults"
            :key="result.adcode"
            class="popper-item"
            @click="goToCity(result.adcode)"
          >
            {{ result.formatted_address }}
          </div>
          <div v-if="!searchResults.length" class="popper-item">找不到该地区</div>
        </template>
      </div>
    </div>
    <div v-if="favoriteCities.length" class="favorites-container">
      <div v-for="city in favoriteCities" :key="city.adcode" class="favorite-item">
        <span class="city-name">{{ city.name }}</span>
        <div class="actions">
          <button class="view-btn" @click="goToCity(city.adcode)">查看</button>
          <button class="delete-btn" @click="deleteFavorite(city.adcode)">删除</button>
        </div>
      </div>
    </div>
    <main class="weather-info">
      <p>近期天气</p>
      <WeatherChart :is-loading="isLoading" :casts="casts" />
    </main>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { debounce } from 'lodash-es';
import WeatherChart from '@/components/WeatherChart.vue';
import { formatWeatherCasts } from '@/utils/gmap';
import storage from '@/utils/localstorage';
import type { WeatherChartDataType, GeocodeType } from '@/types/gmap';
import type { FavoriteCity } from '@/types/storage';
import { getWeather, getGeocode } from '@/api/gmap';

export default {
  name: 'Home',
  components: {
    WeatherChart,
  },
  data() {
    return {
      casts: [] as WeatherChartDataType[],
      isLoading: false,
      searchAddress: '',
      searchResults: [] as GeocodeType[],
      isSearching: false,
      showPopper: false,
      debouncedSearch: null as (() => void) | null,
      favoriteCities: [] as FavoriteCity[],
    };
  },
  computed: {
    ...mapGetters('IP', ['localGeocode']),
  },
  watch: {
    localGeocode: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchWeatherData(newVal);
        }
      },
    },
    searchAddress(newVal) {
      if (newVal.trim()) {
        this.showPopper = true;
        this.isSearching = true;
        this.debouncedSearch?.();
      } else {
        this.showPopper = false;
        this.searchResults = [];
      }
    },
  },
  created() {
    this.debouncedSearch = debounce(async () => {
      if (!this.searchAddress.trim()) {
        this.isSearching = false;
        return;
      }
      try {
        const geocodeInfo = await getGeocode(this.searchAddress);
        this.searchResults = geocodeInfo.geocodes || [];
      } finally {
        this.isSearching = false;
      }
    }, 300);
    this.loadFavorites();
  },
  methods: {
    async fetchWeatherData(geocode: string) {
      this.isLoading = true;
      try {
        const weatherInfo = await getWeather(geocode, 'all');
        this.casts = formatWeatherCasts(weatherInfo.forecasts[0].casts);
      } finally {
        this.isLoading = false;
      }
    },
    goToCity(adcode: string) {
      this.$router.push({ name: 'City', params: { adcode } });
    },
    loadFavorites() {
      this.favoriteCities = storage.get<FavoriteCity[]>('favoriteCities', []);
    },
    deleteFavorite(adcode: string) {
      this.favoriteCities = this.favoriteCities.filter(city => city.adcode !== adcode);
      storage.set<FavoriteCity[]>('favoriteCities', this.favoriteCities);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  color: var(--text-color);
}

.search-container {
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--text-color);
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
  text-align: center;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: var(--primary-color);
  }
}

.popper {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background-color: var(--secondary-color);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
}

.popper-item {
  padding: 12px 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-color);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.weather-info {
  p {
    font-size: 20px;
    margin-bottom: 10px;
  }
}

.chart-container {
  width: 100%;
  padding: 10px;
  background-color: var(--secondary-color);
  border-radius: 10px;
}

.favorites-container {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.favorite-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: var(--secondary-color);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .city-name {
    font-size: 18px;
    font-weight: 500;
  }

  .actions {
    display: flex;
    gap: 10px;

    button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.9;
      }
    }

    .view-btn {
      background-color: var(--primary-color);
      color: white;
    }

    .delete-btn {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--text-color);

      &:hover {
        background-color: rgba(255, 0, 0, 0.3);
      }
    }
  }
}
</style>
