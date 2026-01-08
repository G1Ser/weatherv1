import { onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';
import commonStyle from '@/constant/console-style';

/**
 * 性能监控
 */
class PerformanceUtils {
  init() {
    this.monitorWebVitals();
  }
  /**
   * 页面加载速度分析
   */
  private monitorWebVitals() {
    // LCP - 最大内容绘制（主要内容加载完成 = 首屏加载）
    onLCP((metric: Metric) => {
      console.info('%c首屏加载完成 (LCP):' + this.formatTime(metric.value), commonStyle);
    });
    // FCP - 首次内容绘制（用户第一次看到内容）
    onFCP((metric: Metric) => {
      console.info('%c首次内容绘制 (FCP):' + this.formatTime(metric.value), commonStyle);
    });
    // TTFB - 服务器响应时间（第一个指标）
    onTTFB((metric: Metric) => {
      console.info('%c服务器响应 (TTFB):' + this.formatTime(metric.value), commonStyle);
    });
  }
  /**
   * 格式化时间
   */
  private formatTime(ms: number) {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  }
}

const performanceMonitor = new PerformanceUtils();

export default performanceMonitor;
