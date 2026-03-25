import { LitElement } from 'lit';
export interface SvgIconConfig {
    /**
     * SVG 文件根路径（运行时 URL），配置后 name 属性自动拼接路径并 fetch。
     * @example
     * configureSvgIcon({ basePath: '/icons' })
     * // 之后使用: <g1-svg-icon name="home" />
     * // 运行时自动请求: /icons/home.svg
     */
    basePath: string;
}
export declare function configureSvgIcon(config: Partial<SvgIconConfig>): void;
export declare class SvgIcon extends LitElement {
    /** 图标名称，需配合 configureSvgIcon({ basePath }) 使用 */
    name: string;
    /** SVG 文件的完整 URL，运行时自动 fetch */
    src: string;
    /** 原始 SVG 字符串，消费者用 import icon from './icon.svg?raw' 后传入 */
    svg: string;
    size: string;
    color: string;
    private currentSvgNode;
    static styles: import('lit').CSSResult;
    updated(changedProperties: Map<string, unknown>): void;
    /**
     * 按优先级加载 SVG：
     * 1. svg prop（原始字符串，直接解析，无网络请求）
     * 2. src prop（完整 URL，运行时 fetch）
     * 3. name + basePath（运行时 fetch）
     */
    private loadSvg;
    private parseSvgString;
    private fetchSvg;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "g1-svg-icon": SvgIcon;
    }
}
