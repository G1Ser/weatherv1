/**
 * 本地存储工具
 */
const storage = {
  /**
   * @description 保存数据到本地存储
   * @template T -数据类型
   * @param {string} key -存储键名
   * @param {T} value -存储值
   */
  set<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('localStorage sava error:', e);
    }
  },
  /**
   * @description 从本地存储获取数据
   * @template T -数据类型
   * @param {string} key -存储键名
   * @param {T} defaultValue -默认值
   * @returns {T} 获取到的数据
   */
  get<T>(key: string, defaultValue: T) {
    const value = localStorage.getItem(key);
    if (!value) return defaultValue;
    try {
      return JSON.parse(value) as T;
    } catch (e) {
      console.error('localStorage parse error:', e);
      return defaultValue;
    }
  },
  /**
   * @description 移除指定键的数据
   * @param {string} key -存储键名
   */
  remove(key: string) {
    localStorage.removeItem(key);
  },
  /**
   * @description 清除所有本地存储
   */
  clear() {
    localStorage.clear();
  },
};

export default storage;
