import { i as c, n as l, r as d, a as g, b as v, t as w } from "../chunks/lit-DBvanXZV.js";
import "../svgIcon/index.js";
const h = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1768320099105"
    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4632" width="14"
    height="14" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path
        d="M597.333333 213.333333c0 46.933333-38.4 85.333333-85.333333 85.333334s-85.333333-38.4-85.333333-85.333334 38.4-85.333333 85.333333-85.333333 85.333333 38.4 85.333333 85.333333zM597.333333 810.666667c0 46.933333-38.4 85.333333-85.333333 85.333333s-85.333333-38.4-85.333333-85.333333v-341.333334c0-46.933333 38.4-85.333333 85.333333-85.333333s85.333333 38.4 85.333333 85.333333v341.333334z"
        fill="#1890ff" p-id="4633"></path>
</svg>`, f = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1767871993491"
    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1646"
    xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">
    <path
        d="M122.28096 536.623104c-9.940992-9.925632-11.548672-25.360384-2.78528-36.407296l20.487168-25.828352c8.397824-10.58816 24.108032-13.246464 35.211264-5.835776l177.3312 118.35904c9.353216 6.243328 25.452544 5.430272 34.185216-1.654784l468.5824-380.16c10.532864-8.54528 27.030528-7.817216 36.261888 1.400832l11.542528 11.52512c10.04544 10.03008 9.314304 25.951232-1.215488 36.465664l-502.92736 502.183936c-15.64672 15.624192-41.337856 14.94016-57.445376-1.142784l-219.22816-218.9056z"
        fill="#52c41a" p-id="1647"></path>
</svg>`, x = `<?xml version="1.0" standalone="no"?>\r
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1767872123766"\r
    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6243"\r
    xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">\r
    <path d="M265.28 310.72a32 32 0 0 1 45.44-45.44l448 448a32 32 0 0 1-45.44 45.44z" p-id="6244" fill="#ff4d4f"></path>\r
    <path d="M713.28 265.28a32 32 0 0 1 45.44 45.44l-448 448a32 32 0 0 1-45.44-45.44z" p-id="6245" fill="#ff4d4f">\r
    </path>\r
</svg>`;
var m = Object.defineProperty, u = Object.getOwnPropertyDescriptor, a = (i, e, n, t) => {
  for (var s = t > 1 ? void 0 : t ? u(e, n) : e, r = i.length - 1, p; r >= 0; r--)
    (p = i[r]) && (s = (t ? p(e, n, s) : p(s)) || s);
  return t && s && m(e, n, s), s;
};
const y = {
  info: h,
  success: f,
  error: x
};
let o = class extends g {
  constructor() {
    super(...arguments), this.message = "", this.type = "info", this.duration = 2e3, this.leaving = !1;
  }
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => this.close(), this.duration);
  }
  close() {
    this.leaving = !0, setTimeout(() => this.remove(), 300);
  }
  render() {
    return v`
      <div
        class="toast-container toast-container--${this.type} ${this.leaving ? "toast-leave" : "toast-enter"}"
      >
        <g1-svg-icon .svg="${y[this.type]}" size="20"></g1-svg-icon>
        <span class="toast-message">${this.message}</span>
      </div>
    `;
  }
};
o.styles = c`
    .toast-container {
      position: fixed;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      padding: 12px 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast-container--success {
      background-color: #163b34;
      border: 1px solid #348353;
    }
    .toast-container--info {
      background-color: #003a8c;
      border: 1px solid #096dd9;
    }
    .toast-container--error {
      background-color: #4f0d0e;
      border: 1px solid #a7363a;
    }
    .toast-message {
      font-size: 12px;
      color: var(--toast-text-color, #f5f7f9);
    }
    .toast-enter {
      animation: toast-in 0.5s ease-out;
    }
    .toast-leave {
      animation: toast-out 0.3s ease-in forwards;
    }
    @keyframes toast-in {
      from {
        top: 10px;
        opacity: 0;
      }
      to {
        top: 30px;
        opacity: 1;
      }
    }
    @keyframes toast-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;
a([
  l({ type: String })
], o.prototype, "message", 2);
a([
  l({ type: String })
], o.prototype, "type", 2);
a([
  l({ type: Number })
], o.prototype, "duration", 2);
a([
  d()
], o.prototype, "leaving", 2);
o = a([
  w("g1-toast")
], o);
function C(i, e = "info", n = 2e3) {
  const t = document.createElement("g1-toast");
  t.message = i, t.type = e, t.duration = n, document.body.appendChild(t);
}
export {
  C as showToast
};
