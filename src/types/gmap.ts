export interface IpLocationResponseType {
  location: {
    city: string;
    country_name: string;
  };
}

export interface ADMItemType {
  id: string;
  name_zh: string;
}

export interface ADM2ItemType extends ADMItemType {
  adcode: string;
}

export interface GeocodeType {
  adm0: ADMItemType;
  adm1: ADMItemType;
  adm2: ADM2ItemType;
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
