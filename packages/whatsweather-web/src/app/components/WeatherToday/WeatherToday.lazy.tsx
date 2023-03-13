import React, { lazy, Suspense } from 'react';

const LazyWeatherToday = lazy(() => import('./WeatherToday'));

interface WeatherTodayProps {
  time: string,
  temp_c: number,
  condition: {text: string, icon: string}
}

const WeatherToday = (props: WeatherTodayProps & JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyWeatherToday {...props} />
  </Suspense>
);

export default WeatherToday;
