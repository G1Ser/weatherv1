import { i as lt, n as D, r as ct, e as K, a as dt, b as ut, t as ht } from "../chunks/lit-DBvanXZV.js";
import { C as pt, S as mt, F as S, f as j, s as H, v as I, a as bt, b as d, m as E, u as ft, t as R, I as gt, D as vt, c as yt, d as z, e as O, p as et, i as V, g as xt, P as wt, W as St, O as Ct, h as Mt, j as _t, k as Rt, M as Nt, l as Pt, B as At, n as Bt, o as Et, A as zt, q as Ht, r as Dt, w as Ft, x as Tt, y as Lt, T as Wt } from "../chunks/three-Cco-8nUd.js";
function It() {
  const s = document.createElement("canvas");
  s.width = s.height = 1024;
  const t = s.getContext("2d"), i = t.createRadialGradient(
    1024 * 0.5,
    1024 * 0.42,
    1024 * 0.05,
    // 内圆：偏上方小圆（高光中心）
    1024 * 0.5,
    1024 * 0.5,
    1024 * 0.68
    // 外圆：正中大圆（覆盖整张纸）
  );
  i.addColorStop(0, "#e0cf84"), i.addColorStop(0.25, "#ccb75c"), i.addColorStop(0.55, "#a88b36"), i.addColorStop(1, "#3c2806"), t.fillStyle = i, t.fillRect(0, 0, 1024, 1024);
  for (const { x: c, y: u, rx: n, ry: a, a: h } of [
    { x: 200, y: 270, rx: 95, ry: 62, a: 0.09 },
    { x: 780, y: 560, rx: 125, ry: 78, a: 0.07 },
    { x: 370, y: 835, rx: 72, ry: 48, a: 0.1 },
    { x: 125, y: 700, rx: 82, ry: 52, a: 0.09 }
  ]) {
    t.save(), t.translate(c, u), t.scale(n / 60, a / 60);
    const r = t.createRadialGradient(0, 0, 0, 0, 0, 60);
    r.addColorStop(0, `rgba(50, 24, 2, ${h * 2})`), r.addColorStop(1, "rgba(50, 24, 2, 0)"), t.fillStyle = r, t.beginPath(), t.arc(0, 0, 60, 0, Math.PI * 2), t.fill(), t.restore();
  }
  const l = new pt(s);
  return l.colorSpace = mt, l;
}
function Ot(e, s) {
  const t = S(
    ([n]) => j(H(n.dot(I(127.1, 311.7))).mul(43758.5453))
  ), i = S(([n]) => {
    const a = bt(n), h = j(n), r = t(a), f = t(a.add(I(1, 0))), p = t(a.add(I(0, 1))), m = t(a.add(I(1, 1))), g = h.mul(h).mul(d(3).sub(h.mul(2)));
    return E(r, f, g.x).add(p.sub(r).mul(g.y).mul(d(1).sub(g.x))).add(m.sub(f).mul(g.x).mul(g.y));
  }), l = S(
    ([n]) => i(n).mul(0.5).add(i(n.mul(2)).mul(0.25)).add(i(n.mul(4)).mul(0.125))
    // 第三层：高频，振幅 0.125
  ), c = S(() => {
    const n = ft(), a = l(n.mul(3.6).add(R.mul(0.1))), h = d(1).sub(n.y).mul(0.8).add(d(1).sub(n.x).mul(0.12)).add(H(R.mul(0.65).add(n.x.mul(2.8))).mul(0.05)), r = a.mul(0.5).add(h.mul(0.9)), f = s.mul(2.2), p = r.sub(f);
    gt(p.lessThan(d(0)), () => vt());
    const m = yt(e, n).rgb, g = E(
      E(
        E(
          z(1, 0.97, 0.85),
          // 白热（~1500°C，燃烧最前沿）
          z(1, 0.88, 0.05),
          // 亮黄（~1200°C）
          O(d(0), d(0.013), p)
        ),
        z(0.98, 0.4, 0.01),
        // 橙红（~900°C）
        O(d(0.013), d(0.042), p)
      ),
      z(0.07, 0.02, 0.01),
      // 焦炭灰烬（燃烧边缘后方）
      O(d(0.08), d(0.118), p)
    ), Z = d(1).sub(O(d(0.108), d(0.162), p));
    return E(m, g, Z);
  })(), u = S(() => {
    const n = et.toVar(), a = H(R.mul(35)).mul(s).mul(8e-3);
    return n.z.addAssign(a), n;
  })();
  return { colorNode: c, positionNode: u };
}
function Gt() {
  const e = S(() => {
    const t = j(R.mul(0.3).add(V.toFloat().mul(0.13))), i = H(t.mul(Math.PI)).smoothstep(0, 0.5);
    return z(d(1), d(0.4), d(0.1)).mul(i);
  })(), s = S(() => {
    const t = et.toVar(), i = j(R.mul(0.2).add(V.toFloat().mul(0.5)));
    return t.y.addAssign(i.mul(2)), t.x.addAssign(H(R.add(V.toFloat())).mul(0.1)), t;
  })();
  return { colorNode: e, positionNode: s };
}
var jt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, x = (e, s, t, i) => {
  for (var l = i > 1 ? void 0 : i ? Zt(s, t) : s, c = e.length - 1, u; c >= 0; c--)
    (u = e[c]) && (l = (i ? u(s, t, l) : u(l)) || l);
  return i && l && jt(s, t, l), l;
};
const G = (e, s) => {
  const t = Math.sin(e * 127.1 + s * 311.7) * 43758.5453;
  return t - Math.floor(t);
}, _ = (e, s) => {
  const t = Math.floor(e), i = Math.floor(s), l = e - t, c = s - i, u = l * l * (3 - 2 * l), n = c * c * (3 - 2 * c);
  return G(t, i) * (1 - u) * (1 - n) + G(t + 1, i) * u * (1 - n) + G(t, i + 1) * (1 - u) * n + G(t + 1, i + 1) * u * n;
}, Y = (e, s) => _(e, s) * 0.5 + _(e * 2.1, s * 2.1) * 0.25 + _(e * 4.3, s * 4.3) * 0.125 + _(e * 8.7, s * 8.7) * 0.0625, U = 500;
let b = class extends dt {
  constructor() {
    super(...arguments), this.burnSpeed = 0.46, this.enableControls = !0, this.scrollWidth = 1.8, this.scrollHeight = 2.4, this.contentRatio = 0.8, this.isBurning = !1, this._pendingIgnite = !1, this.ctx = null, this._orbitRelayHandler = null;
  }
  render() {
    return ut`
      <div class="scroll-wrapper" role="dialog" aria-modal="true">
        <div id="webgl-canvas"></div>
        <div id="css3d-canvas"></div>
        <div class="slot-container ${this.isBurning ? "burning" : ""}">
          <header class="header-area">
            <slot name="header"></slot>
          </header>
          <main class="main-area">
            <slot></slot>
          </main>
          <footer class="footer-area">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
  ignite() {
    this.isBurning || (this.isBurning = !0, this.ctx ? this.ctx.startBurn = !0 : this._pendingIgnite = !0);
  }
  reset() {
    this.isBurning = !1, this.removeAttribute("closing"), this.ctx && (this.ctx.burnProgress.value = 0, this.ctx.startBurn = !1, this.ctx.scene.position.z = 0, this.initThreeJS());
  }
  // ── Lit 生命周期 ───────────────────────────────────────────────────────────
  updated(e) {
    (e.has("scrollWidth") || e.has("scrollHeight") || e.has("contentRatio")) && this.ctx && this.initThreeJS();
  }
  async firstUpdated() {
    "fonts" in document && await document.fonts.ready, await new Promise((e) => requestAnimationFrame(() => e())), await this.initThreeJS();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup();
  }
  /**
   * 销毁 Three.js 上下文，释放 GPU 资源。
   * 在重新初始化前、或组件卸载时调用。
   * 同时将 slot-container 归还原位，保证 <slot> 投影不中断。
   */
  _cleanup() {
    if (this._orbitRelayHandler && (this.slotContainer?.removeEventListener(
      "pointerdown",
      this._orbitRelayHandler
    ), this._orbitRelayHandler = null), this.ctx) {
      this.ctx.renderer.setAnimationLoop(null), this.ctx.controls.dispose(), this.ctx.renderer.dispose();
      const e = this.slotContainer;
      if (e) {
        const s = this.canvasContainer.parentElement;
        s && e.parentElement !== s && s.appendChild(e), e.classList.remove("css3d-ready"), e.style.position = "", e.style.inset = "", e.style.width = "", e.style.height = "";
      }
      this.ctx.css3dRenderer.domElement.remove(), this.ctx = null;
    }
  }
  /**
   * 初始化 Three.js WebGPU 场景。
   * 包括：渲染器、相机、控制器、CSS3DRenderer、卷轴几何体、木杆、灯光、动画循环。
   */
  async initThreeJS() {
    this._cleanup();
    const e = this.scrollWidth, s = this.scrollHeight, t = s * Math.max(0.1, Math.min(0.98, this.contentRatio)), i = Math.round(U * t / e), l = e / U, c = this.canvasContainer, u = c.clientWidth || 575, n = c.clientHeight || 770, a = new xt(), h = new wt(42, u / n, 0.1, 100);
    h.position.set(0, 0, 5.5);
    const r = new St({ alpha: !0, antialias: !0 });
    r.setSize(u, n), r.setPixelRatio(Math.min(window.devicePixelRatio, 2)), c.appendChild(r.domElement), await r.init();
    const f = new Ct(h, r.domElement);
    f.enabled = this.enableControls, f.enableDamping = !0, f.dampingFactor = 0.06, f.autoRotate = !1;
    const p = new Mt();
    p.setSize(u, n), this.css3dCanvas.appendChild(p.domElement);
    const m = this.slotContainer;
    m.style.position = "absolute", m.style.inset = "auto", m.style.width = `${U}px`, m.style.height = `${i}px`, this._orbitRelayHandler = (o) => {
      o.target.closest("button") || (o.preventDefault(), r.domElement.dispatchEvent(new PointerEvent("pointerdown", o)));
    }, m.addEventListener("pointerdown", this._orbitRelayHandler);
    const g = new _t(m);
    g.position.set(0, 0, 0.0425), g.scale.setScalar(l), a.add(g);
    const Z = It(), N = Rt(0), { colorNode: st, positionNode: ot } = Ot(
      Z,
      N
    ), F = new Nt();
    F.side = Pt, F.colorNode = st, F.positionNode = ot;
    const Q = 80, tt = new At(), T = new Float32Array(Q * 3);
    for (let o = 0; o < Q; o++)
      T[o * 3] = (Math.random() - 0.5) * 2.6, T[o * 3 + 1] = (Math.random() - 0.5) * 4, T[o * 3 + 2] = (Math.random() - 0.5) * 0.2;
    tt.setAttribute(
      "position",
      new Bt(T, 3)
    );
    const { colorNode: nt, positionNode: it } = Gt(), P = new Et();
    P.blending = zt, P.size = 0.05, P.colorNode = nt, P.positionNode = it;
    const L = new Ht(tt, P);
    L.visible = !1, a.add(L);
    const X = new Dt(e, s, 96, 192), v = X.attributes.position;
    for (let o = 0; o < v.count; o++) {
      const y = v.getX(o), A = v.getY(o), B = y / e + 0.5, J = A / s + 0.5, at = Y(B * 1.6 + 1.1, J * 1.6 + 0.7), k = Y(B * 4.2, J * 4.2), q = Y(B * 2.8 + 5.3, J * 2.8 + 2.1), C = 0.13 + _(B * 3, 7.7) * 0.32, M = t / 2 + (_(B * 2.5, 13.1) - 0.5) * 0.24;
      if (A > M) {
        const w = (A - M) / C;
        v.setX(o, y + (q - 0.5) * 0.08), v.setY(o, M + C * Math.sin(w)), v.setZ(o, C * (Math.cos(w) - 1) + (k - 0.47) * 0.07);
      } else if (A < -M) {
        const w = (-A - M) / C;
        v.setX(o, y + (q - 0.5) * 0.08), v.setY(o, -(M + C * Math.sin(w))), v.setZ(o, C * (Math.cos(w) - 1) + (k - 0.47) * 0.07);
      } else {
        const w = (at - 0.47) * 0.12, rt = (k - 0.47) * 0.06;
        v.setX(o, y + (q - 0.5) * 0.03), v.setZ(o, w + rt);
      }
    }
    X.computeVertexNormals(), a.add(new Ft(X, F));
    const $ = new Tt(16770496, 0.6);
    a.add($), a.add(new Lt(16765072, 1.4).translateZ(5).translateX(2));
    const W = new Wt();
    W.connect(document), this.ctx = {
      scene: a,
      camera: h,
      renderer: r,
      css3dRenderer: p,
      controls: f,
      burnProgress: N,
      clock: W,
      startBurn: !1,
      particleSystem: L,
      ambientLight: $
    }, this._pendingIgnite && (this.ctx.startBurn = !0, this._pendingIgnite = !1), r.setAnimationLoop(() => {
      if (!this.ctx) return;
      W.update();
      const o = W.getDelta();
      f.update(), this.ctx.startBurn && (L.visible = !0, N.value = Math.min(
        N.value + o * this.burnSpeed,
        2
      ), a.position.z -= o * 0.08, $.intensity = 0.6 + Math.sin(Date.now() * 0.01) * 0.2, N.value >= 1.32 && (r.setAnimationLoop(null), this.setAttribute("closing", ""), this.dispatchEvent(
        new CustomEvent("g1-intro-burned", {
          bubbles: !0,
          composed: !0
        })
      ), setTimeout(() => this.remove(), 200))), m.style.visibility = h.position.z >= 0 ? "" : "hidden", r.render(a, h), p.render(a, h);
    }), requestAnimationFrame(() => {
      m.classList.add("css3d-ready");
    }), new ResizeObserver(() => {
      const o = c.clientWidth, y = c.clientHeight;
      !o || !y || (r.setSize(o, y), p.setSize(o, y), h.aspect = o / y, h.updateProjectionMatrix());
    }).observe(c);
  }
};
b.styles = lt`
    :host {
      --g1-scroll-bg: radial-gradient(
        ellipse at 50% 40%,
        rgba(20, 11, 3, 0.45) 0%,
        rgba(3, 1, 0, 0.8) 60%
      );
      touch-action: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      margin: auto;
      background: var(--g1-scroll-bg);
      /* 燃烧结束后整体淡出 */
      transition: opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* 燃烧结束 → 添加 [closing] 属性 → 整体淡出 */
    :host([closing]) {
      opacity: 0;
    }

    .scroll-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    #webgl-canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    #css3d-canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
    }

    .slot-container {
      position: absolute;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transition:
        opacity 0.6s ease,
        filter 0.9s ease;
      will-change: transform, opacity;
    }

    .slot-container.css3d-ready {
      opacity: 1;
    }

    .slot-container.burning {
      opacity: 0;
      filter: blur(5px) brightness(150%) drop-shadow(0 0 12px #c0680099);
    }

    .header-area {
      flex-shrink: 0;
    }

    .main-area {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      scrollbar-width: none;
    }

    .footer-area {
      flex-shrink: 0;
    }
  `;
x([
  D({ type: Number })
], b.prototype, "burnSpeed", 2);
x([
  D({ type: Boolean })
], b.prototype, "enableControls", 2);
x([
  D({ type: Number })
], b.prototype, "scrollWidth", 2);
x([
  D({ type: Number })
], b.prototype, "scrollHeight", 2);
x([
  D({ type: Number })
], b.prototype, "contentRatio", 2);
x([
  ct()
], b.prototype, "isBurning", 2);
x([
  K("#webgl-canvas")
], b.prototype, "canvasContainer", 2);
x([
  K("#css3d-canvas")
], b.prototype, "css3dCanvas", 2);
x([
  K(".slot-container")
], b.prototype, "slotContainer", 2);
b = x([
  ht("g1-intro-scroll")
], b);
export {
  b as IntroScroll
};
