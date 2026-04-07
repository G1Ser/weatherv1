import{i as t,n as e,r as s,a as r,b as i,t as o}from"../chunks/lit-DTsLoCx_.js";var n=Object.defineProperty,c=Object.getOwnPropertyDescriptor,a=(t,e,s,r)=>{for(var i,o=r>1?void 0:r?c(e,s):e,a=t.length-1;a>=0;a--)(i=t[a])&&(o=(r?i(e,s,o):i(o))||o);return r&&o&&n(e,s,o),o};const h={basePath:""};function g(t){Object.assign(h,t)}let p=class extends r{constructor(){super(...arguments),this.name="",this.src="",this.svg="",this.size="1rem",this.color="currentColor",this.currentSvgNode=null}updated(t){if(super.updated(t),(t.has("svg")||t.has("src")||t.has("name"))&&this.loadSvg(),t.has("size")){const t=/^\d+(\.\d+)?$/.test(this.size)?`${this.size}px`:this.size;this.style.setProperty("--icon-size",t)}t.has("color")&&this.style.setProperty("--icon-color",this.color)}loadSvg(){if(this.svg)this.parseSvgString(this.svg);else if(this.src)this.fetchSvg(this.src);else if(this.name&&h.basePath){const t=`${h.basePath.replace(/\/$/,"")}/${this.name}.svg`;this.fetchSvg(t)}else this.currentSvgNode=null}parseSvgString(t){const e=(new DOMParser).parseFromString(t,"image/svg+xml");this.currentSvgNode=e.querySelector("svg")}async fetchSvg(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status}`);const s=await e.text();this.parseSvgString(s)}catch(e){console.warn(`[g1-svg-icon] Failed to fetch SVG: ${t}`,e),this.currentSvgNode=null}}render(){return i`<div part="wrapper" class="icon-wrapper">
      ${this.currentSvgNode}
    </div>`}};p.styles=t`
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
  `,a([e({type:String})],p.prototype,"name",2),a([e({type:String})],p.prototype,"src",2),a([e({type:String})],p.prototype,"svg",2),a([e({type:String})],p.prototype,"size",2),a([e({type:String})],p.prototype,"color",2),a([s()],p.prototype,"currentSvgNode",2),p=a([o("g1-svg-icon")],p);export{p as SvgIcon,g as configureSvgIcon};
