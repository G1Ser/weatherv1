import{i as t,n as e,r as i,e as s,a as n,b as o,t as a}from"../chunks/lit-DTsLoCx_.js";import{C as r,S as l,F as d,f as c,s as h,v as p,a as u,b as m,m as b,u as y,t as v,I as g,D as f,c as x,d as w,e as R,p as _,i as C,g as z,P as M,W as P,O as E,h as S,j as I,k as H,M as N,l as A,B as L,n as k,o as B,A as O,q as F,r as T,w as K,x as W,y as X,T as j}from"../chunks/three-Ikwtya61.js";const D=[/iphone/i,/ipod/i,/ipad/i,/android/i,/harmonyos/i,/mobile/i,/mi\s?\d+/i,/redmi/i,/hm\snote/i,/huawei/i,/honor/i,/oppo/i,/vivo/i,/oneplus/i,/realme/i,/iqoo/i,/sm-[a-z0-9]+/i,/pixel\s?\d/i,/moto/i,/nokia/i];var q=Object.defineProperty,Y=Object.getOwnPropertyDescriptor,Z=(t,e,i,s)=>{for(var n,o=s>1?void 0:s?Y(e,i):e,a=t.length-1;a>=0;a--)(n=t[a])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&q(e,i,o),o};const J=(t,e)=>{const i=43758.5453*Math.sin(127.1*t+311.7*e);return i-Math.floor(i)},V=(t,e)=>{const i=Math.floor(t),s=Math.floor(e),n=t-i,o=e-s,a=n*n*(3-2*n),r=o*o*(3-2*o);return J(i,s)*(1-a)*(1-r)+J(i+1,s)*a*(1-r)+J(i,s+1)*(1-a)*r+J(i+1,s+1)*a*r},$=(t,e)=>.5*V(t,e)+.25*V(2.1*t,2.1*e)+.125*V(4.3*t,4.3*e)+.0625*V(8.7*t,8.7*e);let G=class extends n{constructor(){super(...arguments),this.burnSpeed=.46,this.enableControls=!0,this.scrollWidth=1.8,this.scrollHeight=2.4,this.contentRatio=.8,this.isBurning=!1,this._pendingIgnite=!1,this.ctx=null,this.mobile=(()=>{const t="undefined"!=typeof navigator?navigator.userAgent:"";return!!t&&D.some(e=>e.test(t))})(),this._orbitRelayHandler=null,this._activeRelayPointerId=null,this._resizeObserver=null,this._resizeRaf=0}render(){return o`
      <div class="scroll-wrapper" role="dialog" aria-modal="true">
        <div id="webgl-canvas"></div>
        <div id="css3d-canvas"></div>
        <div class="slot-container ${this.isBurning?"burning":""}">
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
    `}ignite(){this.isBurning||(this.isBurning=!0,this.dispatchEvent(new CustomEvent("burn",{bubbles:!0,composed:!0})),this.ctx?this.ctx.startBurn=!0:this._pendingIgnite=!0)}updated(t){(t.has("scrollWidth")||t.has("scrollHeight")||t.has("contentRatio"))&&this.ctx&&this.initThreeJS()}async firstUpdated(){await new Promise(t=>requestAnimationFrame(()=>t())),await this.initThreeJS()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup()}_cleanup(){if(this._orbitRelayHandler&&(this.slotContainer?.removeEventListener("pointerdown",this._orbitRelayHandler),this.slotContainer?.removeEventListener("pointermove",this._orbitRelayHandler),this.slotContainer?.removeEventListener("pointerup",this._orbitRelayHandler),this.slotContainer?.removeEventListener("pointercancel",this._orbitRelayHandler),this._orbitRelayHandler=null,this._activeRelayPointerId=null),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._resizeRaf&&(cancelAnimationFrame(this._resizeRaf),this._resizeRaf=0),this.ctx){this.ctx.renderer.setAnimationLoop(null),this.ctx.controls.dispose(),this.ctx.renderer.dispose();const t=this.slotContainer;if(t){const e=this.canvasContainer.parentElement;e&&t.parentElement!==e&&e.appendChild(t),t.classList.remove("css3d-ready"),t.style.position="",t.style.inset="",t.style.width="",t.style.height=""}this.ctx.css3dRenderer.domElement.remove(),this.ctx=null}}async initThreeJS(){this._cleanup();const t=this.scrollWidth,e=this.scrollHeight,i=e*Math.max(.1,Math.min(.98,this.contentRatio)),s=Math.round(500*i/t),n=t/500,o=window.devicePixelRatio||1,a=this.canvasContainer,D=a.clientWidth||575,q=a.clientHeight||770,Y=new z,Z=new M(42,D/q,.1,100);Z.position.set(0,0,5.5);const J=new P({alpha:!0,antialias:!this.mobile});J.setSize(D,q);const G=this.mobile?1:Math.min(o,2);J.setPixelRatio(G),a.appendChild(J.domElement),await J.init();const U=new E(Z,J.domElement);U.enabled=this.enableControls,U.enableDamping=!0,U.dampingFactor=.06,U.autoRotate=!1;const Q=new S;Q.setSize(D,q),this.css3dCanvas.appendChild(Q.domElement);const tt=this.slotContainer;tt.style.position="absolute",tt.style.inset="auto",tt.style.width="500px",tt.style.height=`${s}px`,this._orbitRelayHandler=t=>{const e=t.target;if(!e?.closest("button,a,input,textarea,select,label,[contenteditable='true'],[data-no-orbit]")){if("pointerdown"===t.type){if(!t.isPrimary)return;if("mouse"===t.pointerType&&0!==t.button)return;this._activeRelayPointerId=t.pointerId,tt.setPointerCapture(t.pointerId)}else if(this._activeRelayPointerId!==t.pointerId)return;t.preventDefault(),((t,e)=>{J.domElement.dispatchEvent(new PointerEvent(t,{bubbles:!0,cancelable:!0,composed:!0,pointerId:e.pointerId,pointerType:e.pointerType,isPrimary:e.isPrimary,button:e.button,buttons:e.buttons,clientX:e.clientX,clientY:e.clientY,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,metaKey:e.metaKey}))})(t.type,t),"pointerup"!==t.type&&"pointercancel"!==t.type||(this._activeRelayPointerId=null,tt.hasPointerCapture(t.pointerId)&&tt.releasePointerCapture(t.pointerId))}},tt.addEventListener("pointerdown",this._orbitRelayHandler),tt.addEventListener("pointermove",this._orbitRelayHandler),tt.addEventListener("pointerup",this._orbitRelayHandler),tt.addEventListener("pointercancel",this._orbitRelayHandler);const et=new I(tt);et.position.set(0,0,.0425),et.scale.setScalar(n),Y.add(et);const it=function(t){const e=Math.max(128,Math.min(2048,t.size)),i=document.createElement("canvas");i.width=i.height=e;const s=i.getContext("2d"),n=s.createRadialGradient(.5*e,.42*e,.05*e,.5*e,.5*e,.68*e);n.addColorStop(0,"#e0cf84"),n.addColorStop(.25,"#ccb75c"),n.addColorStop(.55,"#a88b36"),n.addColorStop(1,"#3c2806"),s.fillStyle=n,s.fillRect(0,0,e,e);for(const{x:a,y:r,rx:l,ry:d,a:c}of[{x:200,y:270,rx:95,ry:62,a:.09},{x:780,y:560,rx:125,ry:78,a:.07},{x:370,y:835,rx:72,ry:48,a:.1},{x:125,y:700,rx:82,ry:52,a:.09}]){s.save(),s.translate(a,r),s.scale(l/60,d/60);const t=s.createRadialGradient(0,0,0,0,0,60);t.addColorStop(0,`rgba(50, 24, 2, ${2*c})`),t.addColorStop(1,"rgba(50, 24, 2, 0)"),s.fillStyle=t,s.beginPath(),s.arc(0,0,60,0,2*Math.PI),s.fill(),s.restore()}const o=new r(i);return o.colorSpace=l,o}({size:this.mobile?o>=2?512:256:1024}),st=H(0),{colorNode:nt,positionNode:ot}=function(t,e){const i=d(([t])=>c(h(t.dot(p(127.1,311.7))).mul(43758.5453))),s=d(([t])=>{const e=u(t),s=c(t),n=i(e),o=i(e.add(p(1,0))),a=i(e.add(p(0,1))),r=i(e.add(p(1,1))),l=s.mul(s).mul(m(3).sub(s.mul(2)));return b(n,o,l.x).add(a.sub(n).mul(l.y).mul(m(1).sub(l.x))).add(r.sub(o).mul(l.x).mul(l.y))}),n=d(([t])=>s(t).mul(.5).add(s(t.mul(2)).mul(.25)).add(s(t.mul(4)).mul(.125)));return{colorNode:d(()=>{const i=y(),s=n(i.mul(3.6).add(v.mul(.1))),o=m(1).sub(i.y).mul(.8).add(m(1).sub(i.x).mul(.12)).add(h(v.mul(.65).add(i.x.mul(2.8))).mul(.05)),a=s.mul(.5).add(o.mul(.9)),r=e.mul(2.2),l=a.sub(r);g(l.lessThan(m(0)),()=>f());const d=x(t,i).rgb,c=b(b(b(w(1,.97,.85),w(1,.88,.05),R(m(0),m(.013),l)),w(.98,.4,.01),R(m(.013),m(.042),l)),w(.07,.02,.01),R(m(.08),m(.118),l)),p=m(1).sub(R(m(.108),m(.162),l));return b(d,c,p)})(),positionNode:d(()=>{const t=_.toVar(),i=h(v.mul(35)).mul(e).mul(.008);return t.z.addAssign(i),t})()}}(it,st),at=new N;at.side=A,at.colorNode=nt,at.positionNode=ot;const rt=this.mobile?30:80,lt=new L,dt=new Float32Array(3*rt);for(let r=0;r<rt;r++)dt[3*r]=2.6*(Math.random()-.5),dt[3*r+1]=4*(Math.random()-.5),dt[3*r+2]=.2*(Math.random()-.5);lt.setAttribute("position",new k(dt,3));const{colorNode:ct,positionNode:ht}={colorNode:d(()=>{const t=c(v.mul(.3).add(C.toFloat().mul(.13))),e=h(t.mul(Math.PI)).smoothstep(0,.5);return w(m(1),m(.4),m(.1)).mul(e)})(),positionNode:d(()=>{const t=_.toVar(),e=c(v.mul(.2).add(C.toFloat().mul(.5)));return t.y.addAssign(e.mul(2)),t.x.addAssign(h(v.add(C.toFloat())).mul(.1)),t})()},pt=new B;pt.blending=O,pt.size=.05,pt.colorNode=ct,pt.positionNode=ht;const ut=new F(lt,pt);ut.visible=!1,Y.add(ut);const mt=new T(t,e,this.mobile?40:96,this.mobile?80:192),bt=mt.attributes.position;for(let r=0;r<bt.count;r++){const s=bt.getX(r),n=bt.getY(r),o=s/t+.5,a=n/e+.5,l=$(1.6*o+1.1,1.6*a+.7),d=$(4.2*o,4.2*a),c=$(2.8*o+5.3,2.8*a+2.1),h=.13+.32*V(3*o,7.7),p=i/2+.24*(V(2.5*o,13.1)-.5);if(n>p){const t=(n-p)/h;bt.setX(r,s+.08*(c-.5)),bt.setY(r,p+h*Math.sin(t)),bt.setZ(r,h*(Math.cos(t)-1)+.07*(d-.47))}else if(n<-p){const t=(-n-p)/h;bt.setX(r,s+.08*(c-.5)),bt.setY(r,-(p+h*Math.sin(t))),bt.setZ(r,h*(Math.cos(t)-1)+.07*(d-.47))}else{const t=.12*(l-.47),e=.06*(d-.47);bt.setX(r,s+.03*(c-.5)),bt.setZ(r,t+e)}}mt.computeVertexNormals(),Y.add(new K(mt,at));const yt=new W(16770496,.6);Y.add(yt),Y.add(new X(16765072,1.4).translateZ(5).translateX(2));const vt=new j;vt.connect(document),this.ctx={scene:Y,camera:Z,renderer:J,css3dRenderer:Q,controls:U,burnProgress:st,clock:vt,startBurn:!1,particleSystem:ut,ambientLight:yt},this._pendingIgnite&&(this.ctx.startBurn=!0,this._pendingIgnite=!1),J.setAnimationLoop(()=>{if(!this.ctx)return;vt.update();const t=vt.getDelta();U.update(),this.ctx.startBurn&&(ut.visible=!0,st.value=Math.min(st.value+t*this.burnSpeed,2),Y.position.z-=.08*t,yt.intensity=.6+.2*Math.sin(.01*Date.now()),st.value>=1.32&&(J.setAnimationLoop(null),this.setAttribute("closing",""),this.dispatchEvent(new CustomEvent("g1-intro-burned",{bubbles:!0,composed:!0})),setTimeout(()=>this.remove(),200))),tt.style.visibility=Z.position.z>=0?"":"hidden",J.render(Y,Z),Q.render(Y,Z)}),requestAnimationFrame(()=>{tt.classList.add("css3d-ready")}),this._resizeObserver=new ResizeObserver(()=>{this._resizeRaf||(this._resizeRaf=requestAnimationFrame(()=>{this._resizeRaf=0;const t=a.clientWidth,e=a.clientHeight;t&&e&&(J.setSize(t,e),Q.setSize(t,e),Z.aspect=t/e,Z.updateProjectionMatrix())}))}),this._resizeObserver.observe(a)}};G.styles=t`
    :host {
      --g1-scroll-bg: radial-gradient(
        ellipse at 50% 40%,
        rgba(20, 11, 3, 0.45) 0%,
        rgba(3, 1, 0, 0.8) 60%
      );
      touch-action: manipulation;
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
      touch-action: pan-y;
      -webkit-overflow-scrolling: touch;
    }

    .footer-area {
      flex-shrink: 0;
    }
  `,Z([e({type:Number})],G.prototype,"burnSpeed",2),Z([e({type:Boolean})],G.prototype,"enableControls",2),Z([e({type:Number})],G.prototype,"scrollWidth",2),Z([e({type:Number})],G.prototype,"scrollHeight",2),Z([e({type:Number})],G.prototype,"contentRatio",2),Z([i()],G.prototype,"isBurning",2),Z([s("#webgl-canvas")],G.prototype,"canvasContainer",2),Z([s("#css3d-canvas")],G.prototype,"css3dCanvas",2),Z([s(".slot-container")],G.prototype,"slotContainer",2),G=Z([a("g1-intro-scroll")],G);export{G as IntroScroll};
