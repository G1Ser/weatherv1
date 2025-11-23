const weatherCategories = {
  // 1. 晴朗天气
  sun: ['晴', '少云', '热'],
  // 2. 多云天气
  cloudy: ['晴间多云', '多云', '阴'],
  // 3. 小雨天气
  'light-rain': ['小雨', '毛毛雨/细雨', '小雨-中雨'],
  // 4. 中到大雨
  rain: ['中雨', '大雨', '雨', '中雨-大雨'],
  // 5. 暴雨天气
  'heavy-rain': ['暴雨', '大暴雨', '特大暴雨', '大雨-暴雨', '暴雨-大暴雨', '大暴雨-特大暴雨', '极端降雨'],
  // 6. 阵雨天气
  showers: ['阵雨', '强阵雨'],
  // 7. 雷雨天气
  thunderstorm: ['雷阵雨', '强雷阵雨', '雷阵雨并伴有冰雹'],
  // 8. 冻雨
  'ice-rain': ['冻雨', '雨雪天气', '雨夹雪', '阵雨夹雪'],
  // 9. 小到中雪
  'light-snow': ['雪', '阵雪', '小雪', '中雪', '小雪-中雪'],
  // 10. 大雪/暴雪
  'heavy-snow': ['大雪', '暴雪', '中雪-大雪', '大雪-暴雪'],
  // 11. 浮尘/扬沙
  ash: ['浮尘', '扬沙'],
  // 12. 沙尘暴
  dust: ['沙尘暴', '强沙尘暴'],
  // 13. 雾霾天气
  fog: ['雾', '浓雾', '强浓雾', '轻雾', '大雾', '特强浓雾', '霾', '中度霾', '重度霾', '严重霾'],
  // 14. 微风/和风
  breeze: ['平静', '有风', '微风', '和风', '清风'],
  // 15. 强风
  'strong-breeze': ['强风/劲风', '疾风', '大风', '烈风'],
  // 16. 风暴/台风
  typhoon: ['风暴', '狂爆风', '飓风', '热带风暴', '龙卷风'],
  // 17. 寒冷天气
  cold: ['冷'],
  // 18. 未知/其他
  unknown: ['未知'],
};

/**
 * @description 根据天气获取对应icon
 * @param weather 天气现象名称
 * @returns 对应的图标名称,未找到则返回 'unknown'
 */
export function getWeatherIcon(weather) {
  for (const [icon, weathers] of Object.entries(weatherCategories)) {
    if (weathers.includes(weather)) {
      return icon;
    }
  }
  return 'unknown';
}
