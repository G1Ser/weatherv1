import{i as e,a as t,b as r,t as i}from"../chunks/lit-DTsLoCx_.js";let o=class extends t{render(){return r`<div class="skeleton-item"></div>`}};o.styles=e`
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
  `,o=((e,t)=>{for(var r,i=t,o=e.length-1;o>=0;o--)(r=e[o])&&(i=r(i)||i);return i})([i("g1-skeleton")],o);export{o as Skeleton};
