import type { Skeleton, SvgIcon, IntroScroll } from '@/shared';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'g1-svg-icon': Partial<SvgIcon>;
      'g1-skeleton': Partial<Skeleton>;
      'g1-intro-scroll': Partial<IntroScroll>;
    }
  }
}

export {};
