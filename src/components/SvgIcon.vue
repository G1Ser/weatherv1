<template>
  <component
    :is="iconComponent"
    :class="className"
    :style="{
      width: size,
      height: size,
      color: color,
    }"
  />
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, type Component } from 'vue';

  interface Props {
    name: string; // SVG 文件名（不含 .svg 后缀）
    size?: string; // 图标大小
    color?: string; // 图标颜色
    className?: string; // 自定义类名
  }

  const props = withDefaults(defineProps<Props>(), {
    size: '1em',
    color: 'currentColor',
    className: '',
  });

  // 动态导入 SVG 文件
  const iconComponent = computed<Component>(() => {
    return defineAsyncComponent(() => import(`@/assets/svgs/${props.name}.svg`));
  });
</script>
