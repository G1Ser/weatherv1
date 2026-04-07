import{i as t,n as o,r as s,a as e,b as n,t as i}from"../chunks/lit-DTsLoCx_.js";import"../svgIcon/index.js";var a=Object.defineProperty,r=Object.getOwnPropertyDescriptor,p=(t,o,s,e)=>{for(var n,i=e>1?void 0:e?r(o,s):o,p=t.length-1;p>=0;p--)(n=t[p])&&(i=(e?n(o,s,i):n(i))||i);return e&&i&&a(o,s,i),i};const l={info:'<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1768320099105"\n    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4632" width="14"\n    height="14" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <path\n        d="M597.333333 213.333333c0 46.933333-38.4 85.333333-85.333333 85.333334s-85.333333-38.4-85.333333-85.333334 38.4-85.333333 85.333333-85.333333 85.333333 38.4 85.333333 85.333333zM597.333333 810.666667c0 46.933333-38.4 85.333333-85.333333 85.333333s-85.333333-38.4-85.333333-85.333333v-341.333334c0-46.933333 38.4-85.333333 85.333333-85.333333s85.333333 38.4 85.333333 85.333333v341.333334z"\n        fill="#1890ff" p-id="4633"></path>\n</svg>',success:'<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1767871993491"\n    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1646"\n    xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">\n    <path\n        d="M122.28096 536.623104c-9.940992-9.925632-11.548672-25.360384-2.78528-36.407296l20.487168-25.828352c8.397824-10.58816 24.108032-13.246464 35.211264-5.835776l177.3312 118.35904c9.353216 6.243328 25.452544 5.430272 34.185216-1.654784l468.5824-380.16c10.532864-8.54528 27.030528-7.817216 36.261888 1.400832l11.542528 11.52512c10.04544 10.03008 9.314304 25.951232-1.215488 36.465664l-502.92736 502.183936c-15.64672 15.624192-41.337856 14.94016-57.445376-1.142784l-219.22816-218.9056z"\n        fill="#52c41a" p-id="1647"></path>\n</svg>',error:'<?xml version="1.0" standalone="no"?>\r\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1767872123766"\r\n    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6243"\r\n    xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">\r\n    <path d="M265.28 310.72a32 32 0 0 1 45.44-45.44l448 448a32 32 0 0 1-45.44 45.44z" p-id="6244" fill="#ff4d4f"></path>\r\n    <path d="M713.28 265.28a32 32 0 0 1 45.44 45.44l-448 448a32 32 0 0 1-45.44-45.44z" p-id="6245" fill="#ff4d4f">\r\n    </path>\r\n</svg>'};let c=class extends e{constructor(){super(...arguments),this.message="",this.type="info",this.duration=2e3,this.leaving=!1}connectedCallback(){super.connectedCallback(),setTimeout(()=>this.close(),this.duration)}close(){this.leaving=!0,setTimeout(()=>this.remove(),300)}render(){return n`
      <div
        class="toast-container toast-container--${this.type} ${this.leaving?"toast-leave":"toast-enter"}"
      >
        <g1-svg-icon .svg="${l[this.type]}" size="20"></g1-svg-icon>
        <span class="toast-message">${this.message}</span>
      </div>
    `}};function d(t,o="info",s=2e3){const e=document.createElement("g1-toast");e.message=t,e.type=o,e.duration=s,document.body.appendChild(e)}c.styles=t`
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
  `,p([o({type:String})],c.prototype,"message",2),p([o({type:String})],c.prototype,"type",2),p([o({type:Number})],c.prototype,"duration",2),p([s()],c.prototype,"leaving",2),c=p([i("g1-toast")],c);export{d as showToast};
