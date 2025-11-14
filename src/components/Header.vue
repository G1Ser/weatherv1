<template>
  <div class="header-container">
    <SvgIcon name="home" size="48px" class="cursor-pointer" @click="router.push('/')" />
    <span>{{ localLocation }}</span>
    <span>{{ lives?.temperature }}℃</span>
    <span>{{ lives?.weather }}</span>
    <span>{{ lives?.winddirection }}风{{ lives?.windpower }}级</span>
    <span>{{ lives?.humidity }}%</span>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import router from '@/router';
  import SvgIcon from './SvgIcon.vue';
  import { useIPStore } from '@/store/IP';
  import type { WeatherLivesType } from '@/types/gmap';
  import { getWeather } from '@/api/gmap';

  const IPStore = useIPStore();
  const { localLocation, localGeocode } = storeToRefs(IPStore);
  const lives = ref<WeatherLivesType>();
  watch(
    () => localGeocode.value,
    async () => {
      if (!localGeocode.value) return;
      const weatherInfo = await getWeather(localGeocode.value);
      lives.value = weatherInfo.lives[0];
    }
  );
</script>

<style lang="scss" scoped>
  .header-container {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    padding: 0 min(15vw, 200px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    font-size: 16px;
    color: var(--text-color);
  }
</style>
