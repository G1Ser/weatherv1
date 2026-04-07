import { LitElement } from 'lit';
export declare class IntroScroll extends LitElement {
  /** 燃烧蔓延速度（burnProgress 每秒增量，默认 0.46） */
  burnSpeed: number;
  /** 是否启用鼠标/触摸轨道旋转控制（默认 true） */
  enableControls: boolean;
  /**
   * 卷轴纸张宽度（Three.js 世界单位）。
   * 改变后自动重建场景，默认 1.8。
   */
  scrollWidth: number;
  /**
   * 卷轴纸张总高度（Three.js 世界单位），含两端卷曲部分。
   * 内容可见区域约为总高度的 80%，其余用于卷边。
   * 改变后自动重建场景，默认 2.4。
   */
  scrollHeight: number;
  /**
   * 内容可见区域占纸张总高度的比例（0~1）。
   * 剩余部分平均分配给两端卷边：值越大内容区越高、卷边越小；
   * 值越小卷边越夸张。改变后自动重建场景，默认 0.8。
   */
  contentRatio: number;
  /** 是否处于燃烧状态（触发后驱动 CSS burning 类以淡出 slot 内容） */
  private isBurning;
  /** ignite() 在 Three.js 初始化完成前被调用时的缓冲标志 */
  private _pendingIgnite;
  private ctx;
  /** 手机端渲染优化 */
  private mobile;
  /**
   * 轨道控制事件中继处理器。
   * 将插槽内容区域的拖拽 pointerdown 转发给 WebGL canvas，
   * 使 OrbitControls 可在卷轴内容区域正常响应旋转操作。
   */
  private _orbitRelayHandler;
  private _activeRelayPointerId;
  private _resizeObserver;
  private _resizeRaf;
  private canvasContainer;
  private css3dCanvas;
  private slotContainer;
  static styles: import('lit').CSSResult;
  render(): import('lit').TemplateResult<1>;
  ignite(): void;
  protected updated(changedProps: Map<string, unknown>): void;
  protected firstUpdated(): Promise<void>;
  disconnectedCallback(): void;
  /**
   * 销毁 Three.js 上下文，释放 GPU 资源。
   * 在重新初始化前、或组件卸载时调用。
   * 同时将 slot-container 归还原位，保证 <slot> 投影不中断。
   */
  private _cleanup;
  /**
   * 初始化 Three.js WebGPU 场景。
   * 包括：渲染器、相机、控制器、CSS3DRenderer、卷轴几何体、木杆、灯光、动画循环。
   */
  private initThreeJS;
}
declare global {
  interface HTMLElementTagNameMap {
    'g1-intro-scroll': IntroScroll;
  }
}
