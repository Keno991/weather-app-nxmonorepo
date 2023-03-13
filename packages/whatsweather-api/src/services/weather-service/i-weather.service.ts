import { DailyWeatherDto } from '@dto/daily-weather.dto';

export interface IWeatherService {
  getDailyWeather(location: string, days?: number): Promise<DailyWeatherDto>;
}
