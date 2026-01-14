import { formatWeatherCasts } from '@/utils/gmap';
import type { WeatherCastsType } from '@/types/gmap';

describe('formatWeatherCasts', () => {
    const mockCasts: WeatherCastsType[] = [
        {
            "date": "2026-01-14",
            "week": 3,
            "dayweather": "多云",
            "nightweather": "多云",
            "daytemp": "2",
            "nighttemp": "-4",
            "daywind": "西",
            "nightwind": "西",
            "daypower": "1-3",
            "nightpower": "1-3",
        },
        {
            "date": "2026-01-15",
            "week": 4,
            "dayweather": "晴",
            "nightweather": "多云",
            "daytemp": "9",
            "nighttemp": "-4",
            "daywind": "东",
            "nightwind": "东",
            "daypower": "1-3",
            "nightpower": "1-3",
        },
        {
            "date": "2026-01-16",
            "week": 5,
            "dayweather": "晴",
            "nightweather": "多云",
            "daytemp": "3",
            "nighttemp": "-6",
            "daywind": "东北",
            "nightwind": "东北",
            "daypower": "1-3",
            "nightpower": "1-3",
        },
        {
            "date": "2026-01-17",
            "week": 6,
            "dayweather": "多云",
            "nightweather": "阴",
            "daytemp": "0",
            "nighttemp": "-6",
            "daywind": "东南",
            "nightwind": "东南",
            "daypower": "1-3",
            "nightpower": "1-3",
        }
    ];

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('白天时间（10点）应该返回 dayweather', () => {
        jest.spyOn(Date.prototype, 'getHours').mockReturnValue(10);

        const result = formatWeatherCasts(mockCasts);

        expect(result[0].weather).toBe('多云');
        expect(result[1].weather).toBe('晴');
    });

    it('夜晚时间（20点）应该返回 nightweather', () => {
        jest.spyOn(Date.prototype, 'getHours').mockReturnValue(20);

        const result = formatWeatherCasts(mockCasts);

        expect(result[0].weather).toBe('多云');
        expect(result[1].weather).toBe('多云');
    });

    it('第一天应该显示"今天"', () => {
        jest.spyOn(Date.prototype, 'getHours').mockReturnValue(10);

        const result = formatWeatherCasts(mockCasts);

        expect(result[0].week).toBe('今天');
    });

    it('第二天应该显示"明天"', () => {
        jest.spyOn(Date.prototype, 'getHours').mockReturnValue(10);

        const result = formatWeatherCasts(mockCasts);

        expect(result[1].week).toBe('明天');
    });

    it('第三天应该显示"周五"', () => {
        jest.spyOn(Date.prototype, 'getHours').mockReturnValue(10);

        const result = formatWeatherCasts(mockCasts);

        expect(result[2].week).toBe('周五');
    });

    it('应该正确格式化日期', () => {
        jest.spyOn(Date.prototype, 'getHours').mockReturnValue(10);

        const result = formatWeatherCasts(mockCasts);

        expect(result[0].date).toBe('01/14');
        expect(result[1].date).toBe('01/15');
        expect(result[2].date).toBe('01/16');
    });

    it('应该包含温度信息', () => {
        jest.spyOn(Date.prototype, 'getHours').mockReturnValue(10);

        const result = formatWeatherCasts(mockCasts);

        expect(result[0].maxTemp).toBe('2');
        expect(result[0].minTemp).toBe('-4');
    });

    it('应该包含天气图标', () => {
        jest.spyOn(Date.prototype, 'getHours').mockReturnValue(10);

        const result = formatWeatherCasts(mockCasts);

        expect(result[0].icon).toBe('cloudy');
        expect(result[1].icon).toBe('sun');
    });
});