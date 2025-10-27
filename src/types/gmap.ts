export interface IpLocationResponseType {
  province: string;
  city: string;
  adcode: string;
  rectangle: string;
}

export type GeocodeLevelType = '省' | '市' | '区县';

export interface GeocodeType {
  province: string;
  city: string;
  district: string;
  adcode: string;
  level: GeocodeLevelType;
}

export interface GeocodeResponseType {
  geocodes: GeocodeType[];
}

export interface WeatherLivesType {
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
}

export interface WeatherForecastsType {
  casts: {
    date: string;
    week: string;
    dayweather: string;
    nightweather: string;
    daytemp: string;
    nighttemp: string;
    daywind: string;
    nightwind: string;
    daypower: string;
    nightpower: string;
  }[];
}

export interface WeatherResponseType {
  lives: WeatherLivesType[];
  forecasts: WeatherForecastsType[];
}
