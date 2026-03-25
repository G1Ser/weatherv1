import { i as l, a as d, b, t as g } from "../chunks/lit-DBvanXZV.js";
var m = Object.getOwnPropertyDescriptor, h = (i, o, a, s) => {
  for (var e = s > 1 ? void 0 : s ? m(o, a) : o, t = i.length - 1, n; t >= 0; t--)
    (n = i[t]) && (e = n(e) || e);
  return e;
};
let r = class extends d {
  render() {
    return b`<div class="skeleton-item"></div>`;
  }
};
r.styles = l`
    :host {
      display: block;
      box-sizing: border-box;
    }
    .skeleton-item {
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: inherit;
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    .skeleton-item::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0)
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `;
r = h([
  g("g1-skeleton")
], r);
export {
  r as Skeleton
};
