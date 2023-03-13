import React from 'react';
import ReactDOM from 'react-dom';
import WeatherToday from './WeatherToday';

interface WeatherTodayProps {
  time: string,
  temp_c: number,
  condition: {text: string, icon: string}
}

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WeatherToday {...{} as WeatherTodayProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});