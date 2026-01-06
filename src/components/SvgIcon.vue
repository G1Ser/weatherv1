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

<script lang="ts">
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '1em',
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconComponent() {
      return () => import(`@/assets/svgs/${this.name}.svg`);
    },
  },
};
</script>
