"use strict";(self.webpackChunkweatherv1=self.webpackChunkweatherv1||[]).push([[643],{6643:(e,t,r)=>{r.r(t),r.d(t,{Skeleton:()=>a});var i=r(8193);let a=class extends i.a{render(){return i.b`<div class="skeleton-item"></div>`}};a.styles=i.i`
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
  `,a=((e,t)=>{for(var r,i=t,a=e.length-1;a>=0;a--)(r=e[a])&&(i=r(i)||i);return i})([(0,i.t)("g1-skeleton")],a)}}]);