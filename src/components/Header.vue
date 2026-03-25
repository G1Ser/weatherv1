<template>
  <div class="header-container">
    <div class="cursor-pointer" title="首页" @click="toHome">
      <g1-svg-icon :svg="homeIcon" size="48" />
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
        <g1-skeleton style="height: 24px; width: 120px" />
        <g1-skeleton style="height: 24px; width: 80px" />
        <g1-skeleton style="height: 24px; width: 100px" />
        <g1-skeleton style="height: 24px; width: 150px" />
        <g1-skeleton style="height: 24px; width: 180px" />
      </div>
    </template>
    <div v-if="showAddButton" class="add-btn cursor-pointer" title="添加收藏" @click="addToFavorites">
      <g1-svg-icon :svg="addIcon" size="16" />
    </div>
  </div>
</template>

<script lang="ts">
import addIcon from '@/assets/svgs/add.svg?raw';
import homeIcon from '@/assets/svgs/home.svg?raw';
import type { WeatherLivesType } from '@/types/gmap';
import type { FavoriteCity } from '@/types/storage';
import { getWeather } from '@/api/gmap';
import storage from '@/utils/localstorage';
import { showToast } from '@/shared/toast';

export default {
  name: 'AppHeader',
  data() {
    return {
      addIcon,
      homeIcon,
      lives: {} as WeatherLivesType,
      isLoading: true,
      showAddButton: false, // 是否显示添加收藏按钮
    };
  },
  computed: {
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
    $route: {
      immediate: true,
      handler(route) {
        const { name, params } = route;
        if (name === 'City') {
          const adcode = params.adcode;
          const favorites = storage.get<FavoriteCity[]>('favoriteCities', []);
          this.updateShowAddButton(adcode, favorites);
        } else {
          this.showAddButton = false;
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
    /**
     * 更新添加按钮的显示状态
     */
    updateShowAddButton(adcode: string, favoriteCities: FavoriteCity[]) {
      if (adcode === this.localGeocode) {
        this.showAddButton = false;
        return;
      }
      if (favoriteCities.length === 0) {
        this.showAddButton = true;
        return;
      }
      this.showAddButton = !this.isCityInFavorites(adcode, favoriteCities);
    },
    /**
     * 检查指定城市是否已在收藏列表中
     */
    isCityInFavorites(adcode: string, favoriteCities: FavoriteCity[]) {
      return favoriteCities.some((city: FavoriteCity) => city.adcode === adcode);
    },
    async addToFavorites() {
      // 从 store 获取当前城市信息
      const adcode = this.$store.getters['City/adcode'];
      const cityName = this.$store.getters['City/name'];

      const favorites = storage.get<FavoriteCity[]>('favoriteCities', []);
      if (favorites.length >= 10) {
        showToast('收藏夹已达到上限');
        return;
      }
      if (this.isCityInFavorites(adcode, favorites)) return;

      favorites.unshift({
        adcode: adcode,
        name: cityName,
      });
      storage.set('favoriteCities', favorites);
      this.updateShowAddButton(adcode, favorites);
      showToast('收藏成功', 'success');
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
  background-color: var(--primary-color);
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.add-btn {
  margin-left: auto;
  transition: transform 0.2s;
  color: var(--text-color);

  &:hover {
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .header-container {
    gap: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
