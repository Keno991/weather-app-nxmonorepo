import { Container } from 'inversify';
import { HelloWorldService } from '@service/hello-world.service';
import { IWeatherService } from '@service/weather-service/i-weather.service';
import { WeatherService } from '@service/weather-service/weather.service';
import TYPES from './types';

const container = new Container();

container
  .bind<HelloWorldService>(TYPES.HelloWorldSvc)
  .to(HelloWorldService)
  .inRequestScope();

container
  .bind<IWeatherService>(TYPES.WeatherSvc)
  .to(WeatherService)
  .inRequestScope();

export default container;
