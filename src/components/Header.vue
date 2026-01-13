<template>
  <div class="header-container">
    <div class="cursor-pointer" @click="toHome">
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
    <div v-if="showAddButton" class="add-btn cursor-pointer" title="添加收藏" @click="addToFavorites">
      <SvgIcon name="add" size="16px" />
    </div>
  </div>
</template>

<script lang="ts">
import SvgIcon from './SvgIcon.vue';
import SkeletonItem from './SkeletonItem.vue';
import type { WeatherLivesType } from '@/types/gmap';
import type { FavoriteCity } from '@/types/storage';
import { getWeather } from '@/api/gmap';
import storage from '@/utils/localstorage';
import Toast from '@/utils/toast';

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
        Toast.info('收藏夹已达到上线');
        return;
      }
      if (this.isCityInFavorites(adcode, favorites)) return;

      favorites.unshift({
        adcode: adcode,
        name: cityName,
      });
      storage.set('favoriteCities', favorites);
      this.updateShowAddButton(adcode, favorites);
      Toast.success('收藏成功');
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
