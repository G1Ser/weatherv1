<template>
  <div class="skeleton-item" />
</template>

<style lang="scss" scoped>
.skeleton-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0));
    animation: shimmer 1.5s infinite;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
