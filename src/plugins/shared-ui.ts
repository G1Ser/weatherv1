import type { PluginObject } from 'vue';
import { configureSvgIcon } from '@/shared/svgIcon';

const SharedUIPlugin: PluginObject<void> = {
  install(Vue) {
    Vue.config.ignoredElements = [...(Vue.config.ignoredElements || []), /^g1-/];

    configureSvgIcon({ basePath: '/svgs' });

    import('@/shared/svgIcon');
    import('@/shared/skeleton');
  },
};

export default SharedUIPlugin;
