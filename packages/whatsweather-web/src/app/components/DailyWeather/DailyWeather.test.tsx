import React from 'react';
import ReactDOM from 'react-dom';
import DailyWeather from './DailyWeather';

interface DailyWeatherProps {
  date: string,
  maxtemp_c: number,
  mintemp_c: number,
  condition: {text: string, icon: string}
}

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DailyWeather {...{} as DailyWeatherProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});