export interface IpLocationResponseType {
  name_zh: string;
  adcode: string;
}

export interface GeocodeType {
  id: number;
  name_zh: string;
  adcode: string;
  display_zh: string;
}

export interface GeocodeResponseType {
  results: GeocodeType[];
}

export interface WeatherLivesType {
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  adcode: string;
  city: string;
}
export interface WeatherCastsType {
  date: string;
  week: number;
  dayweather: string;
  nightweather: string;
  daytemp: string;
  nighttemp: string;
  daywind: string;
  nightwind: string;
  daypower: string;
  nightpower: string;
}
export interface WeatherForecastsType {
  casts: WeatherCastsType[];
}

export interface WeatherResponseType {
  lives: WeatherLivesType[];
  forecasts: WeatherForecastsType[];
}

export interface WeatherChartDataType {
  date: string;
  week: string;
  weather: string;
  icon: string;
  maxTemp: string;
  minTemp: string;
}
