<template>
  <div class="app-container">
    <g1-intro-scroll
      v-if="isShowIntroScroll && isIntroScrollLoading"
      ref="introScrollRef"
      burn-speed="0.15"
      @burn="isShowAppPage = true"
    >
      <div slot="header" class="g1-intro-scroll--header">项目介绍</div>
      <div class="g1-intro-scroll--content">
        <p>基于 Vue2 + Webpack 构建的天气查询应用</p>
        <p>支持中国 ADM2 级行政区划数据查询</p>
        <p>通过浏览器定位 API 提升定位精度（用户可选开启）</p>
        <p>无用户数据采集，数据仅存储于浏览器缓存（30 分钟）</p>
      </div>
      <div slot="footer" class="g1-intro-scroll--footer">
        <button @click="handleReject">拒绝</button>
        <button @click="handleReceive">接受</button>
      </div>
    </g1-intro-scroll>
    <template v-if="isShowAppPage">
      <header>
        <AppHeader />
      </header>
      <section class="router-container">
        <router-view />
      </section>
    </template>
  </div>
</template>
<script lang="ts">
import AppHeader from './components/Header.vue';
import { getIpLocation } from '@/api/gmap';
import storage from '@/utils/localstorage';
import { showToast } from './shared/toast';
import type { IntroScroll } from './shared/introScroll';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  data() {
    return {
      isShowIntroScroll: true,
      isShowAppPage: false,
      isIntroScrollLoading: false,
    };
  },
  async mounted() {
    const isNavigate = storage.get<'unknown' | 'yes' | 'no'>('isNavigate', 'unknown');
    if (isNavigate !== 'unknown') {
      this.isShowIntroScroll = false;
      this.isShowAppPage = true;
    } else {
      await import('@/shared/introScroll');
      this.isIntroScrollLoading = true;
    }
    if (isNavigate === 'no') {
      this.getLocal();
    }
    if (isNavigate === 'yes') {
      this.navigateCurrentLocation();
    }
  },
  methods: {
    handleReject() {
      storage.set('isNavigate', 'no');
      this.getLocal();
      this.destroyScroll();
    },
    handleReceive() {
      this.navigateCurrentLocation();
      this.destroyScroll();
    },
    destroyScroll() {
      (this.$refs.introScrollRef as unknown as IntroScroll).ignite();
    },
    async getLocal(lon?: number, lat?: number) {
      const res = await getIpLocation(lon, lat);
      this.$store.commit('IP/SET_LOCAL_LOCATION', res.name_zh);
      this.$store.commit('IP/SET_LOCAL_GEOCODE', res.adcode);
    },
    navigateCurrentLocation() {
      const geolocation = navigator.geolocation;
      if (!geolocation) {
        showToast('当前浏览器不支持本地定位', 'error');
        storage.set('isNavigate', 'no');
        return;
      }
      geolocation.getCurrentPosition(
        pos => {
          storage.set('isNavigate', 'yes');
          const { latitude, longitude } = pos.coords;
          this.getLocal(longitude, latitude);
        },
        err => {
          showToast(`定位失败${err.message}`, 'error');
          this.getLocal();
          storage.set('isNavigate', 'no');
        },
        {
          enableHighAccuracy: true, //使用GPS
          timeout: 10 * 1000,
          maximumAge: 10 * 1000, // 10s缓存
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: var(--primary-color);
}
header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  z-index: 2;
}
.router-container {
  width: 100%;
  height: 100%;
  padding: 80px min(15vw, 200px) 10px min(15vw, 200px);
}

.g1-intro-scroll {
  &--header {
    font-size: 24px;
    color: var(--text-color);
    text-align: center;
    text-shadow: 2px 2px 4px var(--primary-color);
  }
  &--content {
    padding: 20px;
    color: var(--text-color);
    text-shadow: 2px 2px 4px var(--secondary-color);
    p {
      font-size: 16px;
      line-height: 2;
    }
  }
  &--footer {
    display: flex;
    padding-right: 20px;
    button {
      padding: 6px 12px;
      border: none;
      cursor: pointer;
      font-size: 20px;
      background-color: transparent;
      color: var(--text-color);
      &:nth-child(1) {
        margin-left: auto;
      }
    }
  }
}

@media (max-width: 768px) {
  .router-container {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
