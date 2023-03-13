import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify/lib/annotation/inject';

import { validator } from '@middleware/validator.middleware';
import { IWeatherService } from '@service/weather-service/i-weather.service';
import { HttpStatusCode } from '@enums/http-status.enum';
import { DailyWeatherRequestDto } from '@dto/daily-weather.dto';
import { BaseController } from './base.controller';
import TYPES from '../ioc/types';

@controller('/weather')
export class WeatherController extends BaseController {
  constructor(
    @inject(TYPES.WeatherSvc)
    private readonly weatherService: IWeatherService
  ) {
    super();
  }

  @httpGet(
    '/daily/:location/:days',
    validator(DailyWeatherRequestDto, 'params')
  )
  public getDailyWeather(@request() req: Request, @response() res: Response) {
    return this.promiseResponse(
      res,
      HttpStatusCode.OK,
      this.weatherService.getDailyWeather(
        req.params.location,
        Number(req.params.days)
      )
    );
  }
}
