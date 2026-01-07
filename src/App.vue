<template>
  <div class="app-container">
    <header>
      <AppHeader />
    </header>
    <section class="router-container">
      <router-view />
    </section>
  </div>
</template>
<script lang="ts">
import AppHeader from './components/Header.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  async mounted() {
    await this.$store.dispatch('IP/initLocation');
    await this.$store.dispatch('IP/initGeocode');
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
  width: 100%;
  height: 80px;
  flex-shrink: 0;
}
.router-container {
  width: 100%;
  flex: 1;
  padding: 0 min(15vw, 200px) 10px min(15vw, 200px);
}
</style>
