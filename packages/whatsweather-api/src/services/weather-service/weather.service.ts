import { DailyWeatherDto } from '@whatsweather/dtos'
import axios from '@lib/axios.lib';
import { env } from '@utils//env.util';
import { injectable } from 'inversify';

import { IWeatherService } from './i-weather.service';

@injectable()
export class WeatherService implements IWeatherService {
  async getDailyWeather(location: string, days = 1) {
    const { data } = await axios.get(`${env.weatherApi.url}/forecast.json`, {
      params: {
        q: location,
        days,
      },
    });
    return new DailyWeatherDto(data);
  }
}
