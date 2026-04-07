import { LitElement } from 'lit';
export declare class Skeleton extends LitElement {
  static styles: import('lit').CSSResult;
  render(): import('lit').TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    'g1-skeleton': Skeleton;
  }
}
