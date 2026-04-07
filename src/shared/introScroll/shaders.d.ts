import { CanvasTexture } from 'three/webgpu';
import { default as Node } from 'three/src/nodes/core/Node.js';
/**
 * 在 CPU 上用 Canvas 2D API 绘制一张老化羊皮纸纹理。
 *
 * 绘制步骤：
 *   1. 径向渐变填充底色（中心偏亮黄 → 边缘深焦棕，模拟光照与边缘焦化）
 *   2. 叠加若干椭圆形半透明污迹（模拟水渍、霉斑等自然老化痕迹）
 *
 * @returns 已设置 SRGBColorSpace 的 CanvasTexture，可直接赋给材质
 */
interface PaperTextureOptions {
  size: number;
}
export declare function createAgedPaperTexture(options: PaperTextureOptions): CanvasTexture;
/**
 * 构建卷轴燃烧效果所需的全部 TSL 节点。
 *
 * 返回两个节点，分别赋给 MeshBasicNodeMaterial 的对应属性：
 *   colorNode    → material.colorNode    （片元着色：燃烧颜色 + Discard）
 *   positionNode → material.positionNode （顶点着色：纸张微抖动）
 *
 * @param paperTex      羊皮纸纹理（由 createAgedPaperTexture 生成）
 * @param burnProgress  燃烧进度 uniform（0 = 未开始，≥1.32 = 视为烧尽）
 */
export declare function buildScrollShaders(
  paperTex: CanvasTexture,
  burnProgress: Node<'float'>,
): {
  colorNode: Node<'vec3'>;
  positionNode: import('three/webgpu').VarNode<'vec3'>;
};
/**
 * 构建余烬粒子飘散效果的 TSL 节点。
 *
 * 粒子在卷轴燃烧时可见，模拟火星从纸面飘离的效果。
 * 每个粒子用 instanceIndex 区分，确保生命周期相位错开（不同步）。
 *
 * 返回的节点赋给 PointsNodeMaterial：
 *   colorNode    → material.colorNode    （粒子颜色 + 生命周期透明度）
 *   positionNode → material.positionNode （粒子上升 + 横向漂移）
 */
export declare function buildParticleShaders(): {
  colorNode: Node<'vec3'>;
  positionNode: import('three/webgpu').VarNode<'vec3'>;
};
export {};
