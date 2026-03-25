"use strict";(self.webpackChunkweatherv1=self.webpackChunkweatherv1||[]).push([[554],{9554(e,t,r){r.r(t),r.d(t,{Skeleton:()=>s});var i=r(4678),n=Object.getOwnPropertyDescriptor;let s=class extends i.a{render(){return i.b`<div class="skeleton-item"></div>`}};s.styles=i.i`
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
  `,s=((e,t,r,i)=>{for(var s,a=i>1?void 0:i?n(t,r):t,o=e.length-1;o>=0;o--)(s=e[o])&&(a=s(a)||a);return a})([(0,i.t)("g1-skeleton")],s)}}]);