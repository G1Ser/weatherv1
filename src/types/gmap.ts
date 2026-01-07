export interface IpLocationResponseType {
  city: string;
  country: string;
  lat: string;
  lon: string;
  regionName: string;
}

export interface GeocodeType {
  province: string;
  city: string;
  district: string;
  adcode: string;
  formatted_address: string;
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
