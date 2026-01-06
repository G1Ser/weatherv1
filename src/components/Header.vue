<template>
  <div class="header-container">
    <div class="home-btn" @click="toHome">
      <SvgIcon name="home" size="48px" />
    </div>
    <template v-if="!isLoading">
      <span>{{ localLocation }}</span>
      <span v-if="lives">{{ lives.temperature }}℃</span>
      <span v-if="lives">{{ lives.weather }}</span>
      <span v-if="lives">{{ lives.winddirection }}风{{ lives.windpower }}级</span>
      <span v-if="lives">{{ lives.humidity }}%</span>
    </template>
    <template v-else>
      <div class="skeleton-header">
        <SkeletonItem style="height: 24px; width: 120px" />
        <SkeletonItem style="height: 24px; width: 80px" />
        <SkeletonItem style="height: 24px; width: 100px" />
        <SkeletonItem style="height: 24px; width: 150px" />
        <SkeletonItem style="height: 24px; width: 80px" />
      </div>
    </template>
    <div v-if="showAddButton" class="add-btn" title="添加收藏" @click="addToFavorites">
      <SvgIcon name="add" size="32px" />
    </div>
    <div v-if="showLimitAlert" class="limit-alert">
      <div class="alert-content">
        <p>收藏夹已满（最多10个），请先删除一些城市。</p>
        <button @click="showLimitAlert = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SvgIcon from './SvgIcon.vue';
import SkeletonItem from './SkeletonItem.vue';
import type { WeatherLivesType } from '@/types/gmap';
import { getWeather } from '@/api/gmap';

export default {
  name: 'AppHeader',
  components: {
    SvgIcon,
    SkeletonItem,
  },
  data() {
    return {
      lives: {} as WeatherLivesType,
      isLoading: true,
      showLimitAlert: false,
    };
  },
  computed: {
    showAddButton(): boolean {
      return this.$route.name === 'City';
    },
    localLocation(): string {
      return (this.$store.getters['IP/localLocation'] as string) || '';
    },
    localGeocode(): string {
      return (this.$store.getters['IP/localGeocode'] as string) || '';
    },
  },
  watch: {
    localGeocode: {
      immediate: true,
      async handler(newVal) {
        if (!newVal) return;
        this.isLoading = true;
        try {
          const weatherInfo = await getWeather(newVal);
          this.lives = weatherInfo.lives[0];
        } finally {
          this.isLoading = false;
        }
      },
    },
  },
  methods: {
    toHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    async addToFavorites() {
      const adcode = this.$route.params.adcode;
      if (!adcode) return;

      const favorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]');

      // Check if already exists
      if (favorites.some((city: any) => city.adcode === adcode)) {
        return; // Already favorite
      }

      if (favorites.length >= 10) {
        this.showLimitAlert = true;
        return;
      }

      try {
        // Fetch city name
        const weatherInfo = await getWeather(adcode, 'base');
        if (weatherInfo.lives && weatherInfo.lives.length > 0) {
          const cityName = weatherInfo.lives[0].city;
          favorites.push({
            adcode: adcode,
            name: cityName,
          });
          localStorage.setItem('favoriteCities', JSON.stringify(favorites));
          // Force update if needed, or rely on reactivity in Home
        }
      } catch (e) {
        console.error('Failed to add favorite', e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 0 min(15vw, 200px);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  font-size: 16px;
  color: var(--text-color);
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.home-btn {
  cursor: pointer;
}

.add-btn {
  margin-left: auto;
  cursor: pointer;
  transition: transform 0.2s;
  color: var(--text-color);

  &:hover {
    transform: scale(1.1);
  }
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
</style>
