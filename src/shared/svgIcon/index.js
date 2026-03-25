import { i as l, n, r as p, a as v, b as S, t as u } from "../chunks/lit-DBvanXZV.js";
var f = Object.defineProperty, y = Object.getOwnPropertyDescriptor, o = (t, s, r, c) => {
  for (var i = c > 1 ? void 0 : c ? y(s, r) : s, a = t.length - 1, h; a >= 0; a--)
    (h = t[a]) && (i = (c ? h(s, r, i) : h(i)) || i);
  return c && i && f(s, r, i), i;
};
const g = {
  basePath: ""
};
function w(t) {
  Object.assign(g, t);
}
let e = class extends v {
  constructor() {
    super(...arguments), this.name = "", this.src = "", this.svg = "", this.size = "1rem", this.color = "currentColor", this.currentSvgNode = null;
  }
  // ==========================================
  // Lit 生命周期钩子
  // ==========================================
  updated(t) {
    if (super.updated(t), (t.has("svg") || t.has("src") || t.has("name")) && this.loadSvg(), t.has("size")) {
      const s = /^\d+(\.\d+)?$/.test(this.size) ? `${this.size}px` : this.size;
      this.style.setProperty("--icon-size", s);
    }
    t.has("color") && this.style.setProperty("--icon-color", this.color);
  }
  // ==========================================
  // 核心业务逻辑
  // ==========================================
  /**
   * 按优先级加载 SVG：
   * 1. svg prop（原始字符串，直接解析，无网络请求）
   * 2. src prop（完整 URL，运行时 fetch）
   * 3. name + basePath（运行时 fetch）
   */
  loadSvg() {
    if (this.svg)
      this.parseSvgString(this.svg);
    else if (this.src)
      this.fetchSvg(this.src);
    else if (this.name && g.basePath) {
      const t = `${g.basePath.replace(/\/$/, "")}/${this.name}.svg`;
      this.fetchSvg(t);
    } else
      this.currentSvgNode = null;
  }
  parseSvgString(t) {
    const r = new DOMParser().parseFromString(t, "image/svg+xml");
    this.currentSvgNode = r.querySelector("svg");
  }
  async fetchSvg(t) {
    try {
      const s = await fetch(t);
      if (!s.ok) throw new Error(`HTTP ${s.status}`);
      const r = await s.text();
      this.parseSvgString(r);
    } catch (s) {
      console.warn(`[g1-svg-icon] Failed to fetch SVG: ${t}`, s), this.currentSvgNode = null;
    }
  }
  render() {
    return S`<div part="wrapper" class="icon-wrapper">
      ${this.currentSvgNode}
    </div>`;
  }
};
e.styles = l`
    :host {
      display: inline-block;
      width: var(--icon-size);
      height: var(--icon-size);
      box-sizing: border-box;
    }
    .icon-wrapper svg {
      width: 100%;
      height: 100%;
      color: var(--g1-icon-color, var(--icon-color));
      transition: color 0.3s ease;
      will-change: color;
    }
  `;
o([
  n({ type: String })
], e.prototype, "name", 2);
o([
  n({ type: String })
], e.prototype, "src", 2);
o([
  n({ type: String })
], e.prototype, "svg", 2);
o([
  n({ type: String })
], e.prototype, "size", 2);
o([
  n({ type: String })
], e.prototype, "color", 2);
o([
  p()
], e.prototype, "currentSvgNode", 2);
e = o([
  u("g1-svg-icon")
], e);
export {
  e as SvgIcon,
  w as configureSvgIcon
};
