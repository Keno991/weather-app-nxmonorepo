import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class DailyWeatherRequestDto {
  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsNumberString()
  days!: string;
}

class Astro {
  sunrise!: string;

  sunset!: string;
}

class Condition {
  constructor(condition: Condition) {
    this.text = condition.text;
    this.icon = condition.icon;
  }

  text!: string;

  icon!: string;
}

class Day {
  constructor(day: Day, astr: Astro) {
    this.avgtemp_c = day.avgtemp_c;
    this.maxtemp_c = day.maxtemp_c;
    this.mintemp_c = day.mintemp_c;
    this.avghumidity = day.avghumidity;
    this.sunrise = astr.sunrise;
    this.sunset = astr.sunset;
    this.condition = new Condition(day.condition);
  }

  avgtemp_c!: string;

  maxtemp_c!: string;

  mintemp_c!: string;

  avghumidity!: string;

  condition!: Condition;

  sunrise!: string;

  sunset!: string;
}

class Hour {
  constructor(hour: Hour) {
    this.time = hour.time;
    this.temp_c = hour.temp_c;
    this.condition = new Condition(hour.condition);
  }

  time!: string;

  temp_c!: string;

  condition!: Condition;
}

class ForecastDay {
  constructor(forecastDay: ForecastDay) {
    this.date = forecastDay.date;
    this.day = new Day(forecastDay.day, forecastDay.astro);
    this.hour = forecastDay.hour.map(h => new Hour(h));
  }

  date!: string;

  day!: Day;

  hour!: Array<Hour>;

  astro!: Astro;
}

class Forecast {
  constructor(forecast: Forecast) {
    this.forecastday = forecast.forecastday.map(f => new ForecastDay(f));
  }

  forecastday!: Array<ForecastDay>;
}

class Location {
  constructor(location: Location) {
    this.name = location.name;
    this.region = location.region;
    this.country = location.country;
  }

  name!: string;

  region!: string;

  country!: string;
}

export class DailyWeatherDto {
  constructor(weather: DailyWeatherDto) {
    this.forecast = new Forecast(weather.forecast);
    this.location = new Location(weather.location);
  }

  forecast!: Forecast;

  location!: Location;
}
