<template>
  <div class="header-container">
    <SvgIcon name="home" size="48px" class="cursor-pointer" @click="$router.push('/')" />
    <span>{{ localLocation }}</span>
    <span v-if="lives">{{ lives.temperature }}℃</span>
    <span v-if="lives">{{ lives.weather }}</span>
    <span v-if="lives">{{ lives.winddirection }}风{{ lives.windpower }}级</span>
    <span v-if="lives">{{ lives.humidity }}%</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SvgIcon from './SvgIcon.vue';
import { getWeather } from '@/api/gmap';

export default {
  name: 'Header',
  components: {
    SvgIcon,
  },
  data() {
    return {
      lives: null,
    };
  },
  computed: {
    ...mapGetters('IP', ['localLocation', 'localGeocode']),
  },
  watch: {
    async localGeocode(newVal) {
      if (!newVal) return;
      const weatherInfo = await getWeather(newVal);
      this.lives = weatherInfo.lives[0];
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
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  font-size: 16px;
  color: var(--text-color);
}
</style>
