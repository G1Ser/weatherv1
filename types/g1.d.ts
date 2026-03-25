import type { Skeleton, SvgIcon } from '@/shared';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'g1-svg-icon': Partial<SvgIcon>;
      'g1-skeleton': Partial<Skeleton>;
    }
  }
}

export {};
